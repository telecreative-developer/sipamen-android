import { API_SERVER } from '../env'
import { RECEIVED_ACADEMICSCORES, RECEIVED_ACADEMICTITLESCORES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchAcademicScores = (id, accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    try {
      const response = await fetch(`${API_SERVER}/academic-scores?academic_category_id=${id}&status=1&$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedAcademicScores(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_ACADEMICSCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_ACADEMICSCORES', e))
       dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    }
  }
}

export const fetchAcademicTitleScores = (accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICTITLESCORES'))
    try {
      const response = await fetch(`${API_SERVER}/academic-scores?status=1&$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedAcademicTitleScores(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_ACADEMICTITLESCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICTITLESCORES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_ACADEMICTITLESCORES', e))
       dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICTITLESCORES'))
    }
  }
}

const receivedAcademicScores = data => ({
	type: RECEIVED_ACADEMICSCORES,
	payload: data
})

const receivedAcademicTitleScores = data => ({
	type: RECEIVED_ACADEMICTITLESCORES,
	payload: data
})
