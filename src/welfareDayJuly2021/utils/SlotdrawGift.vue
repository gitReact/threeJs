<template>
  <div class="w-slotdrawcont">
    <ul class="giftanicont" id="giftanicontwarp">
      <li class="award" id="gifta"></li>
      <li class="award" id="giftb"></li>
      <li class="award" id="giftc"></li>
    </ul>
    <button class="slotmachinebtn" @click="handleSlotClick"></button>
    <div class="chance">
      剩余<span>{{ count }}</span
      >次机会
    </div>
    <div class="myaward" @click="handleExplainClick"></div>
  </div>
  <PopUp />
</template>
<script>
import SlotRun from "../components/SlotRun";
import { getFvLink, goToLogin, getUserInfo } from "@iqiyi-vip/h5-sdk";
import PopUp from '../components/PopUp.vue'
import { get, resData } from "./request";
import { reactive, toRefs } from "vue";

export default {
  name: "Slotdrawcont",
  components:{ PopUp },
  setup() {
    const getData = reactive({ count: "0", isLogin: false });
    const chanceInquireData = async () => {
      const result = await get("/queryTimes");
      if (result?.code == "A00000") {
        getData.count = result?.code?.times;
      }
    };
    chanceInquireData();
    console.log(resData);
    const handleExplainClick = () => {
      window.location.href = getFvLink(resData.morewelfare_url);
    };

    const handleSlotClick = () => {
      getUserInfo("userinfo,qiyi_vip,private").then((data) => {
        if (data?.code === "A00000" && data?.data?.qiyi_vip_info?.status == 1) {
          const getGiftData = async() => {
            const result = await get("/lottery");
            console.log(result)
            if (result?.code == "A00000") {
              let giftType = parseInt(data.data.giftType);
              let order = parseInt(getGiftOrder(data.data.giftCode).order);
              let orderCode = data.data.orderCode;
              let welfareCode = getGiftOrder(data.data.giftCode).welfareCode;
              let url = getGiftOrder(data.data.giftCode).url;
              let giftName = data.data.giftName;
              let ids = ["gifta", "giftb", "giftc"];
              let _index = [];
              ids.forEach((it) => {
                _index.push(order);
              });
              SlotRun.slotmachinesRun(
                {
                  id: ids,
                  count: 6,
                  index: _index,
                  callback: function () {
                    alert("抽奖成功");
                    getData.count--;
                    if (giftType == 9) {

                         //填写信息弹窗
                          $('#exchangeCode .default-topdesc .d-prize').text(data.data.giftName);
                            $('#exchangeCode').removeClass('dn');
                            common.stopScroll();
                            removeGiftCls();
                            luckSenduserinfo(ResData.lotterycode);

                    }


                  },
                },
                {
                  count: 12,
                }
              );
            }else{

            }
          };
          getGiftData();
        } else {
          goToLogin();
        }
       
      });
    };
    const { count } = toRefs(getData);
    return { handleSlotClick, count, handleExplainClick };
  },
};
</script>
