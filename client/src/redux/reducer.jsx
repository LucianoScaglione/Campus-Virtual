import { GET_CURRICULUMUNIT, DETAIL_CURRICULUMUNIT, EMPTY_STATE, GET_USERS, GET_USER, DELETE_USER, SEARCH_USERS, DELETE_CURRICULUMUNIT, GET_CURRICULUMUNITBYID, ADD_USERS_TO_CURRICULUM_UNIT, REMOVE_USER_FROM_CURRICULUM_UNIT } from './actions';

const initialState = {
  curriculumUnit: [],
  curriculumUnitCopy: [],
  curriculumUnitById: [],
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
    case GET_CURRICULUMUNITBYID: {
      return {
        ...state,
        curriculumUnitById: payload
      };
    };
    case DETAIL_CURRICULUMUNIT: {
      return {
        ...state,
        detailCurriculumUnit: payload
      };
    };
    case DELETE_CURRICULUMUNIT: {
      const deletedCurriculumUnit = state.curriculumUnit.filter(curriculumUnit => curriculumUnit.id !== payload);
      return {
        ...state,
        curriculumUnit: deletedCurriculumUnit
      };
    };
    case ADD_USERS_TO_CURRICULUM_UNIT:
      return {
        ...state,
        units: {
          ...state.units,
          [action.payload.id]: {
            ...state.units[action.payload.id],
            users: [
              ...(state.units[action.payload.id]?.users || []),
              ...action.payload.userIds
            ]
          }
        },
        loading: false,
        error: null
      };
    case REMOVE_USER_FROM_CURRICULUM_UNIT:
      return {
        ...state,
        units: {
          ...state.units,
          [action.payload.id]: {
            ...state.units[action.payload.id],
            users: state.units[action.payload.id]?.users.filter(
              userId => userId !== action.payload.userId
            ) || []
          }
        },
        loading: false,
        error: null
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