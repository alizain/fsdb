const META_KEY = "_"

export default function() {

  return function build(node, parent, root) {

    delete node[META_KEY]
    let self = Object.create(Object.prototype, node.data)
    let meta = {}

    if (parent) {
      meta.parent = parent
    }

    meta.isFile = node.isFile
    meta.isDirectory = node.isDirectory
    meta.sources = node.sources

    if (!root) {
      root = self
    }
    meta.root = root

    if (node.children) {
      let children = node.children.map(obj => build(obj, self, root))
      meta.children = Object.freeze(children)
    }

    Object.defineProperty(
      self,
      META_KEY,
      { value: Object.freeze(meta) }
    )

    return self

  }

}
