import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
// import isOutDated from '../utils/isOutdated'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // lastFetch: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            // state.lastFetch = Date.now()
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const loadUsersList = () => async (dispatch, getState) => {
    // const { lastFetch } = getState().users
    // console.log(lastFetch)
    // if (isOutDated(lastFetch)) {
    dispatch(usersRequested)
    try {
        const { content } = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
    // }
}
export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getUsersByIds = (userIds) => (state) => {
    if (userIds && state.users.entities) {
        return state.users.entities.filter((u) => {
            return u._id === userIds
        })[0]
    } else return []
}

const { reducer: usersReducer, actions } = usersSlice

const { usersRequested, usersReceived, usersRequestFailed } = actions

export default usersReducer
