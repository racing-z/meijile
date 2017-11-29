<template>
    <div class="menuManage">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>
        <mu-raised-button @click="addMainMenu" :label="'添加'+state.name" primary />
        <Table class="station-table" border :columns="columns" :data="allMainMenuList" @on-expand="tableExpand"></Table>
        <!-- <mu-pagination class="stationPage" :total="stationList.totalElements" :current="stationList.number + 1" @pageChange="pageChange"></mu-pagination> -->
    </div>
</template>
<script>
    import dialog from '../../../components/templates/AddEditDel_Dialog.vue'
    import "./role.sass"
    export default {
        data () {
            return {
                open: {
                    isAdd: false,
                    isEdit: false,
                    isRemove: false
                },
                fun: {
                    // addClick: this.addMenuClick,
                    // editClick: this.editMainMenuClick,
                    // removeClick: this.removeMainMenuClick
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
                columns: [{
                        title: "角色名称",
                        key: "roleName"
                    },
                    {
                        title: "角色备注",
                        key: "remark"
                    },
                    {
                        title: "创建人",
                        key: "remark"
                    },
                    {
                        title: "创建时间",
                        key: "createTime"
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
                                    "修改角色名称"
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
                                                this.editStation(params.row.id, params.row.name)
                                            }
                                        }
                                    },
                                    "修改名称"
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
            }
        },
        created () {
            this.getRoleList(0, 10)
        },
        methods: {
            getRoleList (page, size) {
                this.$store.dispatch('getRoleList', {page: 0, size: 10})
            },
            addMainMenu () {}
        }
    }
</script>
