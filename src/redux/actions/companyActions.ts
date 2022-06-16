import {companyActionTypes} from "../actionTypes/index";
import {companydata} from "../../sampleData/companydata";
import APIService from "../../utils/APIService";


export const addCompany = (companydata: any) => async (dispatch: any) => {
    dispatch({type: companyActionTypes.ADD_COMPANY_REQUEST});

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/create`,
            auth: true,
            method: 'POST',
            data: companydata
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["company_id"],
            })
        );
        return true;

    } catch (err: any) {
        dispatch({
            type: companyActionTypes.ADD_COMPANY_FAILED,
            payload: err ? err.data : null
        });

        return false;
    }
};

export const updateCompany = (companydata: any) => async (dispatch: any) => {
    dispatch({type: companyActionTypes.UPDATE_COMPANY_REQUEST});

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/modify/${companydata.companyId}`,
            auth: true,
            method: 'PUT',
            data: companydata
        });

        dispatch({
            type: companyActionTypes.UPDATE_COMPANY_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: companyActionTypes.UPDATE_COMPANY_FAILED,
            payload: err ? err.data : null
        });
    }

};
export const getCompanyList = () => async (dispatch: any) => {
    dispatch({type: companyActionTypes.COMPANY_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: companyActionTypes.COMPANY_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: companyActionTypes.COMPANY_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getPaginatedList = (details: any) => async (dispatch: any) => {
    dispatch({type: companyActionTypes.COMPANY_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/list`,
            auth: true,
            method: 'POST',
            data: details,
        });

        dispatch({
            type: companyActionTypes.COMPANY_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: companyActionTypes.COMPANY_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const companyDelete = (companyId: string[]) => async (dispatch: any) => {
    dispatch({type: companyActionTypes.COMPANY_INACTIVE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/${companyId}/inactive`,
            auth: true,
            method: 'PUT',
        });

        dispatch({
            type: companyActionTypes.COMPANY_INACTIVE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: companyActionTypes.COMPANY_INACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const companyActivate = (id: string) => async (dispatch: any) => {
  dispatch({ type: companyActionTypes.COMPANY_ACTIVE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/system-configuration/company-management/company-registration/${id}/active`,
            auth: true,
            method: 'PUT',
        });

        dispatch({
            type: companyActionTypes.COMPANY_ACTIVE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: companyActionTypes.COMPANY_ACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
};


export const getActiveUsers = (companyId: string[]) => async (dispatch: any) =>{
  dispatch({type:companyActionTypes.COMPANY_ACTIVE_USERS_GETTING_REQUEST});
  setTimeout(()=>{
    dispatch({
      type:companyActionTypes.COMPANY_ACTIVE_USERS_GETTING_SUCCEED,
      payload: companydata
    })
  },2000);
}


export const companySearch = (details:any) => async (dispatch: any) => {
    dispatch({ type: companyActionTypes.COMPANY_SEARCH_REQUEST });
  
    try {
      const res: any = await APIService({
          url: `/system-configuration/company-management/company-registration/list`,
          auth: true,
          method: 'POST',
          data: details,
      });
  
      dispatch({
          type: companyActionTypes.COMPANY_SEARCH_SUCCEED,
          payload: res.data
      });
  } catch (err: any) {
      dispatch({
          type: companyActionTypes.COMPANY_SEARCH_FAILED,
          payload: err ? err.data : null
      });
  }
};
