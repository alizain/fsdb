import "babel-polyfill"
import sortby from "lodash.sortby"
import parseData from "./trees/parseData"
import mergeByName from "./trees/mergeByName"
import mergeIndex from "./trees/mergeIndex"
import commonFrom from "./trees/commonFrom"
import flattenTree from "./helpers/flattenTree"
import init from "./init"
import build from "./build"
import parsers from "./parsers"

export default function fsdb(dataDir, config) {
  return init(dataDir)()
    .then((root) => {
      if (root.children.length === 0) {
        return []
      }
      return Promise.resolve(root)
        .then(parseData(parsers))
        .then(mergeByName())
        .then(mergeIndex())
        .then(commonFrom(config.commonFile))
        .then(build())
        .then(flattenTree())
        .then(data => sortby(data, "slug", "path"))
    })
}
