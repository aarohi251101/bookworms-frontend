import { useEffect, useState } from "react";
import app_config from "../../config";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UpdateNovel from "./updateNovel";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../main/header";


const ManageNovel = () => {

  const navigate = useNavigate();
  const [novelArray, setNovelArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showupdateform, setShowupdateform] = useState(false)
  const [updateformdata, setUpdateformdata] = useState({})
  const [currentuser, setCurrentuser] = useState(JSON.parse(sessionStorage.getItem("user")))

  const url = app_config.api_url;

  const fetchData = () => {
    fetch(url + "/novel/getbyuserid/" + currentuser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNovelArray(data);
        setLoading(false);
      });
  };

  const deleteNovel = (id) => {
    fetch(url + "/novel/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "DELETED BOOK!",
        });
      });
  };

  const displayUpdateNovel =() =>{
      if(showupdateform)
      return <UpdateNovel updateformdata={updateformdata}/>
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayNovel = () => {
    if (!loading) {
      return novelArray.map((novel, i) => (
        <tr key={novel._id}>
          <td className="h6">{i + 1}</td>
          <td className="h6">{novel.title}</td>
          <td className="h6">{novel.author}</td>
          <td className="h6">{novel.description}</td>
          <td className="h6">₹{novel.price}</td>

          <td>
            <Button
              variant="contained"
              color="inherit"
              onClick={(e) => navigate('/main/noveldetail/'+novel._id)}
            >
              <i class="fa-solid fa-eye"></i>
            </Button>
            </td>
           
            <td>
            <Button
              variant="contained"
              color="inherit"
              onClick={(e) => {
                setShowupdateform(true) 
                setUpdateformdata(novel)
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </Button>
            </td>


          <td>
            <Button
              variant="contained"
              color="inherit"
              onClick={(e) => deleteNovel(novel._id)}
            >
              <i class="fa-solid fa-trash-can"></i>
            </Button>
            </td>
        </tr>
      ));
    }
  };

  return (
    <div className="managecompo">
    <Header></Header>
    <div className="container table-responsive">
      <Toaster position="top-right" reverseOrder={false} />
      <h1
       style={{
         marginTop:20,
         marginBottom:20
       }}
      >
        MANAGE BOOK DETAILS
      </h1>
      <table className="table borders table-striped ">
      <thead className="table-dark">
          <tr>
            <th scope="col" className="h6">S. No.</th>
            <th scope="col" className="h6">Novel</th>
            <th scope="col" className="h6">Author</th>
            <th scope="col" className="h6">Description</th>
            <th scope="col" className="h6">Price</th>
            <th scope="col" className="h6">Actions</th>
            <th scope="col" className="h6"></th>
            <th scope="col" className="h6"></th>
          </tr>
        </thead>
        <tbody>
          {displayNovel()}
        </tbody>
      </table>
      {displayUpdateNovel()}
    </div>
    </div>
  );
};

export default ManageNovel;