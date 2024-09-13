import { GET_CURRICULUMUNIT, DETAIL_CURRICULUMUNIT, EMPTY_STATE } from './actions';

const initialState = {
  curriculumUnit: [],
  curriculumUnitCopy: [],
  detailCurriculumUnit: {}
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
    default: return state;
  };
};

export default reducer;