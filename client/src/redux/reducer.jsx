import { GET_CURRICULUMUNIT, DETAIL_CURRICULUMUNIT, EMPTY_STATE, GET_USERS, GET_USER, DELETE_USER, SEARCH_USERS } from './actions';

const initialState = {
  curriculumUnit: [],
  curriculumUnitCopy: [],
  detailCurriculumUnit: {},
  users: [],
  user: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRICULUMUNIT: {
      return {
        ...state,
        curriculumUnit: payload,
        curriculumUnitCopy: payload
      };
    };
    case DETAIL_CURRICULUMUNIT: {
      return {
        ...state,
        detailCurriculumUnit: payload
      };
    };
    case EMPTY_STATE: {
      return {
        ...state,
        detailCurriculumUnit: {}
      };
    };
    case GET_USERS: {
      return {
        ...state,
        users: payload
      };
    };
    case GET_USER: {
      return {
        ...state,
        user: payload
      };
    };
    case DELETE_USER: {
      const deletedUser = state.users.filter(user => user.id !== payload);
      return {
        ...state,
        users: deletedUser
      };
    };
    case SEARCH_USERS: {
      return {
        ...state,
        users: payload
      };
    };
    default: return state;
  };
};

export default reducer;