import {companyActionTypes} from "../actionTypes";
import produce from "immer";

const initialState = {
    companyDetails: null,
    allCompanyDetails: {data: [], totalSize: 0},
};

const CompanyData = produce(
    (state = initialState, action: { type: any; payload: any }) => {
        const {type, payload} = action;

        switch (type) {

            case companyActionTypes.UPDATE_COMPANY_SUCCEED: {
                const updated_company_id = state.allCompanyDetails.data.findIndex(
                    (item: { companyId: any }) => item.companyId === payload.companyId
                );
                state.allCompanyDetails.data[updated_company_id] = payload;
                return state;
            }

            case companyActionTypes.COMPANY_DETAILS_GETTING_SUCCEED: {
                state.allCompanyDetails = payload;
                return state;
            }

            case companyActionTypes.COMPANY_SEARCH_SUCCEED: {
                state.allCompanyDetails = payload;
                return state;
            }

            case companyActionTypes.COMPANY_INACTIVE_SUCCEED: {
                const deleted_company_id = state.allCompanyDetails.data.findIndex(
                    (item: { companyId: any }) => item.companyId === payload.companyId
                );
                state.allCompanyDetails.data[deleted_company_id] = payload;
                return state;
            }

            case companyActionTypes.COMPANY_ACTIVE_SUCCEED: {
                const deleted_company_id = state.allCompanyDetails.data.findIndex(
                    (item: { companyId: any }) => item.companyId === payload.companyId
                );
                state.allCompanyDetails.data[deleted_company_id] = payload;
                return state;
            }

            default: {
                return state;
            }
        }
    }
);

export default CompanyData;
