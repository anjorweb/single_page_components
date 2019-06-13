import { getWeixin } from '_api/wx'
var shareUrl = window.location.origin
var pageUrl = window.location.href
const shareImgUrl = require('../assets/images/120.jpg')
var wxDefault = {
    title: 'Title',
    desc: 'Desc',
    imgUrl: shareUrl + shareImgUrl,
    link: shareUrl,
    success: function() {
    },
    successtl: function() {
    }
};
const Extend = (target, source) => {
    return Object.assign(target, source)
}
function wxShare(data) {
    data = data || {}
    const newData = Extend(wxDefault, data);
    wx.onMenuShareAppMessage(newData);
    wx.onMenuShareQQ(newData);
    wx.onMenuShareWeibo(newData);
    wx.onMenuShareTimeline({
        title: newData.desc,
        imgUrl: newData.imgUrl,
        link: newData.link,
        success: newData.successtl
    });
}
let wxData = null
function initWxShare(options = {}) {
    return new Promise((resolve, reject) => {
        getWeixin({
            url: encodeURIComponent(pageUrl)
        }).then(res => {
            const data = res
            data.debug = false;
            wxData = data
            wx.config(data);
            wx.ready(function() {
                wxShare(options);
            });
            resolve(true)
        }).catch(error => {
            reject(error)
        })
    })
}
function setWxShare(options = {}) {
    if (!wxData) {
        initWxShare(options)
        return
    }
    wxShare(options)
}
export default {
    initWxShare: initWxShare,
    setWxShare: setWxShare
}
