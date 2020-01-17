const onCreateNode = async (
    { node, actions, loadNodeContent, createNodeId, createContentDigest }) => {
  const transformObject = (obj, id, type) => {
    const obfuscatedNode = {
      ...obj,
      id,
      internal: {
        type,
        contentDigest: createContentDigest(obj),
        mediaType: 'text/plain',
        description: 'Obfuscated Content',
      },
    }

    createNode(obfuscatedNode)
  }

  const { createNode, createParentChildLink } = actions

  if (node.internal.mediaType !== 'text/plain') {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = [{ content: content + 'tweets' }]

  parsedContent.forEach((obj, i) => {
    transformObject(obj,
        obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> obfuscated`),
        'obfuscated')
  })
}

exports.onCreateNode = onCreateNode
