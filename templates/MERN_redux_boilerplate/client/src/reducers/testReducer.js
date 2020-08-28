import { TEST_FETCH } from '../actions/types'

const initialState = {
	data: null
}

export default (state=initialState, action) => {
	switch(action.type) {
		case TEST_FETCH:
			return {
				...state,
				data: action.payload
			}
		default:
			return {
				...state
			}
	}
}