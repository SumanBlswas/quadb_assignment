import {
  GET_JOB_API_ERR,
  GET_JOB_API_REQ,
  GET_JOB_API_SUC,
  SET_PAGINATION,
} from "./job.types";

const initialValue = {
  job: [],
  isLoading: false,
  isError: false,
  currentPage: 1,
  itemsPerPage: 12,
};

const reducer = (state = initialValue, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_JOB_API_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_JOB_API_SUC: {
      return {
        ...state,
        isLoading: false,
        job: payload,
      };
    }

    case GET_JOB_API_ERR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case SET_PAGINATION: {
      return {
        ...state,
        currentPage: payload.currentPage,
        itemsPerPage: payload.itemsPerPage,
      };
    }

    default:
      return state;
  }
};

export { reducer };
