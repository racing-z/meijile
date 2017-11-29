<template>
    <div class="mubanManage" style="margin: 10px">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>
        <mu-raised-button @click="addMuban" :label="'添加'+state.name" primary />
        <Table class="station-table" border :columns="columns" :data="mubanList.content"></Table>
        <mu-pagination class="stationPage" :total="mubanList.totalElements" :current="mubanList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
    import Vue from "vue"
    import io from "vue-socket.io"
    import "./mubanManage.sass"
    import api from "../../../vuex/api.js"
    import dialog from '../../../components/templates/AddEditDel_Dialog.vue'
    import {
        mapGetters
    } from "vuex"
    export default {
        data () {
            return {
                open: {
                    isAdd: false,
                    isEdit: false,
                    isRemove: false
                },
                fun: {
                    addClick: this.addMubanClick,
                    editClick: this.editMubanClick,
                    removeClick: this.removeMubanClick
                },
                state: {
                    zhName: '', // 内容标志中文名字
                    enName: '', // 内容标志英文名字
                    url: '', // 添加或修改模板的链接
                    type: '1', // 添加或修改模板的类型 1：个人 2：企业 3：销售
                    id: '', // 内容标志id
                    name: '模板',
                    radiosArr: JSON.stringify([
                        {name: '个人', value: '1'},
                        {name: '企业', value: '2'},
                        {name: '销售', value: '3'}
                    ]),
                    inputArr: JSON.stringify([
                        {name: '中文名字', value: 'zhName'},
                        {name: '英文名字', value: 'enName'},
                        {name: '链接', value: 'url'}
                    ])
                },
                columns: [{
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "站点名称",
                        key: "zhName"
                    },
                    {
                        title: "站点英文名称",
                        key: "enName"
                    },
                    {
                        title: "链接",
                        key: "linkurl"
                    },
                    {
                        title: "类型",
                        key: "type"
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
                                                this.editMuban(params.row)
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
                                                this.removeMuban(params.row)
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
            mubanList: "mubanList" // 站点数据 包括站点列表和分页信息
        }),
        created () {
            this.getMubanList(0, 10)
        },
        methods: {
            onInputChange (res) {
                this.state = res
            },
            getMubanList (page, size) { // 获取站点数据
                this.$store.dispatch("getMubanList", {
                    page: page,
                    size: size
                })
            },
            addMuban () {
                this.open.isAdd = true
            },
            addMubanClick () { // 添加模板
                this.$store.dispatch("addMubanClick", this.state).then((res) => {
                    this.open.isAdd = false
                    if (res.success) {
                        this.$Message.success("添加成功")
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Message.error('添加失败')
                    }
                })
            },
            editMuban (row) {
                this.open.isEdit = true
                this.state.zhName = row.zhName
                this.state.enName = row.enName
                this.state.url = row.linkurl
                this.state.type = row.type.toString()
                this.state.id = row.id
            },
            editMubanClick (row) {
                this.$store.dispatch("editMubanClick", this.state).then((res) => {
                    this.open.isEdit = false
                    if (res.success) {
                        this.$Message.success("修改成功")
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            removeMuban (params) {
                this.state.id = params.id
                this.state.zhName = params.zhName
                this.open.isRemove = true
            },
            removeMubanClick () {
                this.$store.dispatch("removeMubanClick", this.state).then((res) => {
                    this.open.isRemove = false
                    if (res.success) {
                        this.$Message.success('删除成功')
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Messsage.error('删除失败')
                    }
                })
            },
            pageChange (pageNumber) { // 点击页数 改变当前页数
                this.getMubanList(pageNumber - 1, 10)
            }
        },
        components: {
            'dia-log': dialog
        }
    }
</script>
