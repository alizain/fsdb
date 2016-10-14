import Promise from "bluebird"

export default function mapRecurse(func) {

  return async function walker(node) {

    let newNode = await func(node)

    if (newNode.children) {
      newNode.children = await Promise.all(
        newNode.children.map(walker)
      )
    }

    return newNode

  }

}
