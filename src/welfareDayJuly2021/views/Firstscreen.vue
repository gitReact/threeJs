<template>
  <div class="w-firstscreen">
    <div class="d-banner"></div>
    <div
      class="d-activeRules d-runstart"
      id="activeRules"
      rseat="210713_flyxJuly_10"
      @click="handleActiveRuleBtn"
    >
      活动规则
    </div>
    <div class="d-logo"></div>
  </div>
  <Rule ref="ruleShow"/>
</template>
<script>
import { recoverMove } from "@iqiyi-vip/h5-sdk";
import { ref } from "vue";
import Rule from '../components/Rule.vue'
export default {
  name: "Firstscreen",
  components:{ Rule },
  setup() {
      const ruleShow = ref( null ) ;
      const handleActiveRuleBtn = () =>{
        ruleShow.value.isRulePop = true;
        recoverMove();
      }
      return { ruleShow,handleActiveRuleBtn };
  },
};
</script>