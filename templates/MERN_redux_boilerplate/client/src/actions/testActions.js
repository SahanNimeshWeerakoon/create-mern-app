import { TEST_FETCH } from './types'
import axios from 'axios'

export const fetchTest = () => dispatch => {
	axios.get('http://localhost:5000')
		.then(res => {
			dispatch({
				type: TEST_FETCH,
				payload: res.data
			})	
		});
}