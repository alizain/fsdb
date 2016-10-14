import { safeLoad } from "js-yaml"

export function md(str) {
  let obj = {}
  let front = str.match(/---([\s\S]*?)---/)
  if (front) {
    Object.assign(obj, safeLoad(front[1]))
    obj.body = str.replace(front[0], "").trim()
  } else {
    obj.body = str.trim()
  }
  return obj
}

export function yaml(str) {
  return safeLoad(str)
}

export function json(str) {
  return JSON.parse(str)
}

export default {
  md,
  yaml,
  json
}
