<template>
  <div :class="{ 'default-maskLayer': true, dn: !isRulePop }" id="rulesPop">
    <div class="default-pop rule trans">
      <h3 class="default-tipsTitle">活动规则</h3>
      <div
        class="default-topdesc des"
        v-html="isIos ? resDatas.rule_ios : resDatas.rule_Androidh5"
      ></div>
      <a href="javascript:;" class="default-close" @click="handleClosePop"></a>
    </div>
  </div>
  
</template>
<script>
import { env, preventMove } from "@iqiyi-vip/h5-sdk";
import { reactive, toRefs } from "vue";
//活动规则
const rulesPopEffect = () => {
  const data = reactive({
    isIos: env.os.ios,
    isAndroid: env.os.android,
    isRulePop: false,
  });
  const handleClosePop = () => {
    data.isRulePop = false;
    preventMove();
    
  };
  const { isRulePop, isIos, isAndroid } = toRefs(data);
  return {
    isRulePop,
    isIos,
    isAndroid,
    handleClosePop,
  };
};

export default {
  name: "Firstscreen",
  setup() {
    const resDatas = res_162616686125257;
    const { isRulePop, isIos, isAndroid, handleClosePop } = rulesPopEffect();

    return {
      isRulePop,
      isIos,
      isAndroid,
      handleClosePop,
      resDatas,
    };
  },
};
</script>