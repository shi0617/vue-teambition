<template>
  <div id="app">
      <Login v-if="false"></Login>
      <Created></Created>
  </div>
</template>

<script>
    import Login from '@/components/Login'
    import Created from '@/components/Created'
    export default {
        name: 'App',
        components:{
            Login,
            Created
        }
    }
</script>
    
<style>
    #app{
      width: 100%;
      height: 100%;
    }

</style>
