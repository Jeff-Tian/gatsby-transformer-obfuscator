import axios from 'axios'

const request = async (plainText: string) => axios.post('https://font-obfuscator.herokuapp.com/api/encrypt-plus/', {
    "plaintext": plainText,
    "only_ttf": false,
    "upload": false
})

export const obfuscate = async (plainText: string) => {
    const res: any = await request(plainText)

    console.log('ofbuscate = ', res.data);

    if (res.data.message === 'success') {
        return {
            html: [...plainText].map(t => res.data.response.html_entities[t]).join(''),
            fonts: res.data.response.base64ed
        }
    }

    return { plainText }
}
