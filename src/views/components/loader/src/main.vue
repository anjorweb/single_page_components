<template>
    <div class="loading_box">
        <div class="loader">
            <div class="loader-inner ball-clip-rotate-multiple">
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    }
}
</script>
<style scoped>
.loading_box {
    position: fixed;
    width:100%;
    left:0;
    top:0;
    height:100%;
    z-index: 5000;
}
.loader {
    width: 60px;
    height:60px;
    border-radius: 5px;
    position: absolute;
    left:50%;
    top:50%;
    margin: -30px 0 0 -30px;
    background: rgba(0,0,0,0.6);
}
.ball-clip-rotate-multiple {
    border-radius: 10px;
    position: absolute;
    left:50%;
    top:50%;
    margin: -18px 0 0 -18px;
}
.ball-clip-rotate-multiple > div {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 2px solid #fff;
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    -webkit-animation: rotate 1s 0s ease-in-out infinite;
    animation: rotate 1s 0s ease-in-out infinite;
}
.ball-clip-rotate-multiple > div:last-child {
    display: inline-block;
    top: 10px;
    left: 10px;
    width: 15px;
    height: 15px;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    border-color: #fff transparent #fff transparent;
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

  50% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg); }

  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

  50% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg); }

  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }
</style>

