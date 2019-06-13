import Main from './main.vue'
import Vue from 'vue'
const MainVueConstructor = Vue.extend(Main)
MainVueConstructor.prototype.close = function() {
    const vm = this
    vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el)
}
const MainBox = (options = {}) => {
    const body = document.body
    const instance = new MainVueConstructor({
        el: document.createElement('div'),
        data: options
    })
    return {
        show() {
            body.appendChild(instance.$el)
        },
        close() {
            instance.close()
        }
    }
}
export default MainBox
