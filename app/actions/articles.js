import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_ARTICLES } from '../constants'
import { API_SERVER } from '../env'

export const fetchArticles = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_ARTICLES'))
		try {
			const response = await fetch(`${API_SERVER}/articles`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedArticles(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_ARTICLES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ARTICLES'))
		}catch(e) {
			dispatch(setFailed(true, 'FAILED_FETCH_ARTICLES', e))
			dispatch(setLoading(false, 'LOADING_FETCH_ARTICLES'))
		}
	}
}

const receivedArticles = data => ({
	type: RECEIVED_ARTICLES,
	payload: data
})
