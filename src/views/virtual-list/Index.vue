<template>
    <div>
        <Main
            :data="data"
            :itemHeight="30"
            :height="500">
        </Main>
        <p>{{data.length}}条数据测试</p>
    </div>
</template>
<script>
import Main from './Main.vue'
export default {
    data() {
        return {
            data: []
        }
    },
    components: {
        Main
    },
    created() {
        const vList = [];
        for (let i = 0; i < 10000; i++) {
            vList.push({
                value: i
            });
        }
        this.data = vList;
    }
}
</script>
<style>

</style>

