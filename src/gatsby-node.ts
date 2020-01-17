export const getObfuscatedNode = createContentDigest => (obj, id, type) => ({
  ...obj,
  content: [...obj.content].join('-'),
  id,
  internal: {
    content: obj.content,
    type,
    contentDigest: createContentDigest(obj),
    mediaType: 'text/plain',
    description: 'Obfuscated Content',
  },
})

export const transformObject = (
  createContentDigest, createNode, createNodeId, node) => (
  obj, i) => {
  const id = getObjectId(createNodeId, node)(obj, i)
  createNode(getObfuscatedNode(createContentDigest)(obj, id, 'obfuscated-text'))
}

const getObjectId = (createNodeId, node) => (obj, i) => obj.id ?
  obj.id :
  createNodeId(`${node.id} [${i}] >>> obfuscated`)

export const onCreateNode = async (
  { node, actions, loadNodeContent, createNodeId, createContentDigest }) => {

  if (node.internal.mediaType !== 'text/plain') {
    return
  }

  const content = await loadNodeContent(node)

  transformObject(createContentDigest, actions.createNode, createNodeId,
    node)({ content }, 0)
}
