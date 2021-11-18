<template>
  <div class="LayoutBox">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'"><lay-nav /></el-aside>
      <el-container>
        <el-header><lay-header /></el-header>
        <el-main><lay-main /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import LayHeader from "./component/header.vue";
import LayMain from "./component/main.vue";
import LayNav from "./component/nav.vue";
export default {
  name: "layout",
  components: { LayHeader, LayMain, LayNav },
  setup() {
    const store = useStore();
    // computed监听
    const isCollapse = computed(() => {
      // console.log(store.state.isCollapse);
      return store.state.isCollapse;
    });
    // const menuStatus = computed(() => {
    //   console.log(store.state.isCollapse);
    //   return store.state.isCollapse;
    // });
    return {
      isCollapse,
      // menuStatus,
    };
  },
};
</script>
<style lang="sass" scoped>
.LayoutBox
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 .el-aside
  background: #344a5f

 .el-header
  padding: 0
  z-index: 999

 .el-main
  background: #f7f7f7
</style>
