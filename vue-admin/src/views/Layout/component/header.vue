<template>
  <div class="header">
    <el-card>
      <el-row>
        <el-col :span="20"
          ><div class="left">
            <i
              class="el-icon-guide"
              @click="navMenu"
              style="margin-top: 20px; font-size: 20px; cursor: pointer"
            ></i></div
        ></el-col>
        <el-col :span="3">
          <el-avatar
            style="position: absolute; top: 10px; right: 200px"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span class="avatar" :title="username">{{ username }}</span>
        </el-col>
        <el-col :span="1">
          <span style="font-size: 40px; font-weight: 10; color: #f7f7f7"
            >|</span
          >
          <i
            class="el-icon-switch-button"
            title="退出"
            @click="logout"
            style="
              position: absolute;
              right: 10px;
              top: 20px;
              font-size: 20px;
              cursor: pointer;
            "
          ></i
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  name: "header",
  setup() {
    /**
     * 数据区域
     */
    const router = useRouter();
    const username = computed(() => store.state.username);
    const store = useStore();
    // console.log(store.state.isCollapse);
    /**
     * 函数区域
     */
    const navMenu = () => {
      store.commit("SET_COLLAPSE");
      // console.log(store.state.isCollapse);
    };
    const logout = () => {
      store
        .dispatch("logout")
        .then((response) => {
          console.log(response);
          if (response.resCode === 0) {
            ElMessage.success({
              message: "成功退出基地！",
              type: "success",
            });
            // 页面跳转
            router.push("/login");
          }
        })
        .catch(() => {});
    };
    return {
      username,
      logout,
      navMenu,
    };
  },
};
</script>
<style lang="sass" scoped>
@import "../../../assets/css/global";
.header,
.el-card,
 height: 100%
 width: 100%
 .avatar
  position: absolute
  top: 20px
  right: 70px
  font-size: 12px
</style>
