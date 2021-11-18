<template>
  <div id="nav">
    <!-- <router-link to="/Login"></router-link>
    <router-link to="/About"></router-link> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
  <!-- <router-view /> -->
</template>

<script>
import { ref, nextTick, provide } from "vue";
export default {
  name: "App",
  setup() {
    // 局部组件刷新
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);

    return {
      isRouterAlive,
    };
  },
};
</script>
<style>
#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
