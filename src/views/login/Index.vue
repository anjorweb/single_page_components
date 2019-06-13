<template>
    <div class="login_parent" :style="{width: `${pWidth}px`, height: `${pHeight}px`}">
        <div class="title"></div>
        <div class="login_group">
            <section>
                <div class="info">
                    <i class="tel"></i>
                    <input type="tel" maxlength="11" v-model="ruleForm.phone" placeholder="手机号">
                </div>
            </section>
            <section>
                <div class="info">
                    <i class="imgcode"></i>
                    <input type="text" placeholder="请输入图形验证码" v-model="ruleForm.imagecode">
                    <div class="r_add">
                        <img :src="codeSrc" @click="returnImageCode" alt="">
                    </div>
                </div>
            </section>
            <section>
                <div class="info">
                    <i class="msgcode"></i>
                    <input type="text" v-model="ruleForm.code" placeholder="请输入短信验证码">
                    <div class="r_add" @click="getMsgCode">{{getCoding ? `${codeTime}秒` : '获取验证码'}}</div>
                </div>
            </section>
            <section class="login_btn">
                <div class="check_box">
                    <label><input type="checkbox" v-model="checked"><p>我已阅读并同意<span @click="openProtocol">《北京现代心订阅用户协议》</span></p></label>
                </div>
                <span @click="submitForm('ruleForm')" class="go_btn">{{loginLoading ? '登录中' : '登录'}}</span>
            </section>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getStorage, delStorage } from '_utils/sessionStorage.js'
import { getMsgCode } from '_api/user'
export default {
    data() {
        return {
            pWidth: '100%',
            pHeight: '100%',
            loginLoading: false,
            labelPosition: 'top',
            checked: false,
            ruleForm: {
                phone: '',
                imagecode: '8888',
                code: '8888'
            },
            codeTime: 60,
            imgCodeSrc: process.env.VUE_APP_API + '/api/image-code/index',
            getCoding: false,
            codeSrc: ''
        }
    },
    computed: {
        ...mapGetters(['token', 'openid'])
    },
    created() {
        this.pWidth = this.$width
        this.pHeight = this.$height
    },
    mounted() {
        this.returnImageCode()
    },
    methods: {
        ...mapActions(['loginByUserName']),
        // 打开协议
        openProtocol() {
            this.visibleProtocol = true
            if (this.$refs.protocolView) {
                this.$refs.protocolView.init()
            }
            setTimeout(() => {
                this.testValue = 100
            }, 1000)
        },
        // 关闭协议
        closeProtocol() {
            this.visibleProtocol = false
        },
        // 短信获取倒计时
        getCodeTimer() {
            setTimeout(() => {
                this.codeTime--
                if (this.codeTime <= 0) {
                    this.codeTime = 60
                    this.getCoding = false
                } else {
                    this.getCodeTimer()
                }
            }, 1000)
        },
        checkPhone() {
            if (this.ruleForm.phone === '') {
                this.$message('请输入手机号')
                return false
            }
            if (!/^0{0,1}(1[3456789][0-9])\d{8}$/.test(this.ruleForm.phone)) {
                this.$message('手机号格式不正确')
                return false
            }
            return true
        },
        // 获取短信验证码
        getMsgCode() {
            if (this.getCoding) return
            if (!this.checkPhone()) return
            getMsgCode({
                phone: this.ruleForm.phone
            }).then(res => {
                this.$message('验证码发送成功！')
                this.getCoding = true
                this.getCodeTimer()
            })
        },
        returnImageCode() {
            var time = new Date().getTime()
            this.codeSrc = `${this.imgCodeSrc}?v=${time}`
        },
        /**
         * 回车登录
         */
        onKeyUp(keyboard) {
            if (keyboard && keyboard.keyCode === 13) {
                return
            }
        },
        /**
         * 提交
         */
        submitForm(formName) {
            if (!this.checkPhone()) return
            if (!this.checked) {
                this.$message('请同意用户协议')
                return
            }
            this.loginLoading = true
            const rewriteUrl = getStorage('rewrite_url')
            this.ruleForm.openid = this.openid
            this.loginByUserName(this.ruleForm).then(() => {
                if (rewriteUrl) {
                    console.dir(rewriteUrl)
                    delStorage('rewrite_url')
                    this.$router.replace({
                        path: rewriteUrl
                    })
                } else {
                    this.$router.replace({ name: '首页' })
                }
            }, () => {
                this.loginLoading = false
            })
        },
        resetForm(formName) {}
    }
}
</script>
<style scoped>
.check_box {
    color:#333333;
    margin: 0 0 .2rem 0;
    font-size: .24rem;
}
.check_box span {
    color:#000000;
}

.login_group {
    padding: 0 .75rem;
    width: 100%;
    position: absolute;
    left:0;
    top:50%;
    margin-top: -3.5rem;
    left:0;
}
.go_btn {
    width: 100%;
    line-height: .8rem;
     text-align: center;
     color:#ffffff;
     background-color:#46494d;
     display: block;
}
.login_group > section {
    padding: .2rem 0;
    border-bottom: 1px solid #9f9f9f;
}
.login_group section.login_btn {
    border: 0;
}
.info {
    height: .8rem;
    position: relative;
}
.info .r_add {
    width: 1.6rem;
    height: .5rem;
    background:#3e4045;
    position: absolute;
    right: 0;
    top:.15rem;
    color:#ffffff;
    text-align: center;
    line-height: .5rem;
    font-size: .23rem;
    color:#ffffff;
}
.info .r_add img {
    width: 100%;
    height: 100%;
}
.login_group .info > i {
    position: absolute;
    left: 0;
    width:.4rem;
    height: 100%;
    top:0;
}
.login_group .info input {
    width: 100%;
    height: 100%;
    line-height: .8rem;
    box-sizing: border-box;
    background:transparent;
    border:0;
    padding-left: .5rem;
}
</style>
