import axios from 'axios';
import Swal from 'sweetalert2';

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

export const loginUser = (state) => {
  return axios.post(`${backend}/users/login`, state)
    .then(res => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem('user', JSON.stringify(res.data));
      };
      return res.data;
    })
    .catch(error => Swal.fire({
      icon: "error",
      title: "Error",
      text: `${error.response.data}`,
    }));
};

export const informationUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return {};
  };
};

