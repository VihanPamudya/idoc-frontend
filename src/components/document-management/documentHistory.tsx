import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";
import moment from "moment";

const columns = [
  {
    dataField: "performedDateTime",
    text: "Performed Time",
    formatter: (rowContent: any, row: any) => {
      var d = new Date(0);
      d.setUTCSeconds(rowContent);
      return moment.utc(d).fromNow();
    },
  },
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div>
          <img src="User.png" style={{ marginRight: "10px", width:"17px" }} />
          {row.performedBy}
        </div>
      );
    },
    dataField: "performedBy",
    text: "Performed By",
  },
  {
    formatter: (rowContent: any, row: any) => {
      return (
        <div className="d-flex">
          {row.action == "Create" ? (<div style={{color:"green"}}>{row.description} :</div>):(<div style={{color:"#fb8c00"}}>{row.description} : </div>)}
          <div style={{color:"#337ab7", marginLeft:"3px"}}>{row.title}</div> 
        </div>
      );
    },
    dataField: "description",
    text: "Description",
  },
];

const DocumentHistory = () => {
  const state = useSelector((state: any) => state);

  return (
        <div className="document-history-component">
          <div>
            <h6>Every actions on this document are logged here.</h6>
          </div>
          <div>
            <BootstrapTable
              keyField="id"
              data={state.documentHistoryData.documentHistoryDetails}
              columns={columns}
              rowStyle={{ color: "#636363" }}
              bordered={false}
            />
          </div>
        </div>
  );
};

export default DocumentHistory;
