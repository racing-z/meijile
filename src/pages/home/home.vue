<template>
    <div class="home-body">
        <!-- 首页面头部-->
        <mu-appbar title="Title" class="homeTitle">
            <mu-icon-button v-if="isMobile" icon="menu" slot="left" @click="listMenuToggle()" />
            <span class="homeTitleBorder">One Step</span>
            <!-- 头部导航栏 -->
            <mu-tabs v-if="!isMobile" :value="activeTab" class="homeNav">
                <!-- <mu-tab v-for="(item, index) in mainMenu" :key="item.menuId" :value="'tab' + index" :title="item.name" @click="changeMianMenu(index, item.menuId, item.url)" /> -->
                <mu-tab v-for="(item, index) in mainMenu" :key="item.menuId" :value="item.url" :title="item.name" @click="changeMianMenu(item.menuId, item.url)" />                
            </mu-tabs>
            <!-- 头部导航栏左侧登录或用户名按钮 以及用户菜单-->
            <mu-flat-button :label="userName" @click="userNameClick()" ref="userOrLoginBtn" class="demo-flat-button homeLoginBtn" />
            <mu-popover :trigger="popoverTrigger" popoverClass="popover" :open="popoverOpen" @close="handleClose">
                <mu-menu>
                    <mu-menu-item title="个人资料">
                        <mu-badge content="" class="demo-icon-badge" slot="after">
                            <i>a</i>
                        </mu-badge>
                    </mu-menu-item>
                    <mu-menu-item title="退出登录" @click="loginOut">
                        <mu-badge content="" class="demo-icon-badge" slot="after">
                            <mu-icon value="settings_power" color="red" />
                        </mu-badge>
                    </mu-menu-item>
                </mu-menu>
            </mu-popover>
        </mu-appbar>
        <!-- 左侧栏及打开左侧栏按钮-->
        <mu-drawer :open="listMenuOpen" :docked="docked" class="listMenu" @close="listMenuToggle()">
            <mu-list @itemClick="isMobile ? listMenuToggle() : '' ">
                <mu-list-item v-for="item in childMenu" :key="item.menuId" :title="item.name" @click="changeListMenu(item.url)" />
            </mu-list>
        </mu-drawer>
        <!-- 主体-->
        <div class="demo-grid">
            <mu-row gutter>
                <mu-col width="0" tablet="0" desktop="10">
                </mu-col>
                <mu-col width="100" tablet="100" desktop="90">
                    <div class="homeBody">
                        <router-view></router-view>
                    </div>
                </mu-col>
            </mu-row>
        </div>
        <!-- 移动端底部菜单及打开按钮 -->
        <mu-float-button v-if="isMobile" icon="add" mini @click="bottomMenuToggle()" class="demo-float-button" />
        <mu-bottom-sheet :open="botMenuOpen" @close="closeBottomSheet">
            <mu-content-block>
                <div class="menuItem" v-for="(item, index) in mainMenu" :key="item.menuId">
                    <mu-float-button :icon="item.icon" mini :backgroundColor="item.colour" @click="mobileChangeMianMenu(item.menuId, item.url)" />
                    <div>{{item.name}}</div>
                </div>
                <label></label>
            </mu-content-block>
        </mu-bottom-sheet>
    </div>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    import api from '../../vuex/api'
    import "./home.sass"
    export default {
        data () {
            return {
                listMenuOpen: true, // 左侧菜单栏开关
                docked: true, // 左侧菜单是否遮罩
                botMenuOpen: false, // 底部菜单开关
                activeTab: this.$route.meta.mianUrl, // 导航栏当前
                userName: "", // 右上角显示用户名字 或者 登录
                isLogin: false, // 右上角按钮链接（登录或者用户中心）
                popoverOpen: false, // 鼠标放在用户名上显示用户菜单
                popoverTrigger: null // 用户菜单挂载点（挂载在用户按钮上）
            }
        },
        computed: mapGetters({
            isMobile: "isMobile",
            mainMenu: "mainMenu",
            childMenu: "childMenu"
        }),
        created: function () {
            if (localStorage.getItem("currentUser_token")) {
                // 根据登录状态（本地localstorage）获取用户名
                this.userName = `${localStorage.getItem("currentUser_name")}`
                this.isLogin = true
            } else {
                this.userName = "登录"
                this.isLogin = false
            }
            this.$store.dispatch("getMainMenu", this.$route.meta.mainUrl) // 获取主菜单
            if (this.isMobile) {
                this.listMenuOpen = false // 手机端默认关闭左侧菜单栏
                this.docked = false // 手机端左侧菜单栏默认遮罩
            } else {
                this.listMenuOpen = true // pc端与手机端相反
                this.docked = true
            }
            this.activeTab = this.$route.meta.mainUrl
        },
        mounted () {
            this.popoverTrigger = this.$refs.userOrLoginBtn.$el
        },
        beforeUpdate () {
            // this.activeTab = this.$route.meta.mainUrl
        },
        methods: {
            changeMianMenu (menuId, url) { // 切换主菜单
                this.activeTab = url
                this.$store.dispatch("getChildMenu", menuId)
                this.$router.push({
                    name: url
                })
            },
            mobileChangeMianMenu (menuId, url) { // 手机端切换主菜单
                this.botMenuOpen = false
                this.listMenuOpen = true
                this.$store.dispatch("getChildMenu", menuId)
                this.$router.push({
                    name: url
                })
            },
            listMenuToggle () { // 侧边菜单栏切换打开与关闭
                this.listMenuOpen = !this.listMenuOpen
            },
            changeListMenu (url) { // 侧边菜单栏切换菜单
                this.$router.push({
                    name: url
                })
            },
            bottomMenuToggle () { // 移动端底部菜单打开按钮
                this.botMenuOpen = !this.botMenuOpen
            },
            closeBottomSheet () { // 底部菜单关闭
                this.botMenuOpen = false
            },
            handleClose () { // 个人中心关闭按钮
                this.popoverOpen = false
            },
            userNameClick () { // 个人中心打开按钮
                if (this.isLogin) {
                    this.popoverOpen = true
                } else {
                    this.$route.push("login")
                }
            },
            loginOut () {
                api.loginOut((res) => {
                    if (res.success) {
                        localStorage.removeItem('currentUser_name')
                        localStorage.removeItem('currentUser_token')
                        this.$router.push("login")
                    }
                })
            }
            // handleTabChange (val) {
            //   this.activeTab = val
            // }
        }
    }
</script>
