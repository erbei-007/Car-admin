<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<script>
// import console from "../../console/console.vue";
// import InfoList from "../../info/info-list.vue";

export default {
  // components: { console, InfoList },
  name: "main",
};
</script>
<style lang="sass" scoped>
.main,
.el-card
 height: 100%
 width: 100%
</style>
