import axios from 'axios'

export const obfuscate = async (plainText: string) => {
    const res: any = await axios.post('https://font-obfuscator.herokuapp.com/api/encrypt-plus/', {
        "plaintext": plainText,
        "only_ttf": false,
        "upload": false
    })

    if (res.data.message === 'success') {
        return {
            html: [...plainText].map(t => res.data.response.html_entities[t]).join(''),
            fonts: res.data.response.base64ed
        }
    }

    return {plainText}
}
