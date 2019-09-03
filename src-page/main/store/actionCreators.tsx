import * as constants from './constants'

export const getDetail = (id) => {
    return (dispatch) => {
        const result = {
            title: 'a',
            content: 'b'
        }
        dispatch(changeDetail(result))
    }
}

const changeDetail = result => ({
    type: constants.CHANGE_DETAIL,
    title: result.title,
    content: result.content
})

