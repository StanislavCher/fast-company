import axios from 'axios'
// import logger from './log.service'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import { httpAuth } from '../hooks/useAuth'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

// axios.defaults.baseURL = configFile.apiEndpoint

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url)
            // config.url = 'profession/'
            // config.url = 'profession/12wefd45'
            config.url = (containSlash ? (config.url.slice(0, -1)) : config.url) + '.json'
            // console.log(config.url)
            // console.log(axios.defaults.baseURL)
            // console.log(config)
            const expiresDate = localStorageService.getTokenExpiresDate()
            const refreshToken = localStorageService.getRefreshToken()
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post('token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                // console.log(data)
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            const authToken = localStorageService.getAccessToken()
            if (authToken) {
                config.params = { ...config.params, auth: authToken }
            }
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    }
)

function transformData(data, method) {
    // const mockData = {
    //     '67rdca3eeb7f6fgeed471198': {
    //         _id: '67rdca3eeb7f6fgeed471198',
    //         name: 'Нудила',
    //         color: 'primary'
    //     },
    //     '67rdca3eeb7f6fgeed471100': {
    //         _id: '67rdca3eeb7f6fgeed471100',
    //         name: 'Странный',
    //         color: 'secondary'
    //     },
    //     '67rdca3eeb7f6fgeed4711012': {
    //         _id: '67rdca3eeb7f6fgeed4711012',
    //         name: 'Троль',
    //         color: 'success'
    //     }
    // }

    // console.log('mockData', mockData['67rdca3eeb7f6fgeed471100'])
    // console.log('Object.keys(mockData)', Object.keys(mockData))

    // const mockData1 = Object.keys(mockData).map((key) => {
    //     // console.log('data', data)
    //     // console.log('key', key)
    //     // console.log('data[key]', data[key])
    //     // return mockData[key]
    //     return mockData[key]
    // })
    // console.log('mockData1', mockData1)

    // console.log('Object.keys(data)', Object.keys(data))
    if (method === 'patch') {
        return data
    } else {
        return data && !data._id
            ? Object.keys(data).map((key) => ({
                // console.log('data', data)
                // console.log('key', key)
                // console.log('data[key]', data[key])
                ...data[key]
            }))
            : data
    }
}

http.interceptors.response.use(
    (res) => {
        // console.log('res.data', res.data)
        // console.log('res.config.method !== \'patch\'', res.config.method !== 'patch')
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data, res.config.method) }
        }
        // console.log('res.data', res.data)
        return res
    },
    function (error) {
        // console.log('Interceptor')
        const expectedError =
            error.response &&
            error.response.status >= 400 && error.response.status < 500
        if (!expectedError) {
            // logger.log(error)
            // console.log(error)
            // console.log('UnExpected error ', error)
            // console.log('UnExpected error', error)
            // console.log('UnExpected error')
            toast.error('Something was wrong. Try again later.')
            // toast.error(`${error}`)
            // toast('UnExpected error')
        }
        return Promise.reject(error)
    })

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}
export default httpService
