<template>
    <div style="margin: 10px">
        <div class="btn-group">
            <mu-raised-button @click="isAddStation = true; stationName = '' " label="添加站点" class="addStation" primary />
            <!-- 创建站点弹窗 -->
            <mu-dialog :open="isAddStation" title="创建站点" @close="isAddStation = false">
                <mu-text-field label="站点名字" v-model="stationName" labelFloat/>
                <mu-flat-button slot="actions" @click="isAddStation = false" primary label="取消" />
                <mu-flat-button slot="actions" primary @click="addStation" label="确定" />
            </mu-dialog>
            <!-- 修改站点弹窗 -->
            <mu-dialog :open="isEditStation" title="修改站点" @close="isEditStation = false">
                <mu-text-field label="站点名字" v-model="stationName" labelFloat/>
                <mu-flat-button slot="actions" @click="isEditStation = false" primary label="取消" />
                <mu-flat-button slot="actions" primary @click="enSureEditStation" label="确定" />
            </mu-dialog>
            <!-- 确认删除站点弹窗 -->
            <mu-dialog :open="isRemoveStation" title="删除站点" @close="isRemoveStation = false">
                一旦删除站点将不能找回，是否删除 <b>{{stationName}}</b> 站点？
                <mu-flat-button slot="actions" @click="isRemoveStation = false" primary label="取消" />
                <mu-flat-button slot="actions" primary @click="enSureRemoveStation" label="确定" />
            </mu-dialog>
            <!-- <Modal v-model="isAddStation" title="创建站点" @on-ok="addStation">
    				<mu-text-field label="站点名字" v-model="stationName" labelFloat/>
    			</Modal>
    			<Modal v-model="isEditStation" title="修改站点" @on-ok="enSureEditStation">
    				<mu-text-field label="站点名字" v-model="stationName" labelFloat/>
    			</Modal> -->
        </div>
        <Table class="station-table" border :columns="columns" :data="stationList.content"></Table>
        <mu-pagination class="stationPage" :total="stationList.totalElements" :current="stationList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
    import Vue from "vue"
    import io from "vue-socket.io"
    import "./station.sass"
    import api from "../../../vuex/api.js"
    import {
        mapGetters
    } from "vuex"
    // Vue.use(io, 'http://47.94.136.171:8081?clientid=' + 'testclient1')
    export default {
        data () {
            return {
                isAddStation: false, // 是否打开添加站点框
                isEditStation: false, // 是否打开修改站点框
                isRemoveStation: false, // 是否删除站点
                stationName: '', // 添加或修改站点暂存站点名字
                editStationId: '', // 修改站点的id
                removeStationId: '', // 删除站点的id
                columns: [{
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "站点名称",
                        key: "name"
                    },
                    {
                        title: "状态",
                        key: "state"
                    },
                    {
                        title: "创建人",
                        key: "stationUserName"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.editStation(params.row.id, params.row.name)
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeStation(params.row.id, params.row.name)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ])
                        }
                    }
                ]
                // stationData: this.stationList
            }
        },
        computed: mapGetters({
            stationList: "stationList" // 站点数据 包括站点列表和分页信息
        }),
        created () {
            this.getStationList(0, 10)
        },
        methods: {
            getStationList (page, size) { // 获取站点数据
                this.$store.dispatch("getStationList", {
                    page: page,
                    size: size
                })
            },
            addStation () { // 添加站点
                api.addStation(this.stationName, res => {
                    if (res.success) {
                        this.$Message.success("创建成功")
                        this.getStationList(this.stationList.number, 10)
                        this.isAddStation = false
                    } else {
                        this.$Message.error("创建失败")
                        this.isAddStation = false
                    }
                })
            },
            removeStation (stationId, stationName) { // 点击删除站点按钮 触发弹窗
                this.stationName = stationName
                this.removeStationId = stationId
                this.isRemoveStation = true
            },
            enSureRemoveStation () { // 确认删除站点 触发删除请求
                api.removeStation(this.removeStationId, (res) => {
                    if (res.success) {
                        this.$Message.success("删除成功")
                        this.getStationList(this.stationList.number, 10)
                        this.isRemoveStation = false
                    } else {
                        this.$Message.error("删除失败")
                        this.isRemoveStation = false
                    }
                })
            },
            editStation (stationId, stationName) { // 点击修改站点按钮 触发修改弹窗
                this.stationName = stationName
                this.editStationId = stationId
                this.isEditStation = true
            },
            enSureEditStation () { // 修改站点弹窗点击确定按钮 触发修改请求
                api.editStation(this.editStationId, this.stationName, (res) => {
                    if (res.success) {
                        this.$Message.success("修改成功")
                        this.getStationList(this.stationList.number, 10)
                        this.isEditStation = false
                    } else {
                        this.$Message.error("修改失败")
                        this.isEditStation = false
                    }
                })
            },
            pageChange (pageNumber) { // 点击页数 改变当前页数
                this.getStationList(pageNumber - 1, 10)
            }
        }
    }
</script>
