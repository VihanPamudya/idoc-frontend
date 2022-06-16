import APIService from "../../utils/APIService";
import { fileActionTypes, tagActionTypes } from "../actionTypes";

export const addFile = (file: any) => async (dispatch: any) => {
    dispatch({type: fileActionTypes.FILE_ADD_REQUEST});

    try {
        const res: any = await APIService({
            url: `/file-management/file/add`,
            auth: true,
            method: 'POST',
            data: file,
        });

        dispatch({
            type: fileActionTypes.FILE_ADD_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: fileActionTypes.FILE_ADD_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const updateFile = (file: any) => async (dispatch: any) => {
    dispatch({type: fileActionTypes.FILE_UPDATE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/file-management/file/update/${file.id}`,
            auth: true,
            method: 'PUT',
            data: file,
        });

        dispatch({
            type: fileActionTypes.FILE_UPDATE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: fileActionTypes.FILE_UPDATE_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getFileDetails=()=>async(dispatch: any)=>{
    dispatch({type:fileActionTypes.FILE_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/file-management/file/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: fileActionTypes.FILE_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: fileActionTypes.FILE_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

}


export const fileDelete=(selected: String)=>async(dispatch: any)=>{
    dispatch({type:fileActionTypes.FILE_INACTIVE_REQUEST});
    try {
        const res: any = await APIService({
            url: `/file-management/file/delete/${selected}`,
            auth: true,
            method: 'DELETE',
        });

        //dispatch(getTagDetails());
    } catch (err: any) {
        dispatch({
            type: fileActionTypes.FILE_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}