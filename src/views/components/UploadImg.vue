<template>
    <div class="box">
        <div v-if="imgChild==''" class="btn" @click="selectImg()">
            <i class="icon icon-camera"></i>
            <p>{{name}}</p>
        </div>
        <div v-if="imgChild!=''" class="img-box">
            <div v-show="iStatus" class="celeBtn"  @click="celeImg()">x</div>
            <img :src="imgChild" ref="imgChild" alt="">
        </div>
    </div>
</template>
<script>
import ImgSlter from '_libs/imgslter/index.js'
// import { uploadImg } from '_api/user'
export default {
    data() {
        return {
            imgChild: '',
            iStatus: ''
        }
    },
    props: {
        name: {
            default: '上传图片',
            type: String
        },
        imgSrc: {
            default: '',
            type: String
        },
        status: {
            default: true,
            type: Boolean
        },
        type: {
            default: 1,
            type: Number
        }
    },
    watch: {
        imgSrc() {
            this.imgChild = this.imgSrc
        },
        status() {
            this.iStatus = this.status
        }
    },
    created() {
        this.imgChild = this.imgSrc
        this.iStatus = this.status
    },
    mounted() {
        this.selecter = new ImgSlter()
        this.selecter.handler = (data) => {
            // this.imgChild = data.img
            this.img(data.img)
        }
    },
    methods: {
        // 上传图片
        async img(imgData) {
            // const upImg = await uploadImg({
            //     type: this.type,
            //     file: imgData
            // })
            // this.imgChild = upImg.img_url
        },
        selectImg() {
            this.selecter.select()
        },
        celeImg() {
            this.imgChild = ''
        }
    }
}
</script>
<style scoped>
.box {
    position: relative;
    width: 270px;
    height: 160px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ccc;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
}
.box .icon {
    font-size: 30px;
}
.icon-camera{
    width: 0.85rem;
    height: 0.85rem;
    background-size:100% 100%;
    position: absolute;
    top:50%!important;
    left: 50%!important;
    display: block;
    transform: translate(-50%, -50%)!important;
    margin-top: -0.3rem
}
.box p{margin-top: 2rem}
.img-box{width: 100%;height: 100%;position: absolute}
.img-box img{width: 100%;position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%)}
.celeBtn{position: absolute;width:0.5rem;font-size: 0.35rem;height: 0.5rem;background:black;opacity: 0.6;top:0;right: 0;color:white;text-align: center;line-height: 0.5rem;z-index: 2;border-radius: 0.08rem}
.btn{width: 100%;height: 100%;}
</style>
