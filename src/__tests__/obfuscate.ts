import { obfuscate } from "../obfuscator"

jest.setTimeout(20000)
test('obfuscate', async () => {
    const plainText = '今天天气不错'

    const res: any = await obfuscate(plainText)

    expect(res.html.length).toBeGreaterThan(0)
    expect(Object.keys(res.fonts).length).toEqual(3)
})
