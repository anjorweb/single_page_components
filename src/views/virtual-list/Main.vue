<template>
    <div
        :style="`height: ${height}px;`"
        @scroll="handleScroll"
        class="list_view">
        <div
            class="list_view_phantom">
            <div
                :style="`height: ${contentHeight}`"
                ref="content"
                class="list_view_content">
                <div
                    :style="`height: ${itemHeight}px; `"
                    :key="idx"
                    v-for="(o, idx) in visibleData"
                    class="view_item">
                    <p>{{o.value}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visibleData: [],
            // 可视数据长度
            visibleCount: 0
        }
    },
    props: {
        height: {
            default: 300,
            type: Number
        },
        itemHeight: {
            default: 30,
            type: Number
        },
        data: {
            default: function() {
                return []
            },
            type: Array
        }
    },
    mounted() {
        this.handleScroll();
    },
    computed: {
        // 总高度
        contentHeight() {
            return this.data.length * this.itemHeight + 'px'
        }
    },
    methods: {
        // 滚动事件
        handleScroll() {
            this.$nextTick(() => {
                const scrollTop = this.$el.scrollTop;
                this.updateVisibleData(scrollTop);
            })
        },
        // 刷新数据
        updateVisibleData(scrollTop) {
            // 获取可视数据起始位置startIndex
            const startIndex = Math.floor(scrollTop / this.itemHeight);
            // 计算可视数据长度
            this.visibleCount = Math.ceil(this.height / this.itemHeight);
            // 获取可视数据结束位置endIndex
            const endIndex = startIndex + this.visibleCount;
            // 取得可视数据列表
            this.visibleData = this.data.slice(startIndex, endIndex);
            this.$refs.content.style.webkitTransform = `translate3d(0, ${startIndex * this.itemHeight}px, 0)`;
        }
    }
}
</script>
<style>
.list_view {
    border:1px solid #cccccc;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
}
.list_view_phantom {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
}
.list_view_content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.view_item {
    box-sizing: border-box;
    padding: 5px 0;
}
.view_item p {
    text-align: center;
    line-height: 20px;
    background: #f1f3f4;
}
</style>

