<template>
    <div class="bg home_index">
        <ul class="list">
            <li @click="goPage('虚拟列表')">虚拟列表</li>
            <li @click="goPage('上传图片')">上传图片</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
        // 去具体项
        goPage(name) {
            this.$router.push({
                name: name
            })
        }
    }
}
</script>
<style scoped>
.list {
    width: 100%;
}
.list li {
    background:#f1f3f4;
    color:#000000;
    text-align: center;
    line-height: 1.8;
    padding: .5em 0;
    font-size: 14px;
    margin: 10px 0;
}
</style>
