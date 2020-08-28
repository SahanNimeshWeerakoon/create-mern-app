import React, { useEffect } from 'react'
import { fetchTest } from '../actions/testActions'
import { connect } from 'react-redux'

const TestComponent = ({ test, fetchTest }) => {
	useEffect(() => { fetchTest() }, [])

	if(test) {
		console.log(test);
		return (
			<div>
				<h1>{test.data}</h1>
			</div>	
		)
	} else {
		return (
			<div>fuck</div>
		)
	}
}

const mapStateToProps = state => ({
	test: state.test
})

export default connect(mapStateToProps, { fetchTest })(TestComponent)