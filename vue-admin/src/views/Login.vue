<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <!-- 背景视频 -->
      <div :style="fixStyle" class="filter">
        <!--内容-->
      </div>
      <video
        :style="fixStyle"
        autoplay
        loop
        muted
        class="fillWidth"
        v-on:canplay="canplay"
      >
        <source src="../assets/videos/login4.mp4" type="video/mp4" />
        <!-- 浏览器不支持 video 标签，建议升级浏览器。 -->
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="../assets/img/loginBg.jpg" alt="" />
      </div>
      <!-- 登录框 -->
      <div class="bgLogin">
        <p class="word">THE LIFE SYSTEM</p>
        <ul class="menu-tab">
          <li
            v-for="item in menuTab"
            :key="item.id"
            :class="{ current: item.current }"
            @click="toggleMenu(item)"
          >
            {{ item.txt }}
          </li>
        </ul>

        <el-form
          :model="ruleForm"
          status-icon
          :rules="loginrules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              placeholder="邮箱"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              minlength="6"
              maxlength="20"
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code" class="item-from">
            <el-row :gutter="10">
              <el-col :span="15">
                <el-input
                  v-model="ruleForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                  type="success"
                  class="block"
                  @click="getSms()"
                  :disabled="codeButtonStatus.status"
                  >{{ codeButtonStatus.text }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            prop="passwords"
            class="item-from"
            v-if="model === 'register'"
          >
            <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="ruleForm.passwords"
              show-password
              autocomplete="off"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="code"
            class="item-from"
            v-if="model === 'register'"
          >
            <el-row :gutter="10">
              <el-col :span="15">
                <el-input
                  v-model="ruleForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                  type="success"
                  class="block"
                  @click="getSms()"
                  :disabled="codeButtonStatus.status"
                  >{{ codeButtonStatus.text }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item class="loginBtn">
            <el-button
              type="danger"
              @click="submitForm('loginForm')"
              class="login-btn block"
              :disabled="loginButtonStatus"
              >{{ model === "login" ? "登录" : "注册" }}</el-button
            >
            <el-button @click="resetFromData('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 使用export default时，不能同时存在多个default
 * 文件import引入不需要花括号
 */
import sha1 from "js-sha1";
import { useStore } from "vuex";
import { GetSms, Register } from "../api/login"; //引入api文件
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, unref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { stripscript, validateEmail, validateVCode } from "../utils/validate"; //引入过滤密码特殊字符js文件
// import { reactive } from "@vue/reactivity";
export default {
  name: "login",
  // setup(props, context){
  /**
     *attrs: (...) == this.$attrs
      emit: (...) == this.$emit
      listeners: (...) == this.$listeners
      parent: (...) == this.$parent
      refs: (...) == this.$refs
      root: (...) == this
  }
      */
  setup(refs, root) {
    // 验证用户名
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    // 验证用户密码
    let validatePass = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.pass = stripscript(value);
      value = ruleForm.pass;
      // console.log(stripscript(value));

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("只能输入6-20个字母、数字"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.pass) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };

    /*****************************************************************************************************
     * 声明数据，这里面放置data数据、生命周期、自定义的函数
     */
    const router = useRouter();
    const loginForm = ref(null);
    const vedioCanPlay = ref(false);
    const fixStyle = ref(null);

    // 倒计时
    const timer = ref(null);
    //  表单绑定数据
    const ruleForm = reactive({
      username: "parker0377@qq.com",
      pass: "wo123456789",
      code: "",
      passwords: "",
    });

    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // 模块值
    const model = ref("login");
    // 登录按钮禁用状态
    const loginButtonStatus = ref(true);
    // 验证码按钮状态
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    const store = useStore();
    // 表单预校验
    const loginrules = reactive({
      pass: [{ validator: validatePass, trigger: "blur" }],
      username: [{ validator: validatePass2, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });
    /**
     * 1、不建议在一个方法里面做多件不同的事件（尽可能只做自己本身的事，不要做其他人的事情）
     * 2、尽量把相同的事情封装一个方法里面，通过调用函数进行执行
     */

    /*******************************************************************************************************************
     * 声明函数
     */
    const canplay = () => {
      vedioCanPlay.value = true;
    };

    // 切换模块
    const toggleMenu = (data) => {
      menuTab.forEach((elem) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;
      resetFromData();
      clearCountDown();
    };

    // 重置表单数据
    const resetFromData = () => {
      // console.log(formName);
      loginForm.value.resetFields();
    };

    // 更新按钮状态
    const updataButtonStatus = (params) => {
      // console.log(params);
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    };

    // 点击登录/注册,提交表单
    const submitForm = async () => {
      // console.log("ppppp");
      const valid = unref(loginForm);
      // 为给定 ID 的 user 创建请求
      if (!valid) return;
      // 表单验证通过
      try {
        valid.validate();
        console.log(model.value);
        // 三元运算
        model.value === "login" ? login() : register();
      } catch {
        console.log("error submit!!");
        return false;
      }
    };

    const getSms = () => {
      // 进行提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };
      // 修改获取验证按钮状态
      updataButtonStatus({
        status: true,
        text: "发送中",
      });
      // 延时多长时间
      GetSms(requestData)
        .then((response) => {
          // console.log(response);
          let data = response.data;
          ElMessage.success({
            message: data.message,
            type: "success",
            dangerouslyUseHTMLString: true,
          });
          // 启用登录或注册按钮
          loginButtonStatus.value = false;
          // 调定时器，倒计时
          countDown(60);
        })
        .catch((error) => {
          // 启用登录或注册按钮
          loginButtonStatus.value = false;
          updataButtonStatus({
            status: false,
            text: "再次获取",
          });
          console.log(error);
        });
    };

    /**
     * 登录成功之后页面进行跳转
     */
    const login = () => {
      // console.log("ppp");
      let repuestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.pass),
        code: ruleForm.code,
      };
      // Login(repuestData)
      //   .then((res) => {
      //     ElMessage.success({
      //       message: "成功登陆基地！",
      //       type: "success",
      //     });
      //     // console.log(res.data);
      //     if (res.data.resCode == 0) {
      //       // console.log(res.data);
      //       var token = res.data.data.token;
      //       var username = res.data.data.username;
      //       // console.log(token);
      //       window.localStorage.setItem("token", token);
      //       window.localStorage.setItem("username", username);
      //     }
      //     // 页面跳转
      //     router.push("/console");
      //   })
      //   .catch(() => {});

      store
        .dispatch("login", repuestData)
        .then(() => {
          // console.log(repuestData.data);
          // if(repuestData.status)
          ElMessage.success({
            message: "成功登陆基地！",
            type: "success",
          });
          // 页面跳转
          router.push("/console");
        })
        .catch(() => {});
    };
    /**
     * 注册
     */
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.pass),
        code: ruleForm.code,
        module: "register",
      };
      // 注册接口
      Register(requestData)
        .then((response) => {
          let data = response.data;
          ElMessage.success({
            message: data.message,
            type: "success",
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(() => {
          // 失败时执行的代码
        });
    };

    /**
     * 倒计时
     */
    const countDown = (number) => {
      // 60 和 0不见了，故意留BUG
      // setTimeout:clearTimeout(变量)  只执行一次
      // setInterval:clearInterval(变量))  不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "再次获取",
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`; // es5 '倒计时' + time + '秒'
        }
      }, 1000);
    };
    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码按钮默认状态
      updataButtonStatus({
        status: false,
        text: "获取验证码",
      });
      // 清除倒计时
      clearInterval(timer.value);
    };

    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {
      //图片自适应
      window.onresize = () => {
        const windowWidth = document.body.clientWidth;
        const windowHeight = document.body.clientHeight;
        const windowAspectRatio = windowHeight / windowWidth;
        let videoWidth;
        let videoHeight;
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth;
          videoHeight = videoWidth * 0.5625;
          fixStyle.value = {
            height: windowWidth * 0.5625 + "px",
            width: windowWidth + "px",
            "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
            "margin-left": "initial",
          };
        } else {
          videoHeight = windowHeight;
          videoWidth = videoHeight / 0.5625;
          fixStyle.value = {
            height: windowHeight + "px",
            width: windowHeight / 0.5625 + "px",
            "margin-left": (windowWidth - videoWidth) / 2 + "px",
            "margin-bottom": "initial",
          };
        }
      };
      window.onresize();
    });

    /**
     * 销毁页面时
     */
    onUnmounted(() => {
      clearInterval(timer.value);
    });

    return {
      loginForm,
      vedioCanPlay,
      fixStyle,
      ruleForm,
      loginrules,
      canplay,
      submitForm,
      resetFromData,
      register,
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      toggleMenu,
      getSms,
      updataButtonStatus,
      login,
    };
  },
};
</script>
<style lang="sass" scoped>
.homepage-hero-module,
.video-container
  position: relative
  height: 100vh
  overflow: hidden

  & .poster img,

  & video
    z-index: 0
    position: absolute

  & .filter
    z-index: 1
    position: absolute
    background: rgba(0, 0, 0, 0.4)

  & .bgLogin
    width: 20%
    height: 100%
    position: relative
    margin: 200px auto
    z-index: 100

  & .bgLogin .word
    text-align: center
    font-size: 25px
    color: #ffffff

  & .bgLogin .menu-tab
    text-align: center
    padding-left: 0px
  li
    display: inline-block
    list-style: none
    width: 88px
    line-height: 36px
    font-size: 14px
    color: #fff
    border-radius: 2px
    cursor: pointer

  .current
    background-color: rgba(0, 0, 0, .1)
</style>
