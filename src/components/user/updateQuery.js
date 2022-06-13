import React from "react";
import {Button,TextField,Card,CardContent} from "@mui/material";
import { Formik } from "formik";
import app_config from "../../config";
import Swal from "sweetalert2";
import { styled } from '@mui/material/styles';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const UpdateQuery = ({updateformdata}) => {
  const url = app_config.api_url;
  

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    }
  })

  const submitnovel = (values) => {
    console.log(values);
    fetch(url + "/query/update/" + updateformdata._id, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.status);
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "QUERY UPDATED!",
        });
      }
    });
  };

  return (
    <Formik initialValues={updateformdata} onSubmit={submitnovel}>
          {({ values, handleChange, handleSubmit }) => (
            <div class="row">
            <div class="col-lg-6">
            <header className="update-header">
              <h2>UPDATE YOUR QUERY DETAILS</h2>
            </header>
            <Card sx={{
              bgcolor:"#d5cecc",
              borderRadius:0
            }}>
            <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <CssTextField
                  className="mt-1 w-100"
                  label="Title"
                  autoComplete="off"
                  required
                  variant="outlined"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                />
                </div>
               

              <div>
                <CssTextField
                  className="mt-3 w-100"
                  label="Description"
                  multiline
                  rows={4}
                  autoComplete="off"
                  variant="outlined"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Button className="mt-3" type="submit" variant="contained" color="inherit">
                  UPDATE DETAILS
                </Button>
              </div>
            </form>
            </CardContent>
            </Card>
            </div>
            <div class="col-lg-6">
            </div>
            </div>
           
          )}
        </Formik>
  );
};

export default UpdateQuery;
