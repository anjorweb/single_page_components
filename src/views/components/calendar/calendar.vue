<template>
    <div>
        <div class="cld_ui">
            <div class="cld_btns">
                <span class="cancel" @click="onCancel">取消</span>
                <span class="confirm" @click="onConfirm">确定</span>
            </div>
            <div class="cld_top">
                <p class="day_txt">
                    <span @click="onPrevMonth" class="prev">上月2</span>
                    <strong>{{yearMonth}}</strong>
                    <span @click="onNextMonth" class="next">下月</span>
                </p>
            </div>
            <div class="cld_days">
                <ul class="week_list">
                    <li v-for="(o, idx) in weekList" :key="idx"><span>{{o}}</span></li>
                </ul>
                <ul class="days_list">
                    <li v-for="(o, idx) in list" :class="{now: idx === curIndex, none_day: o.unavailableClass, none_set: o.unavailableForSetting}" :key="idx" @click="onCurrentDay(o)"><span>{{o.num}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 监听onClickDay事件，返回 年/月/日
 */
import dateUtils from './calendar.js'
export default {
    data() {
        return {
            yearMonth: '',
            weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            list: [],
            normalList: [],
            activeDate: null,
            curIndex: -1
        }
    },
    props: {
        'max-date': {
            type: Date
        },
        'min-date': {
            type: Date
        },
        'current-date': {
            default: function() {
                return new Date()
            },
            type: Date
        },
        'normal-date': {
            default: function() {
                return []
            },
            type: Array
        }
    },
    watch: {
        'normalDate': {
            immediate: true,
            handler(val) {
                this.normalList = this.normalDate.map((item) => {
                    return item.getTime()
                })
                this.init()
            }
        }
    },
    created() {
        this.init()
        this.emitNormalDays()
    },
    methods: {
        // 设置组件内需要的日期设置
        setOptions() {
            this.minTime = this.minDate.getTime();
            this.maxTime = this.maxDate.getTime();
            this.myDate = this.currentDate
            this.nowDate = this.currentDate
            // this.activeDate = this.currentDate
        },
        init() {
            if (!this.myDate) {
                this.setOptions()
            }
            this.getDayList(this.myDate)
        },
        // 取消
        onCancel() {
            this.$emit('cancel')
        },
        // 确定
        onConfirm() {
            this.$emit('confirm', this.activeDate)
        },
        // 选择了当天
        onCurrentDay(dateObj) {
            if (dateObj.unavailableForRange) {
                this.$message('不在可选日期范围内')
                return
            }
            if (dateObj.unavailableForSetting) {
                this.$message('当日预约已满')
                return
            }
            if (dateObj.prevMonth) {
                this.onPrevMonth()
                return
            } else if (dateObj.nextMonth) {
                this.onNextMonth()
                return
            }
            const dateStr = dateObj.dateStr
            const date = dateStr.split('/')
            const index = this.list.findIndex(item => {
                return item.dateStr === dateStr
            })
            this.curIndex = index
            this.activeDate = new Date(date[0], date[1], date[2])
        },
        // 触发父层获取当月可用日期事件
        emitNormalDays() {
            this.$emit('returnMonth', this.myDate)
        },
        // 上一个月
        onPrevMonth() {
            this.normalList = []
            var year = this.myDate.getFullYear()
            var month = this.myDate.getMonth() - 1
            var day = this.myDate.getDate()
            this.myDate = new Date(year, month, day)
            this.emitNormalDays()
            this.init()
        },
        // 下一个月
        onNextMonth() {
            this.normalList = []
            var year = this.myDate.getFullYear()
            var month = this.myDate.getMonth() + 1
            var day = this.myDate.getDate()
            this.myDate = new Date(year, month, day)
            this.emitNormalDays()
            this.init()
        },
        // 获取月的数据
        getDayList(date) {
            const nowDate = this.nowDate
            // 存储此刻的年月日数据
            const nowDateArr = [
                nowDate.getFullYear(),
                nowDate.getMonth(),
                nowDate.getDate()
            ]
            // 存储当前年月日时间
            const thisDateArr = [
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ]
            // 获取当前日期对象的总天数
            const fullDays = dateUtils.getDaysList(this.myDate)
            // 获取当月1日前补空天数
            const startDays = dateUtils.getMonthLeftDays(this.myDate)
            // 获取当月最后一天补空天数
            const endDays = dateUtils.getMonthRightDays(this.myDate)
            const arr = []
            this.yearMonth = `${thisDateArr[0]}年${thisDateArr[1] + 1}月`
            this.curIndex = -1
            // 遍历补空的前几天
            startDays.days.map(num => {
                const date = new Date(startDays.year, startDays.month, num)
                arr.push({
                    num: num,
                    now: false,
                    date: date,
                    unavailableClass: true,
                    prevMonth: true
                })
            })
            // 遍历当月所有天
            fullDays.map(num => {
                const obj = {}
                const date = new Date(thisDateArr[0], thisDateArr[1], num)
                const thisTime = date.getTime()
                if (thisTime < this.minTime || thisTime > this.maxTime) {
                    obj.unavailableClass = true
                    obj.unavailableForRange = true
                }
                // 判断是否有日期不可用
                if (!obj.unavailableForRange && this.normalList.indexOf(thisTime) > -1) {
                    obj.unavailableClass = true
                    obj.unavailableForSetting = true
                }
                obj.num = num
                obj.now = false
                obj.dateStr = `${thisDateArr[0]}/${thisDateArr[1]}/${num}`
                obj.data = date
                arr.push(obj)
            })
            // 遍历补空的后几天
            endDays.days.map(num => {
                const date = new Date(startDays.year, startDays.month, num)
                arr.push({
                    num: num,
                    now: false,
                    date: date,
                    unavailableClass: true,
                    nextMonth: true
                })
            })
            const index = arr.findIndex(item => {
                return nowDateArr[0] === thisDateArr[0] && nowDateArr[1] === thisDateArr[1] && item.dateStr === `${nowDateArr[0]}/${nowDateArr[1]}/${nowDateArr[2]}`
            })
            this.curIndex = index
            this.list = arr
        }
    }
}
</script>
<style scoped>
.cld_ui {
    font-size: 14px;
    color:#000000;
    padding:10px 0;
}
.cld_btns {
    padding-bottom: 10px;
    font-size: 14px;
    overflow: hidden;
}
.cld_btns span {
    padding: 3px 15px;
    color:#005ef6;
}
.cancel {
    float: left;
}
.confirm {
    float: right;
}
.day_txt {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background:#f7f7f7;
    color:#000000;
    padding:.5em 0;
    position: relative;
}
.cld_days ul { overflow: hidden;}
.cld_days .week_list {
    background:#f7f7f7;
    color:#000000;
}
.cld_days li {
    font-size: 14px;
    width: 14.28%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3em;
}
.cld_days .none_day {
    color:#d0d3d7;
}
.days_list .now span, .cld_days .none_set span {
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    flex: 0 0 auto;
    background: #ea513a;
    border-radius: 100%;
    color:#ffffff;
}
.cld_days .none_set span {
    background-color: #cccccc;
}
.prev, .next {
    position: absolute;
    top:0;
    height:100%;
    width: 50px;
    overflow: hidden;
    text-indent: -999px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prev {
    left:0;
}
.next {
    right:0;
}
.prev::after, .next::after {
    content: '';
    width:10px;
    height:10px;
    display: block;
    border-left: 2px solid #000000;
    border-bottom: 2px solid #000000;
}
.prev::after {
    transform: rotate(45deg);
    margin-left:-8px;
}
.next::after {
    transform: rotate(-135deg);
    margin-left:-15px;
}
</style>

