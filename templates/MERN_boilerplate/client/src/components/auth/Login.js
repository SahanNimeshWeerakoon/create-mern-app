import React, { Component } from 'react'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Login extends Component {
	constructor(props) {
		super(props)

		this.props.clearErrors()
		
		this.state = {
			email: '',
			password: '',
			msg: null
		}
	}

	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault()

		const { email, password } = this.state

		this.props.login({ email, password })
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props
		if(prevProps.error !== error) {
			if(error.id === 'LOGIN') {
				this.setState({ msg: error.msg })
			} else {
				this.setState({ msg: null })
			}
		}
	}

	render() {
		const { email, password, msg } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit}>
					<p>{ msg ? msg.msg : null }</p>
					<input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
					<input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
					<button>Login</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.error,
	isAuthenticated: state.auth.isAuthenticated	
})

export default connect(mapStateToProps, { login, clearErrors })(Login)