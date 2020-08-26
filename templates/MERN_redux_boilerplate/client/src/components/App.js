import React, { Component } from 'react'
import { loadUser } from '../actions/authActions'
import '../styles/App.css'
import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
import Logout from './auth/Logout'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>React Boilerplate</h1>
                    <NavLink to="/login" >Login</NavLink>
                    <NavLink to="/register" >Register</NavLink>
                    <Router>
                        <Route path="/login" component={Login} /register>
                        <Route path="/register" component={Register} />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App
