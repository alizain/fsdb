import Promise from "bluebird"
import mapRecurse from "../helpers/mapRecurse"
import { mergeWithObj } from "../helpers/mergeProps"
import debug from "debug"

const log = debug("parseData")
const fs = Promise.promisifyAll(require("fs"))

export default function(parsers) {

  return mapRecurse(async (node) => {

    if (node.isFile) {
      log(`Parsing ${node.path.base}`)
      let raw = await fs.readFileAsync(node.pathStr, { encoding: "utf8" })
      let parsed = parsers[node.path.ext.replace(".", "")](raw)
      if (parsed) {
        node.data = mergeWithObj(node.data, parsed, false)
      }
    }
    return node

  })

}
