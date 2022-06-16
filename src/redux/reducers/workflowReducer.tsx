import {workflowActionTypes} from '../actionTypes';
import produce from "immer";

const initialState = {
    workflowDetails : null,
    allWorkflowDetails: {data:[], totalSize:0},
    workFlow: []
};



const workflowData = produce((state = initialState, action: {type: any; payload: any;}) => {
    const {type, payload} = action;
    switch (type){
        
        case workflowActionTypes.UPDATE_WORKFLOW_SUCCEED: {
                const updated_workflow_id = state.allWorkflowDetails.data.findIndex((item: { id: any; })=>item.id===payload.id);
                state.allWorkflowDetails.data[updated_workflow_id]=payload; 
                return state;
        }
            
        
        case workflowActionTypes.WORKFLOW_DETAILS_GETTING_SUCCEED: {
                state.allWorkflowDetails =  payload;
                return state;
        }

        case workflowActionTypes.WORKFLOW_SEARCH_SUCCEED: {
                state.allWorkflowDetails = payload;
                return state;
        }

        case workflowActionTypes.WORKFLOW_DETAILS_GETTING_BY_USERID_SUCCEED: {
                state.workFlow = payload;
                return state;
        }
         
        default:{
                return state;
        }
    }
});

export default workflowData;
