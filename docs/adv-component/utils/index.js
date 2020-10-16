export const strong = str => `<strong>${str}</strong>`

export const link = (target, text = 'here') => `<a href="${target}">${text}</a>`


function createArray (len, valueMaker) {
  const arr = []
  let i = 0
  while (i < len) arr.push(valueMaker(i++))
  return arr
}

export function generateOptions (maxLevel, itemsPerLevel = maxLevel) {
  const generate = parentId => createArray(itemsPerLevel, i => {
    const id = parentId + String.fromCharCode(97 + i)
    const option = { id, label: id.toUpperCase() }
    if (id.length < maxLevel) option.children = generate(id)
    return option
  })

  return generate('')
}