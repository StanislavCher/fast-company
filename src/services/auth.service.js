import axios from 'axios'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

export const authService = {
    register: async function ({ email, password }) {
        // try {
        const { data } = await httpAuth.post('accounts:signUp', {
            email,
            password,
            returnSecureToken: true
        })
        return data
        // } catch (e) {
        //
        // }
    },
    login: async function ({ email, password }) {
        // try {
        const { data } = await httpAuth.post('accounts:signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    refresh: async function () {
        // try {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
            // refresh_token: refreshToken
        })
        // console.log('1', data)
        return data
    }
}
