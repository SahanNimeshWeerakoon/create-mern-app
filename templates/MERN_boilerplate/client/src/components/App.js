import React, { Component } from 'react'
import TextComponent from './TextComponent'
import '../styles/App.scss'

class App extends Component {
    render() {
        return (
            <div>
                <h1>React Test</h1>
                <TextComponent />
            </div>
        )
    }
}

export default App