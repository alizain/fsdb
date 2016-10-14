export default function() {

  return function flattenTree(node) {

    let all = [node]
    if (node._.children) {
      return all.concat(
        node._.children.reduce((accum, child) => (
          accum.concat(flattenTree(child))
        ), [])
      )
    }
    return all

  }

}
