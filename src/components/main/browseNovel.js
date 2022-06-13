import { useEffect, useState } from "react";
import React from "react";
import {Button,Card,CardContent,Grid,Paper,Container,TextField,CardMedia,} from "@mui/material";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const BrowseNovel=()=>{

  const url=app_config.api_url;
  const [novelArray,setNovelArray]=useState([]);
  const navigate = useNavigate();
  
    const fetchData = () => {
        fetch(url + "/novel/getall")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setNovelArray(data);
          });
      };


useEffect(() => {
  fetchData();
}, []);


const displayNovels= () => {
  
  return novelArray.map((novel) => (
    <Grid item md={3}>
      <Card>
        <CardMedia
          component="img"
          height="325"
          image={url + "/" + novel.thumbnail}
          alt={novel.name}
        />

        <CardContent>
        <h4>{novel.title}</h4>
        <p>Uploaded by - {novel.user.name}</p>
        <Button className="" variant="contained" color="inherit" onClick={e => navigate('/main/noveldetail/'+novel._id)  }>View More</Button>   
        </CardContent>
      
      </Card>
      </Grid>
    ));
};

return (
  <div>
    <Header></Header>
  <h1 className="text-center">Novel List</h1>
  <div className="container">
    <Grid container spacing={6}>
      {displayNovels()}
    </Grid>
  </div>
  </div>
);


};

export default BrowseNovel;
