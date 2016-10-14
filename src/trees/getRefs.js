import get from "lodash.get"
import mapRecurse from "../helpers/mapRecurse"

// */parent/child/grandchild.property.property
const refRE = /^\*((?:\/[\w-]+)+(?:\.[\w-]+)*)$/g

function getRefClosure(ref) {
  let path = ref
    .replace(/\*\//, "")
    .replace(/\//g, ".children.")
  return function getRef() {
    return get(this.root.children, path)
  }
}

function refInProps(props) {
  Object.keys(props).forEach((key) => {
    let value = props[key].value
    if (refRE.test(value)) {
      props[key].get = getRefClosure(value)
      delete props[key].value
    }
  })
}

export default function() {

  return mapRecurse((node) => {
    if (node.data) {
      refInProps(node.data)
    }
    if (node.inheritance) {
      refInProps(node.inheritance)
    }
    return node
  })

}
