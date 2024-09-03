const createInputLimit = {
  bind(el, { value }, vNode) {
    const componentInstance = vNode.componentInstance
    if (!(componentInstance && componentInstance.filterable)) {
      return
    }
    // 获取组件实例，获取查询参数，修改查询参数
    el.__zbb_handler__ = (e) => {
      componentInstance.query = componentInstance.query.trim()
      const str = componentInstance.query
      // // 保留从字符串开头开始的连续数字
      const match = str.match(/^\d*/)
      componentInstance.query = match[0]
    }
    el.addEventListener('input', el.__zbb_handler__)
  },
  unbind(el, { value }, vNode) {
    if (typeof el.__zbb_handler__ === 'function') {
      el.removeEventListener('input', el.__zbb_handler__)
      delete el.__zbb_handler__
    }
  }
}
const install = function(Vue) {
  Vue.directive('createInputLimit', createInputLimit)
}

createInputLimit.install = install
export default createInputLimit
