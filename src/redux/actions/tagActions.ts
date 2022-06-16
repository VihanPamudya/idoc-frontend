import {tagActionTypes} from '../actionTypes';
import APIService from "../../utils/APIService";

export const addTag = (tag: { name: string; color: any, parentTag_id?:any }) => async (dispatch: any) => {
    dispatch({type: tagActionTypes.TAG_ADD_REQUEST});

    try {
        const res: any = await APIService({
            url: `/tag-management/tag/add`,
            auth: true,
            method: 'POST',
            data: tag,
        });

        dispatch({
            type: tagActionTypes.TAG_ADD_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: tagActionTypes.TAG_ADD_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const updateTag = (tag: any) => async (dispatch: any) => {
    dispatch({type: tagActionTypes.TAG_UPDATE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/tag-management/tag/modify/${tag.id}`,
            auth: true,
            method: 'PUT',
            data: tag,
        });

        dispatch({
            type: tagActionTypes.TAG_UPDATE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: tagActionTypes.TAG_UPDATE_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getTagDetails=()=>async(dispatch: any)=>{
    dispatch({type:tagActionTypes.TAG_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/tag-management/tag/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: tagActionTypes.TAG_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: tagActionTypes.TAG_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

}

export const getChildrenTagDetails=(tag:any)=>async(dispatch: any)=>{
  dispatch({type:tagActionTypes.CHILDREN_TAG_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/tag-management/tag/children/${tag.id}`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: tagActionTypes.CHILDREN_TAG_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: tagActionTypes.CHILDREN_TAG_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

}

export const tagDelete=(selected: String)=>async(dispatch: any)=>{
    dispatch({type:tagActionTypes.TAG_INACTIVE_REQUEST});
    try {
        const res: any = await APIService({
            url: `/tag-management/tag/delete/${selected}`,
            auth: true,
            method: 'DELETE',
        });

        dispatch(getTagDetails());
    } catch (err: any) {
        dispatch({
            type: tagActionTypes.TAG_INACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
}



