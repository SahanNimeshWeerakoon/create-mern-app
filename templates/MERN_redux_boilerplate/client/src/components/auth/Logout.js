import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'

const Logout = ({ logout }) => {
	return (
		<Fragment>
			<button onClick={logout}>Logout</button>
		</Fragment>
	);
}

export default connect(null, { logout })(Logout);