import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editingMode: false,
    containers:[],
    dragging: false
  },
  mutations: {
    SET_CONTAINERS(state,containers) {
      state.containers = containers
    },
    SET_CURRENT_TAB(state, {index,tab}) {
      Vue.set(state.containers[index],'currentTab',tab)
    },
    ADD_TAB(state, { index, name, tab }) {
      Vue.set(state.containers[index].tabs, name , tab)
    },
    SET_EDITING_MODE(state,value) {
      state.editingMode = value;
    },
    SET_CONTAINER_STYLE(state,{index,style}) {
      Vue.set(state.containers[index],'style',style)
    },
    SET_CONTAINER_NAME(state, { index, name }) {
      Vue.set(state.containers[index], 'name', name)
    },
    SET_DRAGGING(state, draggingObject) {
      state.dragging = draggingObject
    }
  },
  actions: {
    startDragging({state,commit},draggingObject)
    {
      if (state.editingMode)
      {
        commit('SET_DRAGGING', draggingObject)
      }
    },
    draggableDropped({state,commit},index) {
      if (state.editingMode)
      {
        if (state.dragging && state.dragging.type == 'tab') {
          commit('ADD_TAB', { index, name: state.dragging.data.name, tab: state.dragging.data.tab })
          commit('SET_DRAGGING', false)
        }
      }
    }
  },
  modules: {
  }
})
