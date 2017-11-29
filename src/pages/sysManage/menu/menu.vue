<template>
    <div class="menuManage">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>
        <mu-raised-button @click="addMainMenu" :label="'添加'+state.name" primary />
        <Table class="station-table" border :columns="columns" :data="allMainMenuList" @on-expand="tableExpand"></Table>
        <!-- <mu-pagination class="stationPage" :total="stationList.totalElements" :current="stationList.number + 1" @pageChange="pageChange"></mu-pagination> -->
    </div>
</template>
<script>
    import Vue from "vue"
    import dialog from '../../../components/templates/AddEditDel_Dialog.vue'
    import childMenu from './templates/childMenu.vue'
    import "./menu.sass"
    import {
        mapGetters
    } from "vuex"
    // Vue.use(io, 'http://47.94.136.171:8081?clientid=' + 'testclient1')
    export default {
        data () {
            return {
                open: {
                    isAdd: false,
                    isEdit: false,
                    isRemove: false
                },
                fun: {
                    addClick: this.addMenuClick,
                    editClick: this.editMainMenuClick,
                    removeClick: this.removeMainMenuClick
                },
                state: {
                    zhName: '', // 菜单中文名字
                    url: '', // 菜单链接
                    icon: '', // 菜单图标
                    orderNum: '', // 菜单序号
                    colour: '', // 菜单颜色
                    type: '', // 菜单类型 （ 0：目录 1：菜单 2：按钮）
                    id: '0', // 父菜单的id  如果添加主菜单  则：id=0
                    name: '菜单',
                    radiosArr: JSON.stringify([
                        {name: '目录', value: '0'},
                        {name: '菜单', value: '1'}
                    ]),
                    inputArr: JSON.stringify([
                        {name: '名字', value: 'zhName'},
                        {name: '链接', value: 'url'},
                        {name: '图标', value: 'icon'},
                        {name: '排序序号', value: 'orderNum'},
                        {name: '菜单颜色', value: 'colour'}
                    ])
                },
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h('transition',
                            {
                                attrs: {
                                    name: 'childmenu'
                                }
                            },
                            [
                                h(childMenu,
                                {
                                    props: {
                                        parentId: params.row.menuId
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '名字',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '颜色',
                        key: 'colour'
                    },
                    {
                        title: '图标',
                        key: 'icon'
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
                                            type: "success",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.addChildMuban(params.row)
                                            }
                                        }
                                    },
                                    "添加子菜单"
                                ),
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
                                                this.editMainMenu(params.row)
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
                                                this.removeMainMenu(params.row)
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
            allMainMenuList: "allMainMenuList", // 站点数据 包括站点列表和分页信息
            allChildMenuList: "allChildMenuList"
        }),
        created () {
            this.getAllMainMenuList()
            console.log(this.allMainMenuList)
            // this.allMainMenuList[3]['_expanded'] = false
        },
        methods: {
            getAllMainMenuList () { // 获取站点数据
                this.$store.dispatch("getAllMainMenuList")
            },
            getAllChildMenuList (parentId) {
                this.$store.dispatch('getAllChildMenuList', parentId)
            },
            addMainMenu () {
                this.state.id = '0'
                this.open.isAdd = true
                this.allMainMenuList = []
            },
            addMenuClick () {
                this.$store.dispatch('addMenuClick', this.state).then(res => {
                    this.open.isAdd = false
                    if (res.success) {
                        this.$Message.success('添加成功')
                        if (this.state.id === '0') { // 添加主菜单
                            this.getAllMainMenuList()
                        } else { // 添加子菜单
                            this.getAllChildMenuList(this.state.id)
                        }
                    } else {
                        this.$Message.error('添加失败')
                    }
                })
            },
            addChildMuban (row) {
                this.state.id = row.menuId
                this.open.isAdd = true
            },
            editMainMenu (row) {
                this.open.isEdit = true
                this.state.zhName = row.name
                this.state.url = row.url
                this.state.type = row.type.toString()
                this.state.icon = row.icon
                this.state.orderNum = row.orderNum
                this.state.colour = row.colour
                this.state.id = row.menuId
            },
            editMainMenuClick () {
                this.$store.dispatch('editMenuClick', this.state).then(res => {
                    this.open.isEdit = false
                    if (res.success) {
                        this.$Message.success('修改成功')
                        this.getAllMainMenuList()
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            removeMainMenu (row) {
                this.open.isRemove = true
                this.state.zhName = row.name
                this.state.id = row.menuId
            },
            removeMainMenuClick () {
                this.$store.dispatch('removeMenuClick', this.state).then(res => {
                    this.open.isRemove = false
                    if (res.success) {
                        this.$Message.success('删除成功')
                        this.getAllMainMenuList()
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            },
            tableExpand (row, status) { // 表格某一行展开
                if (status) {
                    this.$store.dispatch('editTableData', row.menuId)
                    this.getAllChildMenuList(row.menuId)
                }
            },
            onInputChange (res) {
                this.state = res
            }
        },
        components: {
            'dia-log': dialog,
            'child-Menu': childMenu
        }
    }
</script>
