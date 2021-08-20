<template>
 <!--抽中实物奖品 -->
    <div class="default-maskLayer" >
        <div class="default-pop wingift trans">
            <a href="javascript:;" class="default-close"></a>
            <h3 class="default-tipsTitle suces"></h3>
            <div class="default-topdesc">
                <p><span class="d-prize">{{ giftName }}</span>奖品已备好！请于活动期间填写地址，不填视为放弃奖品哦~</p>
            </div>
            <ul class="default-postForm">
                <li>
                    <span>姓&nbsp;&nbsp;&nbsp;名</span>
                    <input id="defaultName" type="text" class="default-formInput name" placeholder="">
                </li>
                <li>
                    <span>手机号</span>
                    <input id="defaultPhone" type="text" class="default-formInput inputF" placeholder="">
                </li>
                <li>
                    <span>地&nbsp;&nbsp;&nbsp;址</span>
                    <input id="defaultAddress" class="default-formInput adrs" placeholder="">
                </li>
            </ul>
            <div class="default-formListBtn">
                <a href="javascript:;" class="d-btnConfirm">提&nbsp;交</a>
            </div>
        </div>
    </div>

    <!-- 信息提交成功 -->
    <div class="default-maskLayer dn" id="deinfoSuces">
        <div class="default-pop trans adsinfo">

            <h3 class="default-tipsTitle submit" text="信息提交成功">信息提交成功</h3>
            <div class="default-topdesc">
                <p class="d-des">奖品会在活动结束后30个工作日内进</p>
                <p class="d-dest">行邮寄发放，请您耐心等待~</p>
            </div>
            <div class="default-formListBtn">
                <a href="javascript:;" class="d-btnConfirm">我知道了</a>
            </div>
            <a href="javascript:;" class="default-close dn"></a>
        </div>
    </div>
     <!-- 为填写信息挽留浮层 -->
    <div class="default-maskLayer dn" id="giftsSucessCont">
        <div class="default-pop trans adsinfo">
            <h3 class="default-tipsTitle" text="您还没有填写邮寄信息">您还没有填写邮寄信息</h3>
            <div class="default-topdesc">
                <p class="d-des">活动期间未填信息，视为放弃奖品哦~！</p>
                <p class="d-dest">（您也可以稍后在我的奖品页中填写）</p>
            </div>
            <div class="default-formListBtn two">
                <a href="javascript:;" class="d-btnConfirm close">
                    <p>稍后再填</p>
                </a>
                <a href="javascript:;" class="d-btnConfirm use">
                    <p>马上填地址</p>
                </a>
            </div>
            <a href="javascript:;" class="default-close dn"></a>
        </div>
    </div>
    <!-- 未中奖/无机会 -->
    <div class="default-maskLayer dn" id="notgiftentity">
        <div class="default-pop trans def">
            <h3 class="default-tipsTitle chan dn" text="抱歉，奖品与你擦肩而过了">抱歉，奖品与你擦肩而过了</h3>
            <h3 class="default-tipsTitle notchance" text="抱歉，您没有抽奖机会了">抱歉，您没有抽奖机会了</h3>
            <div class="default-topdesc">
                <p>现在购买VIP会员，抽奖机会+1</p>
            </div>
            <div class="default-formListBtn two">
                <a href="javascript:;" class="d-btnConfirm close">
                    <p>我知道了</p>
                </a>
                <a href="javascript:;" class="d-btnConfirm use">
                    <p>立即购买</p>
                </a>
            </div>
            <a href="javascript:;" class="default-close"></a>
        </div>
    </div>
    
    <!-- 商务福利中奖成功 -->
    <div class="default-maskLayer dn" id="businessucessfare">
        <div class="default-pop trans sucesfare">
            <h3 class="default-tipsTitle suces"></h3>
            <div class="default-topdesc">
                <p class="d-des"><span class="d-prize">XXXXXXX</span>奖品已备好！</p>
                <p class="d-dest">快去使用吧~</p>
            </div>
            <div class="default-formListBtn two">
                <a href="javascript:;" class="d-btnConfirm close">
                    <p>稍后再用</p>
                </a>
                <a href="javascript:;" class="d-btnConfirm use">
                    <p>立即使用</p>
                </a>
            </div>
            <a href="javascript:;" class="default-close dn"></a>
        </div>
    </div>
</template>
<script>
import { env, preventMove } from "@iqiyi-vip/h5-sdk";
import { reactive, toRefs } from "vue";
import { get, resData } from "./request";
export default {
  name: "PopUp",
  setup() {
     const data = reactive({ isRulePop: false, giftName:'苹果手机' }); 
        
    return { };
  },
};
</script>