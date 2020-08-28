import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TextComponent = () => {
	const [testData, setTestData] = useState('')

	useEffect(() => {
		axios.get('http://localhost:5000')
			.then(res => {
				setTestData(res.data)
			})
	}, [])
	
	return (
		<div>{testData}</div>
	)
}

export default TextComponent