import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import Main from '_page/main'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Main}></Route>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;