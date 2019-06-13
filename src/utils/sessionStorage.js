export function getStorage(item) {
    const val = sessionStorage.getItem(item)
    return val
}
export function setStorage(item, value) {
    sessionStorage.setItem(item, value)
}
export function delStorage(item) {
    sessionStorage.removeItem(item)
}
