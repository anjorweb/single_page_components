# 地图组件

###示例
```
<Map
    ref="mapView"
    :dealerCode="dealerCode"
    :height="mapHeight"
    @confirm="changeAddress"
    @cancel="openMapPop=false"
    :cityCode="1235"
    :initPoint="[13.20303, 102.00003]">
</Map>
```
height  组件需要显示的高度，默认全屏
confirm 点击确定后回调
cancel 点击取消后回调
dealerCode 经销商code
cityCode 城市code
initPoint  初始化的点

//内置reset方法
this.$refs.mapView.reset()  可以调用