import sortby from "lodash.sortby"

// sort children idempotently
export default function sortChildren(node) {
  sortby(node.children, "path.dir", "path.name", "path.ext")
}
