import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff'

export function syncAllChangesToStore(newValue, origin, path, callback) {
  // 更新的字段
  const updateObj = updatedDiff(newValue, origin)
  const updateKeys = Object.keys(updateObj)

  // 从store中删除除开更新字段以外的记录
  Object.keys(origin).forEach(key => {
    if (!updateKeys.includes(key)) {
      removeFromStore.apply(this, [path + key])
    }
  })
  // 将更新过的字段存入store
  updateKeys.forEach(updateKey => {
    // ADD_ROW_TO_UNSAVED 其实是更新。 存在则更新， 不存在新增
    this.$store.dispatch('app/addRowToUnSaved', callback(updateKey, newValue[updateKey]))
  })
  return updateKeys.length > 0
}

export function removeFromStore(path) {
  this.$store.dispatch('app/delRowFromUnSaved', path)
}

export function syncRemoveFromStore(path) {
  // TODO 优化, 改为同步更新
  // this.$store.commit('app/DEL_ROW_FROM_UNSAVED', path)
}

/**
 * 单条记录
 * @param newValue
 * @param originValue
 * @param payload
 * @returns {boolean}
 */
export function syncChangeToStore(newValue, originValue, payload) {
  // 原始值 与 当前改变值相等， 从store删掉
  if (newValue === originValue) {
    removeFromStore.apply(this, [payload.path])
    return false
  } else {
    // 否则， 覆盖/新增
    this.$store.dispatch('app/addRowToUnSaved', payload)
    return true
  }
}
