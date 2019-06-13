export default {
    setGroup({ commit }, item) {
        commit('addGroup', item)
    },
    setCollapse({ commit }, item) {
        commit('changeCollapse', item)
    }
}
