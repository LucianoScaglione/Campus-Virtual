import axios from 'axios';
import Swal from 'sweetalert2';

const backend = 'http://localhost:3001';

export const GET_CURRICULUMUNIT = "GET_CURRICULUMUNIT";
export const DETAIL_CURRICULUMUNIT = "DETAIL_CURRICULUMUNIT";
export const CREATE_CURRICULUMUNIT = "CREATE_CURRICULUMUNIT";
export const DELETE_CURRICULUMUNIT = "DELETE_CURRICULUMUNIT";
export const ADD_USERS_TO_CURRICULUM_UNIT = 'ADD_USERS_TO_CURRICULUM_UNIT';
export const REMOVE_USER_FROM_CURRICULUM_UNIT = 'REMOVE_USER_FROM_CURRICULUM_UNIT';

export const EMPTY_STATE = "EMPTY_STATE";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const SEARCH_USERS = "SEARCH_USERS";



export const emptyState = () => {
  return {
    type: EMPTY_STATE
  };
};

//CURRUNIT --------------------------------------------

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

export const createCurriculumUnit = (state) => {
  return () => {
    return axios.post(`${backend}/curriculumunit`, state)
      .then(res => {
        const response = () => {
          Swal.fire({
            icon: "success",
            title: `${res.data}`,
            showConfirmButton: false,
            timer: 2000
          });
          if (res.status === 201) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          };
        };
        response();
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const deleteCurriculumUnit = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/curriculumunit/${id}`)
      .then(res => {
        dispatch({ type: DELETE_CURRICULUMUNIT, payload: id })
        Swal.fire({
          icon: "success",
          title: `${res.data.msg}`,
          showConfirmButton: false,
          timer: 1200
        });
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const updateCurriculumUnit = (id, state) => {
  return () => {
    return axios.put(`${backend}/curriculumunit/${id}`, state)
      .then(res => {
        const response = () => {
          Swal.fire({
            icon: "success",
            title: `${res.data}`,
            showConfirmButton: false,
            timer: 2000
          });
          if (res.status === 200) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          };
        };
        response();
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const addUsersToCurriculumUnit = (id, userIds) => {
  return () => {
    return axios.post(`${backend}/curriculumunit/${id}`, { UserId: userIds })
      .then(res => {
        const response = () => {
          if (res.status === 200) {
            setTimeout(() => {
            }, 3000);
          }
        };
        response();
      })
  };
};

export const removeUserFromCurriculumUnit = (curriculumUnitId, userId) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    return axios.post(`${backend}/curriculumunit/${curriculumUnitId}/remove-user`, { UserId: userId })
      .then(res => {
        dispatch({ type: 'SET_LOADING', payload: false });
        if (res.status === 200) {
          dispatch({
            type: 'REMOVE_USER_FROM_CURRICULUM_UNIT',
            payload: { curriculumUnitId, userId }
          });
        } else {
          throw new Error(res.data.message || 'Unexpected response from server');
        }
      })
      .catch(error => {
        dispatch({ type: 'SET_LOADING', payload: false });
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message || 'An error occurred while removing the user';
        
        dispatch({ 
          type: 'SET_ERROR', 
          payload: errorMessage
        });

        console.error('Error removing user:', error);
      });
  };
};

//USERS --------------------------------------------

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

export const getUsers = () => {
  return (dispatch) => {
    return axios.get(`${backend}/users`)
      .then(res => dispatch({ type: GET_USERS, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/users/${id}`)
      .then(res => dispatch({ type: GET_USER, payload: res.data }))
      .catch(error => console.log(error));
  };
};

export const updateUser = (id, state) => {
  return () => {
    return axios.put(`${backend}/users/${id}`, state)
      .then(res => {
        const response = () => {
          Swal.fire({
            icon: "success",
            title: `${res.data.msg}`,
            showConfirmButton: false,
            timer: 2000
          });
          if (res.status === 200) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          };
        };
        response();
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const createUser = (state) => {
  return () => {
    return axios.post(`${backend}/users/create`, state)
      .then(res => {
        const response = () => {
          Swal.fire({
            icon: "success",
            title: `${res.data.msg}`,
            showConfirmButton: false,
            timer: 2000
          });
          if (res.status === 201) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          };
        };
        response();
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/users/${id}`)
      .then(res => {
        dispatch({ type: DELETE_USER, payload: id })
        Swal.fire({
          icon: "success",
          title: `${res.data.msg}`,
          showConfirmButton: false,
          timer: 1200
        });
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

export const searchUsers = (name) => {
  return (dispatch) => {
    return axios.get(`${backend}/users?name=${name}`)
      .then(res => dispatch({ type: SEARCH_USERS, payload: res.data }))
      .catch(error => Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data}`,
      }));
  };
};

