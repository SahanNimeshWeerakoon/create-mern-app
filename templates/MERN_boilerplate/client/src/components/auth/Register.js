import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'

class Register extends Component {
	constructor(props) {
		super(props)

		this.props.clearErrors()

		this.state = {
			name: '',
			email: '',
			password: '',
			msg: null
		}
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		console.log('test');
		const { name, email, password } = this.state
		e.preventDefault()

		const newUser = { name, email, password }

		this.props.register(newUser)

	}

	componentDidUpdate(prevProps) {
		const { error } = this.props

		if(error !== prevProps.error) {
			if(error.id === 'REGISTER') {
				this.setState({ msg: error.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}

	render() {
		const { name, email, password, msg } = this.state

		return (
			<div className="register">
				<p>{ msg ? msg.msg : null }</p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="Name" value={name} onChange={this.handleChange} />
					<input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
					<input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
					<button type="submit">REGISTER</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register)