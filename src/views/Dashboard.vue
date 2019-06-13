<template>
    <div class="home">
        <h1>暂无</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['getGroups', 'getText'])
    },
    mounted() {
        this.loadCanvasScene()
    },
    methods: {
        loadCanvasScene() {
        }
    }
}
</script>
<style>
.box-card { margin-bottom:15px; margin-right:15px; float:left; }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
</style>

