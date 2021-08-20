<template>
  <header class="w-headerWrap" id="headerNav">
    <h2 class="w-name nameK" id="title">{{ nickname }}</h2>
    <button
      class="w-loginBtn"
      id="loginBtn"
      v-if="!isLogin"
      @click="handleLoginClick"
    >
      登录
    </button>
    <button
      class="w-loginBtn"
      id="loginBtn"
      v-if="isLogin"
      @click="handleoutLoginClick"
    >
      退出
    </button>
  </header>
</template>
<script>
import { getUserInfo, goToLogin, logoutAccount } from "@iqiyi-vip/h5-sdk";
import { reactive, toRefs } from "vue";
//获取信息
const getUserInfoEffect = () => {
  const getUserData = reactive({ isApp: /iqiyi/i.test(navigator.userAgent),nickname: "请登录哦~",isLogin: false });
  getUserInfo("userinfo,qiyi_vip,private").then((data) => {
    if (data?.code == "A00000" && data?.data?.userinfo) {
      getUserData.isLogin = true;
      getUserData.nickname = data?.data?.userinfo?.nickname;
    } else {
      getUserData.isLogin = false;
    }
  });
  const { nickname, isLogin, isApp } = toRefs(getUserData);
  return { nickname, isLogin, isApp };
};

//登录退出
const handleLoginEffect = () => {
  const handleLoginClick = () => {
    goToLogin();
  };
  const handleoutLoginClick = () => {
    logoutAccount();
  };
  return { handleLoginClick, handleoutLoginClick };
};

export default {
  name: "Navbar",
  setup() {
    const { handleLoginClick, handleoutLoginClick } = handleLoginEffect();
    const { nickname, isLogin, isApp } = getUserInfoEffect();
    return { nickname, isLogin, isApp, handleLoginClick, handleoutLoginClick };
  },
};
</script>
