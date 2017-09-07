<template>
  <div class="demo-grid">
    <!-- 首页面头部-->
    <mu-appbar title="Title" class="homeTitle">
      <mu-icon-button v-if="isMobile" icon="menu" slot="left" @click="listMenuToggle()"/>
      <span class="homeTitleBorder">One Step</span>
      <mu-tabs v-if="!isMobile" :value="activeTab" @change="handleTabChange" class="homeNav">
        <mu-tab value="tab1" title="用户管理"/>
        <mu-tab value="tab2" title="系统管理"/>
        <mu-tab value="tab3" title="站点管理"/>
        <mu-tab value="tab4" title="频道管理"/>        
      </mu-tabs>
      <mu-flat-button label="登录" to="/login" class="demo-flat-button homeLoginBtn"/>
    </mu-appbar> 
    <!-- 左侧栏及打开左侧栏按钮-->
    <mu-drawer :open="listMenuOpen" :docked="docked" class="listMenu" @close="listMenuToggle()">
      <mu-list @itemClick="isMobile ? listMenuToggle() : '' ">
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
      </mu-list>
    </mu-drawer>
    <!-- 主体-->
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="15">

      </mu-col>
      <mu-col width="100" tablet="100" desktop="85">
        <div class="homeBody"></div>
      </mu-col>
    </mu-row>
    <!-- 移动端底部菜单及打开按钮 -->
    <mu-float-button v-if="isMobile" icon="add" mini @click="bottomMenuToggle()" class="demo-float-button"/>
    <mu-bottom-sheet :open="botMenuOpen" @close="closeBottomSheet">
      <mu-content-block>
        <div class="menuItem">
          <mu-float-button icon="perm_identity" mini class="userManage" @click="userManageClick()"/>
          <div>用户管理</div>
        </div>
        <div class="menuItem">
          <mu-float-button icon="settings" mini class="sysManage" @click="sysManageClick()"/>
          <div>系统管理</div>
        </div>
        <div class="menuItem">
          <mu-float-button icon="settings_input_component" mini class="stationManage"  @click="stationManageClick()"/>
          <div>站点管理</div>
        </div>
        <div class="menuItem">
          <mu-float-button icon="dvr" mini class="channelManage" @click="channelManageClick()"/>
          <div>频道管理</div>
        </div>
       
        <label></label>
      </mu-content-block>
    </mu-bottom-sheet>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../static/css/home.sass'
export default {
  data () {
    return {
      listMenuOpen: true,
      docked: true,
      botMenuOpen: false,
      activeTab: 'tab1'
    }
  },
  computed: mapGetters({
    isMobile: 'isMobile'
  }),
  methods: {
    listMenuToggle () {
      this.listMenuOpen = !this.listMenuOpen
    },
    bottomMenuToggle () {
      this.botMenuOpen = !this.botMenuOpen
    },
    closeBottomSheet () {
      this.botMenuOpen = false
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    userManageClick () {
      this.botMenuOpen = false
      this.listMenuOpen = true
    },
    sysManageClick () {
      this.botMenuOpen = false
      this.listMenuOpen = true
    },
    stationManageClick () {
      this.botMenuOpen = false
      this.listMenuOpen = true
    },
    channelManageClick () {
      this.botMenuOpen = false
      this.listMenuOpen = true
    }
  },
  created: function () {
    if (this.isMobile) {
      this.listMenuOpen = false // 手机端默认打开左侧菜单栏
      this.docked = false // 手机端左侧菜单栏默认遮罩
    } else {
      this.listMenuOpen = true // pc端与手机端相反
      this.docked = true
    }
  }
}
</script>
