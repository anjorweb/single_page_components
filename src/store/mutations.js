export const mutations = {
    addGroup(state, item) {
        state.groups.push(item)
    },
    changeCollapse(state, item) {
        state.isCollapse = item
    }
}
