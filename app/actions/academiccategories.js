import { API_SERVER } from '../env'
import { RECEIVED_ACADEMICCATEGORIES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchScores = (accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMYCATEGORIES'))
    try {
      const response = await fetch(`${API_SERVER}/academic_categories?$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedAcademicCategories(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_ACADEMYCATEGORIES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMYCATEGORIES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_ACADEMYCATEGORIES', e))
    ]   dispatch(setLoading(false, 'LOADING_FETCH_ACADEMYCATEGORIES'))
    }
  }
}

const receivedAcademicCategories = data => ({
	type: RECEIVED_ACADEMICCATEGORIES,
	payload: data
})