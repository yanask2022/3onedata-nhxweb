// import variables from '@/styles/element-variables.scss'
// import variables from '@/styles/variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, supportPinyinSearch } = defaultSettings
const THEME_KEY = 'theme'
const state = {
  // theme: localStorage.getItem(THEME_KEY) || variables.primaryColor,
  theme: '',
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  supportPinyinSearch
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
      if (key === 'theme') {
        localStorage.setItem(THEME_KEY, value)
      }
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

