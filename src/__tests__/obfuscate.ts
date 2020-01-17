import {obfuscate} from "../obfuscator"

jest.setTimeout(20000)
test('obfuscate', async () => {
    const plainText = '今天天气不错'

    const res: any = await obfuscate(plainText)

    expect(res.data.message).toEqual('success')
    expect(Object.keys(res.data.response.html_entities).length).toEqual(5)
})
