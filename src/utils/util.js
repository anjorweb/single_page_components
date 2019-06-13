export const isWeixin = (() => {
    const ua = window.navigator.userAgent.toLowerCase()
    if (/micromessenger/i.test(ua)) {
        return true
    } else {
        return false
    }
})()
