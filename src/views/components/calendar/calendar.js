/**
 * getDay() 0 表示周日
 */
export default {
    /**
     * 获取某月的总天数
     * 由于天是1-31，所以传入0的时候，会得到上个月的最后一天，以此来获取总天数
     * @param {Date} Date
     */
    getDaysOnMonth(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = new Date(year, month, 0)
        return day.getDate()
    },
    // 获取天数列表
    getDaysList(date) {
        const days = this.getDaysOnMonth(date)
        const arr = []
        for (var i = 1; i <= days; i++) {
            arr.push(i)
        }
        return arr
    },
    // 计算当月第一天前空几天
    getMonthStartWeek(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const tDate = new Date(`${year}/${month}/1`)
        var weekNum = tDate.getDay()
        return weekNum === 0 ? 6 : weekNum - 1
    },
    // 计算当月最后一天距周日空几天
    getMonthEndWeek(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const days = this.getDaysOnMonth(date)
        const tDate = new Date(year, month, days)
        var weekNum = tDate.getDay()
        return weekNum === 0 ? 0 : 7 - weekNum
    },
    // 上个月末尾的一些日期
    getMonthLeftDays(date) {
        // 获取应该从上个月取几天
        const prevDays = this.getMonthStartWeek(date)
        // 获取上个月总天数
        var yearNum = date.getFullYear()
        var nextMonthNum = date.getMonth() - 1
        if (nextMonthNum < 0) {
            yearNum--
            nextMonthNum = 11
        }
        const prevMonthDate = new Date(yearNum, nextMonthNum, 1)
        const prevMonthDays = this.getDaysOnMonth(prevMonthDate)
        const list = {
            year: yearNum,
            month: nextMonthNum,
            days: []
        }
        for (var i = 1; i <= prevMonthDays; i++) {
            if (i > prevMonthDays - prevDays) {
                list.days.push(i)
            }
        }
        return list
    },
    // 下个月末尾的一些日期
    getMonthRightDays(date) {
        // 获取应该从下个月取几天
        const prevDays = this.getMonthEndWeek(date)
        // 获取上个月总天数
        var yearNum = date.getFullYear()
        var nextMonthNum = date.getMonth() + 1
        if (nextMonthNum > 11) {
            nextMonthNum = 0
            yearNum++
        }
        const prevMonthDate = new Date(yearNum, nextMonthNum, 1)
        const prevMonthDays = this.getDaysOnMonth(prevMonthDate)
        const list = {
            year: yearNum,
            month: nextMonthNum,
            days: []
        }
        for (var i = 1; i <= prevMonthDays; i++) {
            if (i <= prevDays) {
                list.days.push(i)
            }
        }
        return list
    }
}
