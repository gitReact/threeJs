<template>
  <div class="w-slotmachinedraw">
    <div class="w-title" text="暑期福利站 会员赢好礼"></div>

    <SlotdrawGift />

    <div class="w-giftlistcont">
      <div class="cx_awardCont">
        <div class="cx_warp">
          <swiper
            class="swiper-container swiper-container-X4"
            :slides-per-view="4"
            :pagination="{ clickable: true }"
            :loop="true"
            :spaceBetween="10"
            :autoplay="{ disableOnInteraction: false, delay: 3000 }"
            :observer="true"
            :observeParents="true"
            :observeSlideChildren="true"
            ref="mySwiper"
          >
            <swiper-slide class="swiper-slide slida"></swiper-slide>
            <swiper-slide class="swiper-slide slidb"></swiper-slide>
            <swiper-slide class="swiper-slide slidc"></swiper-slide>
            <swiper-slide class="swiper-slide slidd"></swiper-slide>
            <swiper-slide class="swiper-slide slide"></swiper-slide>
            <swiper-slide class="swiper-slide slidf"></swiper-slide>
          </swiper>
        </div>
      </div>
      <div
        class="w-buyaddvipbtn" id="buyaddvipbtn"></div>
      <div class="w-message" id="ioshide">
        开通下方东呈联名会员，也可以抽奖机会+1哦～
      </div>
    </div>
  </div>
</template>
<script>
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
SwiperCore.use([Pagination, Autoplay]);
import SlotdrawGift from '../utils/SlotdrawGift.vue'
export default {
  name: "Lotteryraffle",
  components: {
    Swiper,
    SwiperSlide,
    SlotdrawGift
  },
  setup() {
    
  }
};
</script>
