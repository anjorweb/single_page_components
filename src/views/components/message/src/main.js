import Vue from 'vue'
import messageVue from './main.vue'
const MessageVueConstructor = Vue.extend(messageVue)
MessageVueConstructor.prototype.close = function() {
    var vm = this
    vm.$el.parentNode.removeChild(vm.$el)
}
const messageBox = (desc = '') => {
    const body = document.body
    const instance = new MessageVueConstructor({
        el: document.createElement('div'),
        data: {
            desc: desc
        }
    })
    body.appendChild(instance.$el)
    setTimeout(() => {
        instance.close()
    }, 2000)
}
export default messageBox
