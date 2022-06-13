import { useEffect, useState } from "react";
import React from "react";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { useParams } from "react-router-dom";
import {Button,Card,CardContent,Grid,Paper,Container,TextField,CardMedia,} from "@mui/material";
import { EventOutlined } from "@mui/icons-material";

const NovelDetail = () => {

  const [novel, setNovelDetail] = useState({});
  const [uploadedby, setUploadedby] = useState("")

  const { id } = useParams();
  const url = app_config.api_url;
  const navigate = useNavigate();


  const fetchData = () => {
    fetch(url + "/novel/getbyid/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNovelDetail(data);
        setUploadedby(data.user.name);
      }); 
  };

  const dispalyrentprice = (rent) => {
     if(!rent){
       return <h6>Rent Price - Not Rentable</h6>
     }
     else{
       return <h6>Rent Price - ₹{novel.rentprice}/month</h6>
     }
  }


  const dispalyexchange = (excahnge) =>{
    if(excahnge)
      return <h6>Exchangable</h6>
  }

  const buyNovel = ()=>{
    sessionStorage.setItem("novel", JSON.stringify(novel));
    navigate('/main/buy')
  }

  const rentNovel = ()=>{
    sessionStorage.setItem("novel", JSON.stringify(novel));
    navigate('/main/rent')
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <Header></Header>
    <Container maxWidth='md'
    style={{
      paddingTop:20
    }}
    >
    <div class="row">
    <div class="col-md-6">
     <Card>
      <CardMedia
       component="img"
       image={url + "/" + novel.thumbnail}
       alt={novel.title}>
      </CardMedia>
     </Card>
    </div>
    <div class="col-md-6">
      <h3 style={{textTransform:"uppercase"}}>{novel.title}</h3>
      <p>{novel.genre}</p>
      <h6>Description</h6>
      <hr className="mt-0 mb-1"></hr>
      <p className="mt-0 mb-1">{novel.author}</p>
      <p>{novel.description}</p>
      <hr></hr>
      <h6>Price - ₹{novel.price}</h6>
      {dispalyrentprice(novel.rentable)}
      {dispalyexchange(novel.exchangeble)}
      <hr></hr>
      <p>Uploaded by - {uploadedby}</p>
      <Button variant="contained" color="inherit" className="w-100 mb-3" onClick={(e) => buyNovel()}>BUY NOW</Button>
      <Button disabled={!novel.rentable} variant="contained" color="inherit" className="w-100 mb-3 " onClick={(e) => rentNovel()}>RENT NOW</Button>
      <Button disabled={!novel.exchangeble} variant="contained" color="inherit" className="w-100 ">EXCHANGE</Button>
    </div>
    </div>
    </Container>
    </div>
  );
};
export default NovelDetail;