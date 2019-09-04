import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Main from './src/main'
import './less/global/index.less'
import './less/components/index.less'
import './less/pages/index.less'
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>hello</div>
                    <Switch>
                        <Route path='/' exact component={Main}></Route>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;