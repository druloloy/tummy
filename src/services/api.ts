import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1'

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
    },
    responseType: 'json'
})

const USER_PREFIX = '/user'
const RECIPE_PREFIX = '/recipe'


const UserAPI = {
    createUser: async (data: Omit<User, '_id'> & {_auth_id: string}) => {
        return await API.post(USER_PREFIX, data)
            .then((res) => res.data)
    },
    isEmailOrUsernameAvailable: async ({email = '', username = ''}: {email?: string, username?: string}) => {
        try {
            await API.get(`${USER_PREFIX}/availability?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`)
            return true
        } catch (error) {
            return false
        }
    }
}


export {
    UserAPI
}