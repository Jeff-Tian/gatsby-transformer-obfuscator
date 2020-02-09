import { obfuscate } from "./obfuscator"

const getObfuscatedNode = createContentDigest => async (obj, id, type) => {
    const obfuscatedContent = await obfuscate(obj.content);

    return ({
        ...obj,
        content: obfuscatedContent,
        id,
        internal: {
            content: obj.content,
            type,
            contentDigest: createContentDigest(obj),
            mediaType: 'text/obfuscated',
            description: 'Obfuscated Content',
        },
    });
}

const transformObject = (
    createContentDigest, createNode, createNodeId, node) => async (
        obj, i) => {
        const id = getObjectId(createNodeId, node)(obj, i)
        createNode(await getObfuscatedNode(createContentDigest)(obj, id, 'text'))
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

    await transformObject(createContentDigest, actions.createNode, createNodeId,
        node)({ content }, 0)
}
