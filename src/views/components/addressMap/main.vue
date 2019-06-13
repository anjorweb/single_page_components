<template>
    <div class="map_cont" :style="{width: width + 'px', height: height + 'px'}">
        <div class="map_top_txt">选取地点</div>
        <div class="map_input">
            <input type="text" placeholder="请输入要查找的地点" v-model="searchQuery" @keyup="keyup">
        </div>
        <div class="search_list" v-show="searchList.length > 0">
            <ul>
                <li @click="activePoint(o)" v-for="(o, idx) in searchList" :key="idx">{{o.name}}</li>
            </ul>
        </div>
        <div class="map_box" ref="mapView" id="getCarMap">
        </div>
        <div class="tac btns">
            <button @click="onCancel">取消</button>
            <button @click="onConfirm">确定</button>
        </div>
    </div>
</template>
<script>
const _ = require('lodash');
const width = window.innerWidth
const height = window.innerHeight
export default {
    data() {
        return {
            searchQuery: '',
            searchList: [],
            curPoint: null
        }
    },
    props: {
        width: {
            default: width,
            type: Number
        },
        height: {
            default: height,
            type: Number
        },
        initPoint: {
            default: function() {
                return []
            },
            type: Array
        },
        dealerCode: {
            type: Number
        },
        cityCode: {
            type: Number
        }
    },
    mounted() {
        this.createGetCarMap()
    },
    methods: {
        onCancel() {
            this.$emit('cancel')
        },
        // 确定选择
        onConfirm() {
            this.$emit('confirm', this.curPoint)
        },
        reset() {
            this.curPoint = null
            this.searchList = []
            this.searchQuery = ''
            if (this.marker) {
                this.map.removeOverlay(this.marker)
                this.marker = null
            }
            if (this.map) {
                this.map.centerAndZoom('成都市', 11)
            }
        },
        // 选择搜索结果
        activePoint(obj) {
            this.searchQuery = obj.name
            this.curPoint = obj
            this.clearMap()
            // 重置中心点
            this.map.centerAndZoom(this.curPoint.point, 12)
            // 创建标注
            var marker = new BMap.Marker(obj.point)
            // 将标注添加到地图中
            this.map.addOverlay(marker)
            this.marker = marker
        },
        keyup() {
            this.search()
        },
        // 搜索
        search: _.debounce(function() {
            const _self = this
            if (this.searchQuery !== '') {
                // 执行搜索
                const options = {
                    onSearchComplete: function(results) {
                        // 判断状态是否正确
                        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                            var s = []
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                s.push({
                                    name: results.getPoi(i).title + '-' + results.getPoi(i).address,
                                    city: results.getPoi(i).city,
                                    point: results.getPoi(i).point
                                })
                            }
                            _self.searchList = s
                        }
                        if (results.getCurrentNumPois() === 0) {
                            _self.clearMap()
                        }
                    },
                    renderOptions: {
                    }
                }
                const local = new BMap.LocalSearch(this.map, options)
                local.search(this.searchQuery)
            } else {
                this.clearMap()
            }
        }, 500),
        // 清理地图覆盖点，搜索结果制空
        clearMap() {
            this.searchList = []
            // this.map.clearOverlays()
            if (this.marker) {
                this.map.removeOverlay(this.marker)
                this.marker = null
            }
        },
        createGetCarMap() {
            var map = new BMap.Map(this.$refs.mapView)
            // map.centerAndZoom('成都市', 11)
            var point = new BMap.Point(104.080214, 30.685036)
            map.centerAndZoom(point, 11)
            map.enableScrollWheelZoom(true)
            // centre:椭圆中心点,X:横向经度,Y:纵向纬度
            // function add_oval(centre, x, y) {
            //     var assemble = []
            //     var angle
            //     var dot
            //     var tangent = x / y
            //     for (var i = 0; i < 36; i++) {
            //         angle = (2 * Math.PI / 36) * i
            //         dot = new BMap.Point(centre.lng + Math.sin(angle) * y * tangent, centre.lat + Math.cos(angle) * y)
            //         assemble.push(dot)
            //     }
            //     return assemble;
            // }
            // var oval = new BMap.Polygon(add_oval(point, 0.14, 0.12), { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 1 })
            // map.addOverlay(oval)
            this.map = map
        }
    }
}
</script>
<style scoped>

.map_box {
    position: absolute;
    width:100%;
    bottom: .89rem;
    top:1.84rem;
}
.map_top_txt {
    text-align: center;
    line-height: 1rem;
    font-size: .3rem;
    border-bottom: 1px solid #e7e7e7;
}
.map_input {
    padding: .12rem .3rem;
}
.map_cont select, .map_cont input {
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border:0;
    background:#e6e7ea;
    border-left:0;
    border-right:0;
    box-sizing: border-box;
}
.search_list {
    position: absolute;
    width: 100%;
    top:78px;
    overflow-y: auto;
    bottom:0;
    z-index:10;
}
.search_list ul {
    padding: .15rem .3rem;
    background:#ffffff;
}
.search_list li {
    font-size: 12px;
    padding: .6em 0;
}
.map_cont {
    overflow: hidden;
    height:100%;
}
.btns {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom:0;
}
.btns button {
    width: 50%;
    border:0;
    line-height: .89rem;
    font-size: .3rem;
    border-radius: 0;
    color:#ffffff;
    background:#424449;
}
.btns button:nth-child(1) {
    background: #8f979d;
}
.btns button:nth-child(2) {
    background: #012c5f;
}
</style>

