<template>
    <div class="message_box" ref="messBox">
        <div class="box">
            <p>{{desc}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Message',
    data() {
        return {
            classAnimate: {
                animated: false,
                zoomIn: false,
                zoomOut: false
            }
        }
    },
    mounted() {
        // this.animated('zoomIn', false)
        // setTimeout(() => {
        //     this.animated('zoomOut', true)
        // }, 2000)
    },
    methods: {
        animated(animateName, isHide) {
            this.$refs.messBox.classList.add('animated')
            this.$refs.messBox.classList.add(animateName)
            this.$refs.messBox.addEventListener('webkitAnimationEnd', () => {
                if (isHide) {
                    this.$refs.messBox.style.display = 'none'
                }
                this.$refs.messBox.classList.remove('animated')
                this.$refs.messBox.classList.remove(animateName)
            })
        }
    }
}
</script>
<style scoped>
.message_box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}
.box {
    font-size:14px;
    padding: 8px 15px;
    border-radius: 5px;
    max-width: 80%;
    background-color: rgba(0,0,0,0.7);
    color:#ffffff;
}
</style>

