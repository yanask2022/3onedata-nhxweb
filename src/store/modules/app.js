import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium',
  unSavedChanges: []
}

const mutations = {
  ADD_ROW_TO_UNSAVED: (state, row) => {
    const index = state.unSavedChanges.findIndex(item => item.path === row.path)
    if (index !== -1) {
      state.unSavedChanges.splice(index, 1)
    }
    state.unSavedChanges.push(row)
  },

  DEL_ROW_FROM_UNSAVED: (state, path) => {
    const index = state.unSavedChanges.findIndex(item => item.path === path)
    if (index !== -1) {
      state.unSavedChanges.splice(index, 1)
    }
  },
  CLEAR_UNSAVED: (state) => {
    state.unSavedChanges = []
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  clearUnsaved({ commit }) {
    commit('CLEAR_UNSAVED')
  },
  addRowToUnSaved({ commit }, row) {
    commit('ADD_ROW_TO_UNSAVED', row)
  },
  delRowFromUnSaved({ commit }, key) {
    commit('DEL_ROW_FROM_UNSAVED', key)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
