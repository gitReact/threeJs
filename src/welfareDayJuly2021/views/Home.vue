
<template>
    <Navbar v-if="!isApp" />
    <Firstscreen />
    <Lotteryraffle />
  
</template>
<script>
import Navbar from "../components/Navbar";
import Firstscreen from "./Firstscreen";
import Lotteryraffle from "./Lotteryraffle";

export default {
  name: "Home",
  components: { Navbar, Firstscreen, Lotteryraffle }
};
</script>
