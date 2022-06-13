import {
    Button,
    Card,
    CardContent,
    Checkbox,
    Grid,
    Paper,
    TextField,
  } from "@mui/material";
  import { Formik } from "formik";
  import React, { useState } from "react";
  import Swal from "sweetalert2";
  import app_config from "../../config";
  
  const UpdateUser = ({ userdetail, fetchUsers, setShowForm }) => {
    const url = app_config.api_url;
    const [thumbnail, setThumbnail] = useState("");
  
    const submitEquipment = (values) => {
      values.thumbnail = thumbnail;
      fetch(url + "/user/update/" + userdetail._id, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Added",
          });
          fetchUsers();
        }
      });
    };
  
    const uploadThumbnail = (e) => {
      console.log("File selected");
      let file = e.target.files[0];
      console.log(file.name);
      setThumbnail(file.name);
      let form = new FormData();
      form.append("myfile", file);
      fetch(url + "/util/uploadfile", { method: "POST", body: form }).then(
        (res) => console.log(res.status)
      );
    };
  
    return (
      <div>
        <Paper>
          <Card>
            <CardContent>
              <Formik initialValues={userdetail} onSubmit={submitEquipment}>
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      className="w-100 mt-2"
                      autoComplete="off"
                      placeholder="Type"
                      variant="filled"
                      label="First Name"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <TextField
                      className="w-100 mt-2"
                      autoComplete="off"
                      placeholder="Review"
                      variant="filled"
                      label="Username"
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                    />
  
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className="button w-50 mt-4"
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={(e) => setShowForm(false)}
                      className="button w-50 mt-4"
                    >
                      Cancel
                    </Button>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  };
  
  export default UpdateUser;