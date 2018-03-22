import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_EVENTS } from '../constants'
import { API_SERVER } from '../env'

export const fetchEvents = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_EVENTS'))
		try {
			const response = await fetch(`${API_SERVER}/events`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedEvents(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_EVENTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_EVENTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_EVENTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_EVENTS'))
		}
	}
}

const receivedEvents = data => ({
	type: RECEIVED_EVENTS,
	payload: data
})