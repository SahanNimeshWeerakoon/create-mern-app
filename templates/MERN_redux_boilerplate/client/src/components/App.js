import React, { Component } from 'react'
import '../styles/App.scss'
import TestComponent from './TestComponent'
import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>React Boilerplate</h1>
                    <TestComponent />
                </div>
            </Provider>
        );
    }
}

export default App
