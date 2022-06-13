import {Accordion,AccordionDetails,
    AccordionSummary,
    Button,
    Paper,
    Grid,
    Card,
    Drawer,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import app_config from "../../config";
  import toast, { Toaster } from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  import UpdateUser from "./updateUser";
  
  const ManageUser = () => {
    const [productArray, setProductArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    // const timeago = new TimeAgo("en-US");
  
    const [updateFormData, setUpdateFormData] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
  
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    // URL link
    const url = app_config.api_url;
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
  
      setDrawerOpen({ ...drawerOpen, [anchor]: open });
    };
  
    const fetchData = () => {
      fetch(url + "/user/getall", {
        method: "GET",
        // data hmko send ni krna hai isliye get method use karte hai
      })
        .then((res) => res.json())
        // res se json nikalne k liye
        .then((data) => {
          // dusra then jo hai json data read krne k liye
          console.log(data);
          setProductArray(data);
          setLoading(false);
          // data print krwa rhe hai
        });
    };
  
    const deleteUser = (id) => {
      fetch(url + "/user/delete/" + id, { method: "DELETE" })
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
          fetchData();
          toast.success("product deleted successfully...", {
            icon: "😁",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    };
  
    const updateUser = (formdata) => {
      setUpdateFormData(formdata);
      setShowUpdateForm(true);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const displayProducts = () => {
      if (!loading) {
        return productArray.map((user) => (
          <div className="container mt-2">
            <Accordion>
              <AccordionSummary>
                <p>
                  <span className="h3">
                    {user.firstName} {user.lastName}
                  </span>
                  &nbsp;&nbsp;
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <ul class="list-group">
                      <li class="list-group-item">Email:{user.email}</li>
                      <li class="list-group-item">Username::{user.username}</li>
                    </ul>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={(e) => updateUser(user)}
                      className="w-100"
                    >
                      update
                    </Button>
  
                    <Button
                      variant="outlined"
                      color="error"
                      className="w-100 mt-5"
                      onClick={(e) => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        ));
      }
    };
    return (
      <div className="container-fluid full-page">
        <p className="display-4">Manage Users</p>
        <hr className="mb-4" />
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">{displayProducts()}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                {showUpdateForm ? (
                  <UpdateUser
                    userdetail={updateFormData}
                    fetchUsers={fetchData}
                    setShowForm={setShowUpdateForm}
                  />
                ) : (
                  <p className="fw-bold h2 py-5 text-center ph-text">
                    Select User to Edit
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManageUser;