import sortby from "lodash.sortby"
import parseData from "./trees/parseData"
import mergeByName from "./trees/mergeByName"
import mergeIndex from "./trees/mergeIndex"
import commonFrom from "./trees/commonFrom"
import flattenTree from "./helpers/flattenTree"
import init from "./init"
import build from "./build"
import parsers from "./parsers"
import debug from "debug"

const log = debug("fsdb")
const err = debug("fsdb:error")

export default function fsdb(dataDir, config) {
  log("Initializing data")
  return init(dataDir)()
    .then(parseData(parsers))
    .then(mergeByName())
    .then(mergeIndex())
    .then(commonFrom(config.commonFile))
    .then(build())
    .then(flattenTree())
    .then(data => sortby(data, "slug", "path"))
    .catch((e) => {
      err("Failed to build data")
      err(e)
    })
}
