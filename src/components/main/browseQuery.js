import { useEffect, useState } from "react";
import React from "react";
import Header from "./header";
import {Button,Card,CardContent,Grid,Paper,Container,TextField,CardMedia,} from "@mui/material";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";

const BrowseQuery =()=>{

  const url=app_config.api_url;

  const [queryArray,setQueryArray]=useState([]);
  const navigate = useNavigate();
  
    const fetchData = () => {
        fetch(url + "/query/getall")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setQueryArray(data);
          });
      };


useEffect(() => {
  fetchData();
}, []);


const displayQueries = () => {
  
  return queryArray.map((query) => (
      <Grid>
      <Card sx={{margin:8}}>
        <CardContent>
          <div>
          <h5 style={{display:"inline-block"}}><b>Query Regarding : </b> </h5>
          <p  style={{display:"inline-block", paddingLeft:5}}> {query.title}</p>
          </div>
          
          <div>
          <h6 style={{display:"inline-block"}}><b>Description :</b></h6>
          <p  style={{display:"inline-block"}}> {query.description}</p>
          </div>

          <div>
          <h6 style={{display:"inline-block"}} ><b>Query by :</b></h6>
          <p  style={{display:"inline-block", paddingLeft:5}}> {query.user.name}</p>
          </div>

          <Button color="inherit" variant="contained" onClick={e => navigate('')}>Contact</Button>   
        </CardContent>
      </Card>
    </Grid>
    ));
};

return (
  <div>
    <Header></Header>
    <h1 className="text-center">Queries</h1>
      {displayQueries()}
  </div>
);

};

export default BrowseQuery;
