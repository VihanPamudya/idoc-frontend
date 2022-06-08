import {workflowActionTypes} from "../actionTypes/index";
import APIService from "../../utils/APIService";


export const addWorkflow = (workflowdata: any) => async (dispatch: any) => {
  dispatch({ type: workflowActionTypes.ADD_WORKFLOW_REQUEST });

    try {
        const res: any = await APIService({
            url: `/workflow-management/workflow/add`,
            auth: true,
            method: 'POST',
            data: workflowdata,
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["workflow_id"],
            })
        );

        return true;

    } catch (err: any) {
        dispatch({
            type: workflowActionTypes.ADD_WORKFLOW_FAILED,
            payload: err ? err.data : null
        });

        return false;
    }
};

export const updateWorkflow = (workflowdata: any) => async (dispatch: any) => {
  dispatch({ type: workflowActionTypes.UPDATE_WORKFLOW_REQUEST });

    try {
        const res: any = await APIService({
            url: `/workflow-management/workflow/modify/${workflowdata.id}`,
            auth: true,
            method: 'PUT',
            data: workflowdata,
        });

        dispatch({
            type: workflowActionTypes.UPDATE_WORKFLOW_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: workflowActionTypes.UPDATE_WORKFLOW_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getWorkflowList = () => async (dispatch: any) => {
  dispatch({ type: workflowActionTypes.WORKFLOW_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/workflow-management/workflow/list/all`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: workflowActionTypes.WORKFLOW_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: workflowActionTypes.WORKFLOW_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const getPaginatedList=(details: any)=>async(dispatch: any)=>{
  dispatch({type:workflowActionTypes.WORKFLOW_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/workflow-management/workflow/list/all`,
            auth: true,
            method: 'POST',
            data: details,
        });

        dispatch({
            type: workflowActionTypes.WORKFLOW_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: workflowActionTypes.WORKFLOW_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const workflowDelete = (workflowId: string, pageNo: number, searchVal: String) => async (dispatch: any) => {
  dispatch({ type: workflowActionTypes.WORKFLOW_DELETE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/workflow-management/workflow/${workflowId}/inactive`,
            auth: true,
            method: 'PUT',
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["workflow_id"],
                page: pageNo,
                filterData: [
                    {
                        property: "workflow_name",
                        operator: "LIKE",
                        value: `${searchVal}`,
                    },
                ],
            })
        );

    } catch (err: any) {
        dispatch({
            type: workflowActionTypes.WORKFLOW_DELETE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const workflowSearch = () => async (dispatch: any) => {
  dispatch({ type: workflowActionTypes.WORKFLOW_SEARCH_REQUEST });
  setTimeout(() => {
    dispatch({
      type: workflowActionTypes.WORKFLOW_SEARCH_SUCCEED,
      payload: [
        { id: "1", username: "user 1" },
        { id: "2", username: "user 2" },
      ],
    });
  }, 2000);
};
