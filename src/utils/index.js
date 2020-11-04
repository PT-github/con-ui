/**
 * @description: 生成UUID
 */
export function generateUUID () {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * @description: 找出数据层级
 * @param {object} data 数据源
 * @param {string} childKey 对应自节点的key值
 * @param {number} deep 默认层级为1
 * @return {number} 返回数据的层级数
 */
export function findDeep (data, childKey = 'children', deep = 1) {
  if (data && data[childKey] && data[childKey].length) {
    let max = 1, temp
    for (let i = 0, j = data[childKey].length; i < j; i++) {
      temp = findDeep(data[childKey][i], childKey)
      max = max < temp ? temp : max
    }
    return max + deep
  }
  return deep
}