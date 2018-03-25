import { DATA_STANDAR_KOMPETENSI, DATA_SERDIK, DATA_HANDBOOK } from '../constants'

export const dataStandarKompetensi = (state = [], action) => {
	switch (action.type) {
		case DATA_STANDAR_KOMPETENSI:
			return action.payload
		default:
			return state
	}
}

export const dataSerdik = (state = [], action) => {
	switch (action.type) {
		case DATA_SERDIK:
			return action.payload
		default:
			return state
	}
}

export const dataHandbook = (state = [], action) => {
	switch (action.type) {
		case DATA_HANDBOOK:
			return action.payload
		default:
			return state
	}
}