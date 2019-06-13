<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
import weixin from '_utils/wxShare'
import { isWeixin } from '_utils/util'
import { goWxLogin } from '_api/wx'
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters(['openid'])
    },
    mounted() {
        if (isWeixin) {
            weixin.initWxShare()
            this.fetchUser()
        }
    },
    methods: {
        ...mapActions(['autoLogin']),
        async fetchUser() {
            const openid = Cookie.get('User-Openid')
            const wxLoginNum = Cookie.get('wxAutoLogin')
            if (wxLoginNum === '1') {
                return
            }
            if (!openid) {
                Cookie.set('wxAutoLogin', '1', { expires: 7 })
                goWxLogin({})
                return
            }
        }
    }
}
</script>

<style>
</style>
