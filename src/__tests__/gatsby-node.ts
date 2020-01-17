import { onCreateNode } from '../gatsby-node'
import R from 'ramda'

test('Nothing happens to non `text/plain` node', () => {
  const node = {
    internal: {
      mediaType: 'text/xml',
    },
    loaded: false,
  }

  onCreateNode({
    node,
    actions: {},
    loadNodeContent: (node) => {
      node.loaded = true
    },
    createNodeId: () => {
    },
    createContentDigest: () => {
    },
  })

  expect(node.loaded).not.toBe(true)
})

test('creates node', async () => {
  const node = {
    internal: {
      mediaType: 'text/plain',
    },
    loaded: false,
  }
  const nodes = []

  await onCreateNode({
    node,
    actions: { createNode: R.compose(nodes.push.bind(nodes), R.tap(console.log)) },
    loadNodeContent: async (node) => {
      node.loaded = true

      return 'abcd'
    },
    createNodeId: () => 1234,
    createContentDigest: () => 'abcd',
  })

  expect(node.loaded).toBe(true)
  expect(nodes.length).toBe(1)
  expect(nodes[0].content).toBe('a-b-c-d')
})
