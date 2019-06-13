<template>
    <div class="header"></div>
</template>
<script>
export default {
    data() {
        return {
            pageName: ' '
        }
    },
    components: {
    },
    // watch: {
    //     '$route': 'getRoute'
    // },
    computed: {
    },
    mounted() {
        // this.getRoute()
    },
    methods: {
        getRoute() {

        },
        onReturn() {
            const to = this.$route
            if (to.meta.back) {
                console.dir()
                this.$router.push({
                    name: to.meta.back
                })
            } else {
                history.go(-1)
            }
        }
    }
}
</script>
<style scoped>
</style>

