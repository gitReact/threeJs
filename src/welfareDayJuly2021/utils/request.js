
import axios from 'axios';
import { getAPPInfo,getUserInfo } from "@iqiyi-vip/h5-sdk";
import { VueLoaderPlugin } from 'vue-loader';
export const  resData = res_162616686125257;

getUserInfo("userinfo,qiyi_vip,private").then((data) => {
    if (data?.code === "A00000" && data?.data?.qiyi_vip_info?.status == 1) {
        getAPPInfo().then((appinfo) => {
           sessionStorage.setItem("qiyiInfo",appinfo.P00001);
        });
    }
});
// Vue.prototype.$appName = 'My App'

const instance = axios.create({
    baseURL: 'https://pcell.iqiyi.com/lotto',
    timeout: 1000
})
//抽奖接口
export const get = (url, params = { actCode: resData.lotterycode, P00001: sessionStorage.getItem('qiyiInfo') }) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err);
        })
    })

}

