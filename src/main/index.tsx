import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import Button from '_components/button'

class Main extends Component<any>{
    render() {
        const { handleClick, content} = this.props
        return (
            <div>
                <a onClick={handleClick} className="button">点击</a>
                <p>{content}</p>
                <Button />
            </div>
        )
    }
}

const mapState = (state) => ({
    content: state.get('main').get('content')
})

const mapDispatch = (dispatch) => ({
    handleClick() {
        dispatch(actionCreators.changeDetail())
    }
})

export default connect(mapState, mapDispatch)(Main)