import React,{useEffect, useState} from 'react'
import Select from "react-select";
import Checkbox from './Checkbox';
import BootstrapTable from "react-bootstrap-table-next";
import SelectTag from "./SelectTags";
import { useDispatch, useSelector } from 'react-redux';
import { searchUserUsergroups } from '../../redux/actions/searchAction';

function Permission(
  {onChangePermission, permissionList}: {onChangePermission: any, permissionList: any}) {
  const dispatch = useDispatch();

  const searchData = useSelector((state: any) =>
  state.searchData.searchResults.map((item: any) => {
    return { value: item.id, label: item.name };
  })
);

const searchDataResults = useSelector((state: any) =>
  state.searchData.searchResults
);

  

  const [form, setForm] = useState({
    name: '',
    id: '',
    user: false,
    canRead: false,
    canWrite: false
  });


  const onAddClick = () =>{
    let data = JSON.parse(JSON.stringify(permissionList))
    data.push({
      name: form.name,
      id: form.id,
      user: form.user,
      canRead: form.canRead,
      canWrite: form.canWrite
    })
    onChangePermission(data)
    setForm({
      name: '',
      id: '',
      user: false,
      canRead: false,
      canWrite: false
    })
  }

    const handleOnChange= (data: any)=>{
      if (data.target) {
        const name = data.target.name;
        const checked = data.target.checked;

        setForm({ 
          ...form, 
          [ name ]: checked
        });
      } else {
        setForm({
          ...form,
          id: data.value,
          name : data.label,
          user: searchDataResults.find((item: any)=> item.id == data.value)?.user
        });
      }
   }

   const onInputChange = (name: string) =>{
    dispatch(searchUserUsergroups(name));
   }
    const onClickPermission= (type: string, updateIndex: number)=>{

      let arr = JSON.parse(JSON.stringify(permissionList))

      if (type == 'read') {
        arr[updateIndex].canRead = false
      }else{
        arr[updateIndex].canWrite = false
      }
      if (!arr[updateIndex].canRead && !arr[updateIndex].canWrite) {
        arr.splice(updateIndex, 1)
      }
        onChangePermission(arr)
    }

    const columns = [
        {
          dataField: "name",
          text: "For",
        },
        {
           formatter: (rowContent: any, row: any, index: number) => {
              return (<div className='d-flex'>
                  {row.canRead && <div className='me-2'><SelectTag backColor='#ccc' value='Can Read' parent = {row.id} onClick = {() => onClickPermission ("read", index)}/></div>}
                  {row.canWrite && <SelectTag backColor='#ccc' value='Can Write' parent = {row.id} onClick = {() => onClickPermission ("write", index)}/>}
              </div>);
          },
          dataField: "permission",
          text: "Permission",
        },
      ];

  return (
    <div className='common-permission-component p-4 border'>
        <div>
            <h6>Only users and groups defined here will be able to start this workflow on a document</h6>
        </div>
        <div>
            <BootstrapTable
              keyField="id"
              data={permissionList}
              columns={columns}
              rowStyle={{ color: "#636363" }}
              classes="table table-hover"
              bordered={false}
              noDataIndication={<>No permissions are assigned</>}
            />
        </div>
        <div className='mt-5'>
            <h5>Add Permission</h5>
        </div>
        <div>
        <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">For</label>
                <div className="col-sm-8">
                <Select
                    placeholder="Search a user or user group"
                    options={searchData}
                     value={{
                        value: form.id,
                        label: form.name
                     }}
                     onInputChange = {onInputChange}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="mb-3 row d-flex align-items-center" >
                <label className="col-sm-4 col-form-label">Permission</label>
                <div className="col-sm-8">
                    <div className='d-flex'>
                <div className = 'me-2'>
                <Checkbox
                            name='canRead'
                            label='Can Read'
                            onChange={ handleOnChange }
                            checked = {form.canRead}
                />
                </div>
                <div>
                <Checkbox
                            name='canWrite'
                            label='Can Write'
                            onChange={ handleOnChange }
                            checked = {form.canWrite}
                />
                </div>
                </div>
                </div>
              </div>
        </div>
        <div className='text-end'>
        <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#00B0FF", border: "#00B0FF" }}
                  onClick = {onAddClick}
                  disabled={!form.id || (!form.canRead && !form.canWrite)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "5px" }}
                  >
                    <path
                      d="M16.7143 7.23995H10.9286V1.90302C10.9286 1.24814 10.3528 0.717041 9.64286 0.717041H8.35714C7.64719 0.717041 7.07143 1.24814 7.07143 1.90302V7.23995H1.28571C0.575759 7.23995 0 7.77105 0 8.42594V9.61192C0 10.2668 0.575759 10.7979 1.28571 10.7979H7.07143V16.1348C7.07143 16.7897 7.64719 17.3208 8.35714 17.3208H9.64286C10.3528 17.3208 10.9286 16.7897 10.9286 16.1348V10.7979H16.7143C17.4242 10.7979 18 10.2668 18 9.61192V8.42594C18 7.77105 17.4242 7.23995 16.7143 7.23995Z"
                      fill="white"
                    />
                  </svg>
                  Add
                </button>
        </div>
    </div>
  )
}

export default Permission;