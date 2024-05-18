import axios from 'axios'
import { getImageURL, uploadImage } from '@fb/storage'

const BASE_URL = 'http://localhost:5000/api/v1'

const API = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
})

const defaultHeaders = {
    'Content-Type': 'application/json',
    'timeout': 5000 // 5 seconds
}

const USER_PREFIX = '/user'
const RECIPE_PREFIX = '/recipe'


const UserAPI = {
    createUser: async (data: Omit<User, '_id'> & {_auth_id: string}) => {
        return await API.post(USER_PREFIX, data, {
            headers: {...defaultHeaders}
        })
            .then((res) => res.data)
    },
    isEmailOrUsernameAvailable: async ({email = '', username = ''}: {email?: string, username?: string}) => {
        try {
            await API.get(`${USER_PREFIX}/availability?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`, {
                headers: {...defaultHeaders}
            })
            return true
        } catch (error) {
            return false
        }
    },
    updateUser: async (data: {_id: string} & Partial<Omit<User, '_id'>>, token: string) => {
        return await API.put(`${USER_PREFIX}?_id=${data._id}`, data, {
            headers: {...defaultHeaders, Authorization: `Bearer ${token}`}
        })
    },
    getAnonUser: async (_id: string) => {
        return await API.get(`${USER_PREFIX}/anon?_id=${_id}`, {
            headers: {...defaultHeaders}
        })
        .then((res) => res.data)
    }
}

const RecipeAPI = {
    createRecipe: async (data: Omit<Recipe, 'created_at' | 'owner_id'>, token: string) => {
        return await API.post(RECIPE_PREFIX, data, {
            headers: {
                ...defaultHeaders,
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => res.data)
    },
    getRecipe: async (id: string): Promise<{data: Recipe, message: string}> => {
        return await API.get(`${RECIPE_PREFIX}?_id=${id}`, {
            headers: {...defaultHeaders}
        })
        .then((res) => res.data)
    }
}

const ImageAPI = {
    uploadImage: async (imageStr: string, _id: string) => {
        try {
            const snapshot = await uploadImage(imageStr, _id)
            const imageURL = await getImageURL(snapshot.ref)

            return imageURL
        } catch (error) {
            console.log(error)
        }
    }
}


export {
    UserAPI,
    RecipeAPI,
    ImageAPI
}