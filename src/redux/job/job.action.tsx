import axios from "axios";
import {
  GET_JOB_API_ERR,
  GET_JOB_API_REQ,
  GET_JOB_API_SUC,
  SET_PAGINATION,
} from "./job.types";
import { Dispatch } from "redux";
import { CustomPayload } from "vite/types/hmrPayload.js";

const getJobApiReq = () => {
  return {
    type: GET_JOB_API_REQ as typeof GET_JOB_API_REQ,
  };
};

const getJobApiSuc = (payload: CustomPayload) => {
  return {
    type: GET_JOB_API_SUC as typeof GET_JOB_API_SUC,
    payload,
  };
};

const getJobApiErr = () => {
  return {
    type: GET_JOB_API_ERR as typeof GET_JOB_API_ERR,
  };
};

export const setPagination = (currentPage: number, itemsPerPage: number) => ({
  type: SET_PAGINATION,
  payload: { currentPage, itemsPerPage },
});

export const fetchJobData =
  (selectedLanguage: string) => async (dispatch: Dispatch) => {
    dispatch(getJobApiReq());
    try {
      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b5115117&app_key=019c9a0e876ffe91894ca6d3c0131381&results_per_page=100&what=${selectedLanguage}&content-type=application/json`
      );
      dispatch(getJobApiSuc(response.data.results));
    } catch (error) {
      dispatch(getJobApiErr());
    }
  };
