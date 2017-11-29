<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    created: function () {
        let userAgentInfo = navigator.userAgent
        let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        for (let i = 0; i < userAgentInfo.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                return this.$store.dispatch('getIsMobile', true)
            }
        }
    }
}
</script>

<style>
html, body{
  height: 100%;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
</style>
