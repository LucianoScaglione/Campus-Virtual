import { GET_CURRICULUMUNIT, GET_CURRICULUMUNITBYID, DETAIL_CURRICULUMUNIT, ADD_USERS_TO_CURRICULUM_UNIT, REMOVE_USERS_FROM_CURRICULUM_UNIT, EMPTY_STATE, GET_USERS, GET_USER, DELETE_USER, SEARCH_USERS, DELETE_CURRICULUMUNIT, SEARCH_UNIT_CURR, GET_PUBLICATIONS, GET_PUBLICATION_BY_ID, CREATE_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION } from './actions';

const initialState = {
  curriculumUnit: [],
  curriculumUnitCopy: [],
  curriculumUnits: [],
  curriculumUnitById: [],
  detailCurriculumUnit: {},
  users: [],
  user: [],
  publications: [],
  currentPublication: null,
  loading: false,
  error: null
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
    case 'REMOVE_USERS_FROM_CURRICULUM_UNIT':
      return {
        ...state,
        curriculumUnits: state.curriculumUnits.map(unit =>
          unit.id === action.payload.curriculumUnitId
            ? { ...unit, users: unit.users.filter(user => user.id !== action.payload.userId) }
            : unit
        ),
        loading: false,
        error: null
      };
    case SEARCH_UNIT_CURR: {
      return {
        ...state,
        users: payload
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

    case GET_PUBLICATIONS:
      return {
        ...state,
        publications: payload
      };
    case GET_PUBLICATION_BY_ID:
      return {
        ...state,
        currentPublication: payload
      };
    case CREATE_PUBLICATION:
      return {
        ...state,
        publications: [...state.publications, payload]
      };
    case UPDATE_PUBLICATION:
      return {
        ...state,
        publications: state.publications.map(pub =>
          pub.id === payload.id ? payload : pub
        )
      };
    case DELETE_PUBLICATION:
      return {
        ...state,
        publications: state.publications.filter(pub => pub.id !== payload)
      };
    default: return state;
  };
};

export default reducer;