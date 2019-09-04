import * as constants from './constants'

export const changeDetail = () => {
    return (dispatch) => {
        const result = {
            title: 'a',
            content: 'b'
        }
        dispatch(changeDetails(result))
    }
}

const changeDetails = result => ({
    type: constants.CHANGE_DETAIL,
    title: result.title,
    content: result.content
})

