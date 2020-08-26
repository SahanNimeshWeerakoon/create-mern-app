import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types'
import { returnErrors } from './errorActions'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({
		type: USER_LOADING
	})

	// Get token from localStorage
	const token = getState().auth.token

	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}

	if(token) {
		config.headers['x-auth-token'] = token
	}

	axios.get('http://localhost:5000/api/auth/user', config)
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: AUTH_ERROR
			})	
		})
}

// Login
export const login = ({ email, password }) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}

	const body = JSON.stringify({ email, password });

	axios.post('http://localhost:5000/api/auth', body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			if(err) {
				dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN'))
				dispatch({
					type: LOGIN_FAIL
				})
			}
		})
}

// Register
export const register = ({ name, email, password }) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}

	const body = JSON.stringify({ name, email, password });

	axios.post('http://localhost:5000/api/users/register', body, config)
		.then(res => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})	
		})
		.catch(err => {
			if(err) {
				dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER'))
				dispatch({
					type: REGISTER_FAIL
				})
			}
		})
}

// Logout
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	}
}