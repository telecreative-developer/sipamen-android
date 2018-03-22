import { SET_LOADING, SET_SUCCESS, SET_FAILED, ON_SET_NAVIGATE, ON_SET_ACTIVE_PAGE_HOME } from '../constants'

export const setLoading = (condition, process_on) => ({
	type: SET_LOADING,
	condition,
	process_on
})

export const setSuccess = (condition, process_on) => ({
	type: SET_SUCCESS,
	condition,
	process_on
})

export const setFailed = (condition, process_on, message) => ({
	type: SET_FAILED,
	condition,
	process_on,
	message
})

export const setNavigate = (link, data) => ({
	type: ON_SET_NAVIGATE,
	link,
	data
})

export const setActivePageHome = data => ({
	type: ON_SET_ACTIVE_PAGE_HOME,
	payload: data
})