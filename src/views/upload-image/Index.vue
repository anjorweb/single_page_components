<template>
    <div>
        <button @click="onUpload">点击上传</button>
        <img :src="imgUrl" alt="">
    </div>
</template>
<script>
import ImgSlter from '_libs/imgslter/index.js'
export default {
    data() {
        return {
            imgUrl: ''
        }
    },
    mounted() {
        this.selecter = new ImgSlter({
            videoParams: {
                type_id: 2
            }
        });
        this.selecter.handler = (data) => {
            this.imgUrl = data.img
            if (data.type === 'video') {
                // uploadFile(data.formData).then(res => {
                //     console.dir(res);
                // })
            }
        }
    },
    methods: {
        onUpload() {
            this.selecter.select()
        }
    }
}
</script>
<style>
img { max-width: 100%; }
</style>
