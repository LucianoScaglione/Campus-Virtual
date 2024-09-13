import axios from 'axios';

const backend = 'http://localhost:3001';

export const GET_CURRICULUMUNIT = "GET_CURRICULUMUNIT";
export const DETAIL_CURRICULUMUNIT = "DETAIL_CURRICULUMUNIT";
export const EMPTY_STATE = "EMPTY_STATE";

export const getCurriculumUnit = () => {
  return (dispatch) => {
    return axios.get(`${backend}/curriculumunit`)
      .then(res => dispatch({ type: GET_CURRICULUMUNIT, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const detailCurriculumUnit = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/curriculumunit/${id}`)
      .then(res => dispatch({ type: DETAIL_CURRICULUMUNIT, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const emptyState = () => {
  return {
    type: EMPTY_STATE
  };
};
