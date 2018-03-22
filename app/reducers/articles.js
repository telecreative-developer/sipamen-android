import { RECEIVED_ARTICLES } from '../constants'

export const articles = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_ARTICLES:
			return action.payload
		default:
			return state
	}
}