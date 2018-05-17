<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
    import cookies from "js-cookie"
    export default {
        name: 'App'
    }
</script>
    
<style>
    #app{
      width: 100%;
      height: 100%;
    }

</style>
