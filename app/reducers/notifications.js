import { RECEIVED_NOTIFICATIONS } from '../constants'

export const notifications = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_NOTIFICATIONS:
			return action.payload
		default:
			return state
	}
}