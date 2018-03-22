import { RECEIVED_NOTIFICATIONS, RECEIVED_GENERAL_NOTIFICATIONS } from '../constants'

export const notifications = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_NOTIFICATIONS:
			return action.payload
		default:
			return state
	}
}

export const generalNotifications = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_GENERAL_NOTIFICATIONS:
			return action.payload
		default:
			return state
	}
}