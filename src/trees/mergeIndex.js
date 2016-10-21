import mapRecurse from "../helpers/mapRecurse"
import { mergeWithProps } from "../helpers/mergeProps"
import sortChildren from "../helpers/sortChildren"
import debug from "debug"

const log = debug("mergeIndex")

export default function() {

  return mapRecurse((node) => {

    if (!node.children) { return node }

    sortChildren(node)

    node.children = node.children.filter((obj) => {
      if (obj.isFile && obj.path.name === "index") {
        log(`Merging index file for ${node.path.base} dir`)
        node.data = mergeWithProps(node.data, obj.data, false)
        node.sources.push(obj.pathStr)
        node.isFile = true
        return false
      }
      return true
    })

    return node

  })

}
