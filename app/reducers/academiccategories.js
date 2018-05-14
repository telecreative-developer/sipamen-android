import { RECEIVED_ACADEMYCATEGORIES } from '../constants'

export const academiccategories = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ACADEMYCATEGORIES:
      return action.payload
    default:
      return state
  }
}