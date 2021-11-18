<template>
  <div class="nav">
    <el-image
      :class="[isCollapse ? 'imgSize1' : 'imgSize']"
      :src="require('../../../assets/img/logo.png')"
      :fit="cover"
    ></el-image>
    <el-menu
      default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#344a5f"
      active-text-color="#FF00FF"
      text-color="#FFC0CB"
      unique-opened
      router
      :collapse-transition="false"
    >
      <el-submenu
        :index="item.path"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <!-- 一级菜单模板区域 -->
        <template #title>
          <!-- 图标 -->
          <i :class="item.icon"></i>
          <!-- 文本 -->
          <span>{{ item.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="subItem.path"
          v-for="subItem in item.children"
          :key="subItem.id"
        >
          <!-- 图标 -->
          <i class="subItem.icon"></i>
          <!-- 文本 -->
          <template #title>{{ subItem.title }}</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
// import { reactive } from "@vue/reactivity";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "nav",
  setup() {
    /**
     * 定义数据
     */
    // const isCollapse = ref(false);
    const activePath = ref("");
    // const routers = reactive(root.$router.options.routes);
    const store = useStore();
    // console.log(store.state.isCollapse);
    // console.log(store.getters.count);
    const menuList = reactive([
      {
        id: 1,
        index: "console",
        icon: "el-icon-orange",
        title: "控制台",
        path: "/console",
        children: [
          {
            id: 1 - 1,
            index: "console",
            title: "首页",
            path: "/console",
          },
        ],
      },
      {
        id: 2,
        index: "Parking",
        title: "停车场",
        icon: "el-icon-cherry",
        children: [
          {
            id: 2 - 1,
            index: "ParkingIndex",
            title: "停车场列表",
            path: "/parkingIndex",
          },
        ],
      },
  
    ]);

    /**
     * 定义函数
     */
    // computed监听
    const isCollapse = computed(() => {
      console.log(store.state.isCollapse);
      return store.state.isCollapse;
    });
    const handleOpen = () => {
      // console.log(key, keyPath);
    };
    const handleClose = () => {
      // console.log(key, keyPath);
    };
    // 打印store
    // console.log(root.$store.state.isCollapse);

    return {
      handleOpen,
      handleClose,
      isCollapse,
      menuList,
      activePath,
      // routers,
    };
  },
};
</script>
<style lang="sass" scoped>
.nav .el-menu
  border-right: none
.imgSize
  width: 100px
  height: 100px
  margin-left: 50px
  margin-top: 20px
.imgSize1
  width: 50px
  height: 50px
  margin-left: 5px
  margin-top: 20px
</style>
