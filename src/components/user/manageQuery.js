import { useEffect, useState } from "react";
import {Card,Button,Box,Container,TextField,Checkbox, CardContent, Typography,} from "@mui/material";
import app_config from "../../config";
import { styled } from '@mui/material/styles';
import UpdateQuery from "./updateQuery";
import {useNavigate} from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import { FormControlLabel } from "@mui/material";
import Header from "../main/header";


const ManageQuery = () => {

  const [queryArray, setQueryArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showupdateform, setShowupdateform] = useState(false)
  const [updateformdata, setUpdateformdata] = useState({})
  const [currentuser, setCurrentuser] = useState(JSON.parse(sessionStorage.getItem("user")))

  const url = app_config.api_url;

  const fetchData = () => {
    fetch(url + "/query/getbyuserid/" + currentuser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQueryArray(data);
        setLoading(false);
      });
  };

  const CsssButton=styled(Button)(
    {
      paddingTop:10,
      paddingBottom:12
    }
  );

  const deleteQuery = (id) => {
    fetch(url + "/query/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Query Deleted!",
        });
      });
  };

  const handleChange=(query)=> {

    if(query.isresolved===false)
    {
    fetch("http://localhost:5000" + "/query/update/" + query._id, {
      method: "PUT",
      body: JSON.stringify({isresolved: true}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
    })
    fetchData();
  }
  }

  const checkResolved = (query) => {
    if (query.isresolved ===true) {
      return (
        <div>
          <CheckCircleOutlineIcon /> &nbsp; Answered
        </div>
      );
    }

    return (
      <FormControlLabel
        control={
          <Checkbox
            className="w-50 mx-auto"
            checked={query.isresolved}
            onChange={e => handleChange(query)}
          />
        }
        label="Unanswered"
      />
    );
  };

  const displayUpdateQuery =() =>{
    if(showupdateform)
    return <UpdateQuery updateformdata={updateformdata}/>
};
  
  useEffect(() => {
    fetchData();
  }, []);

  const displayQuery = () => {
    if (!loading) {
      return queryArray.map((query,i) => (
        <tr key={query._id}>
          <td className="h6">{i+1}</td>
          <td className="h6">{query.title}</td>
          <td className="h6">{query.description}</td>
            <td>
            <CsssButton
              variant="contained"
              color="inherit"
              onClick={(e) => {
                setShowupdateform(true) 
                setUpdateformdata(query)
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </CsssButton>
            </td>

            <td>
            <CsssButton
              variant="contained"
              color="inherit"
              onClick={(e) => deleteQuery(query._id)}
            >
              <i class="fa-solid fa-trash-can"></i>
            </CsssButton>
            </td>

            <td>
            {checkResolved(query)}          
            </td>
        </tr>
      ));
    }
  };

  return (
    <div className="managecompo">
    <Header></Header>
    <div className="container table-responsive">
      <h1
       style={{
         marginTop:20,
         marginBottom:20
       }}
      >
        MANAGE QUERY DETAILS
      </h1>
      <table className="table borders table-striped ">
      <thead className="table-dark">
          <tr>
            <th scope="col" className="h6">S.No</th>
            <th scope="col" className="h6">Title</th>
            <th scope="col" className="h6">Description</th>
            <th scope="col" className="h6">Actions</th>
            <th scope="col" className="h6"></th>
            <th scope="col" className="h6">Status</th>
          </tr>
        </thead>
        <tbody>
          {displayQuery()}
        </tbody>
      </table>
      {displayUpdateQuery()}
    </div>
    </div>
  );
};

export default ManageQuery;