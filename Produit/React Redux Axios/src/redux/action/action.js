import { GET_DETAILS, POST_DETAILS, DELETE_DETAILS } from "../type";

const GetApiAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: GET_DETAILS,
      payload: data,
    });
  }

}

const PostApiAction = (id) => {
  return function (dispatch) {
      dispatch({
        type: POST_DETAILS,
        payload: id,
      })
  }
}

const DeleteApiAction = (data) => {
  return function (dispatch) {
      dispatch({
        type: DELETE_DETAILS,
        payload: data,
      })
  }
}
export { PostApiAction, GetApiAction, DeleteApiAction };