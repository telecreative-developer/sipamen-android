import { RECEIVED_ACADEMICSCORES, RECEIVED_ACADEMICTITLESCORES } from '../constants'

export const academicscores = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ACADEMICSCORES:
      return action.payload
    default:
      return state
  }
}

export const academictitlescores = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ACADEMICTITLESCORES:
      return action.payload
    default:
      return state
  }
}