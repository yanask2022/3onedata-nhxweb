export default {
  data() {
    return {
      isEdit: false
    }
  },
  mounted() {
    window.onbeforeunload = e => {
      if (!this.isEdit) {
        return
      }
      e.preventDefault()
      e.returnValue = ''
    }
  },
  destroyed() {
    window.onbeforeunload = null
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEdit) {
      const h = this.$createElement
      this.$msgbox({
        title: '',
        message: h('div', null, [
          h('span', { style: 'color: #00BAFF' }, 'Reload site?'),
          h('div', { style: 'color: #999' }, 'Changes you made may not be saved.')
        ]),
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done()
            next()
          } else {
            done()
          }
        }
      })
    } else {
      next()
    }
  }
}
