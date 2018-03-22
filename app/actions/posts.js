import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_POSTS, RECEIVED_MY_POSTS } from '../constants'
import { API_SERVER } from '../env'

export const fetchPosts = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_POSTS'))
		try {
			const response = await fetch(`${API_SERVER}/posts?$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedPosts(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_POSTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_POSTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_POSTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_POSTS'))
		}
	}
}

const receivedPosts = data => ({
	type: RECEIVED_POSTS,
	payload: data
})

export const fetchMyPosts = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_MY_POSTS'))
		try {
			const response = await fetch(`${API_SERVER}/posts?id=${id}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedMyPosts(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_MY_POSTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_MY_POSTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_MY_POSTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_MY_POSTS'))
		}
	}
}

const receivedMyPosts = data => ({
	type: RECEIVED_MY_POSTS,
	payload: data
})

export const sendPost = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEND_POST'))
		try {
			await fetch(`${API_SERVER}/posts`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'SUCCESS_SEND_POST'))
			await dispatch(setLoading(false, 'LOADING_SEND_POST'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SEND_POST', e))
			dispatch(setLoading(false, 'LOADING_SEND_POST'))
		}
	}
}

export const sendPostWithImage = (image, item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEND_POST'))
		try {
			const response = await fetch(`${API_SERVER}/upload-image-post`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(sendPost({image: data.id, ...item}, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_SEND_POST'))
			await dispatch(setLoading(false, 'LOADING_SEND_POST'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SEND_POST', e))
			dispatch(setLoading(false, 'LOADING_SEND_POST'))
		}
	}
}