import { documentActionTypes } from "../actionTypes";
import APIService from "../../utils/APIService";

export const addDocument = (document: any) => async (dispatch: any) => {
    dispatch({type: documentActionTypes.ADD_DOCUMENT_REQUEST});

    try {
        const res: any = await APIService({
            url: `/document-management/document/add`,
            auth: true,
            method: 'POST',
            data: document
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["document_id"]
            })
        );

    } catch (err: any) {
        dispatch({
            type: documentActionTypes.ADD_DOCUMENT_FAILED,
            payload: err ? err.data : null
        });
    }

    return false;
}

export const updateDocument = (document: any) => async (dispatch: any) => {
    dispatch({type: documentActionTypes.UPDATE_DOCUMENT_REQUEST});

    try {
        const res: any = await APIService({
            url: `/document-management/document/modify/${document.document_id}`,
            auth: true,
            method: 'PUT',
            data: document
        });
        dispatch({
            type: documentActionTypes.UPDATE_DOCUMENT_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: documentActionTypes.UPDATE_DOCUMENT_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const getPaginatedList = (details: any) => async (dispatch: any) => {
  dispatch({ type: documentActionTypes.DOCUMENT_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/document-management/document/list`,
            auth: true,
            method: 'POST',
            data: details,
        });
        
        dispatch({
            type: documentActionTypes.DOCUMENT_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: documentActionTypes.DOCUMENT_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const documentInactive=(selected: String, pageNo: number, searchVal: String)=>async(dispatch: any)=>{
    dispatch({type:documentActionTypes.DOCUMENT_DELETE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/document-management/document/${selected}/inactive`,
            auth: true,
            method: 'PUT',
            data: selected,
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["document_id"],
                page: pageNo,
                filterData: [
                    {
                        property: "document_title",
                        operator: "LIKE",
                        value: `${searchVal}`,
                    },
                ],
            })
        );
    } catch (err: any) {
        dispatch({
            type: documentActionTypes.DOCUMENT_DELETE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const getSharingLink = (document_id: any) => async(dispatch: any) => {
    dispatch({type:documentActionTypes.DOCUMENT_SHARING_LINK_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/document-management/document/share/${document_id}`,
            auth: true,
            method: 'POST'
        });

        dispatch({
            type: documentActionTypes.DOCUMENT_SHARING_LINK_GETTING_SUCCEED,
            payload: res.data
        });
        
    } catch (err: any) {
        dispatch({
            type: documentActionTypes.DOCUMENT_SHARING_LINK_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

}

export const unShareLink = (document_id: any) => async(dispatch: any) => {
    dispatch({type:documentActionTypes.DOCUMENT_UNSHARE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/document-management/document/unshare/${document_id}`,
            auth: true,
            method: 'POST'
        });

        dispatch({
            type: documentActionTypes.DOCUMENT_UNSHARE_SUCCEED,
            payload: res.data
        });
        
    } catch (err: any) {
        dispatch({
            type: documentActionTypes.DOCUMENT_UNSHARE_FAILED,
            payload: err ? err.data : null
        });
    }

}