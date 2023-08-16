import axios from 'axios'
// import logger from './log.service'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.response.use((res) => res,
    function (error) {
        // console.log('Interceptor')
        const expectedError =
            error.response &&
            error.response.status >= 400 && error.response.status < 500
        if (!expectedError) {
            // logger.log(error)
            console.log(error)
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
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
export default httpService
