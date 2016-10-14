function propsFromObject(obj, base) {
  return Object.keys(obj).reduce((props, key) => {
    props[key] = Object.assign({}, { value: obj[key] }, base)
    return props
  }, {})
}

export function mergeWithProps(currProps, newProps, overwrite = true) {
  if (overwrite === false) {
    return Object.assign({}, newProps, currProps)
  }
  return Object.assign({}, currProps, newProps)
}

export function mergeWithObj(currProps, newObj, overwrite = true) {
  return mergeWithProps(
    currProps,
    propsFromObject(newObj, { enumerable: true }),
    overwrite
  )
}
