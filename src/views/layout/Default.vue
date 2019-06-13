<template>
    <div class="wrapper">
        <Header></Header>
        <div class="content">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '_components/Header'
import Footer from '_components/Footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
<style>
</style>

