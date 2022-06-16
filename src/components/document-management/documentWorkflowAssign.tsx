import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { getWorkflowListByUserId } from "../../redux/actions/workflowActions";

const columns = [
  {
    //   formatter: (rowContent: any, row: any) => {
    //     return (
    //       <div>
    //         <img src="folder 1.png" style={{ marginRight: "10px" }} />
    //         {row.title}
    //       </div>
    //     );
    //   },
    dataField: "",
    text: "Type",
  },
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "",
    text: "For",
  },
  {
    dataField: "",
    text: "Validation",
  },
];

const DocumentWorkflow = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const [workflowId, setWorkflowId] = useState(null);

  const workflowList = state.workflowData.workFlow.map(function ( workflow: any ) {
    return { value: workflow.id, label: workflow.workflowName };
  });

  const onMenuOpen = () => {
    dispatch(getWorkflowListByUserId()); 
  };

  return (
    <div>
      <div className="container">
        <p>
          Verify or validate your documents with people of your organization
          using workflows.
        </p>
        {workflowId ? (
          <div>
            <div className="d-flex mt-4">
              <div style={{ width: "auto", marginRight: "20px" }}>
                <h5> workflow name and started date</h5>
              </div>
              <div>
                <Button>Cancel the current workflow</Button>
              </div>
            </div>
            <div className="mt-5">
              <BootstrapTable
                keyField="key"
                data={[]}
                columns={columns}
                rowStyle={{
                  color: "#636363",
                  cursor: "pointer",
                  lineHeight: "40px",
                }}
                classes="table table-hover"
                bordered={false}
                noDataIndication={<></>}
                remote
              />
            </div>
          </div>
        ) : (
          <div className="d-flex mt-4">
            <div>
              <Col sm={10}>
                <b>Choose a workflow to add</b>
              </Col>
            </div>
            <div style={{ width: "50%", marginRight: "20px" }}>
              <Select options={workflowList} onMenuOpen={onMenuOpen}></Select>
            </div>
            <div>
              <Button>Start workflow</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentWorkflow;
