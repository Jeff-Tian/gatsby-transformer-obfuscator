import axios from 'axios'

export const obfuscate = (plainText: string) => axios.post('https://font-obfuscator.herokuapp.com/api/encrypt-plus/', {
    "plaintext": plainText,
    "only_ttf": false,
    "upload": false
})
