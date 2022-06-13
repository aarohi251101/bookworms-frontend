import React from "react";
import {Card,Button,Box,Container,TextField,FormControlLabel,Checkbox, CardContent, Typography,} from "@mui/material";
import { Formik } from "formik";
import app_config from "../../config";
import { useState } from "react";
import Swal from "sweetalert2";
import { styled } from '@mui/material/styles';
import Header from "../main/header";


const AddNovel = () => {
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


  const [thumbnail, setThumbnail] = useState("");
  const [currentuser, setCurrentuser] = useState(JSON.parse(sessionStorage.getItem("user")))

  const novelinitial = {
    title: "",
    rentable: false,
    exchangeble: false,
    description: "",
    genre: "",
    author: "",
    price: "",
    rentprice: "",
    user:currentuser._id,
  };

  const submitnovel = (values) => {
    values.thumbnail = thumbnail;
    console.log(values);
    fetch(url + "/novel/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.status);
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "NOVEL ADDED!",
        });
      }
    });
  };

  const uploadThumbnail = (e) => {
    console.log("file selected");

    let file = e.target.files[0];
    console.log(file.name);
    setThumbnail(file.name);
    let form = new FormData();
    form.append("myfile", file);

    fetch(url + "/util/uploadfile", { method: "POST", body: form }).then(
      (res) => {
        console.log(res.status);
      }
    );
  };

  
  return (   
        <Formik initialValues={novelinitial} onSubmit={submitnovel}>
          {({ values, handleChange, handleSubmit }) => (
            <div className="add-img" fixed>
            <Header></Header>
            <Container maxWidth="xl"
            sx={{
              m:0,
              pt:1
            }}
            >
            <div class="row">
            <div class="col-md-6">
            <header className="add-header">
              <h2>SELL IT,RENT IT,EXCHANGE IT!!</h2>
              <h2>ADD YOUR BOOK</h2>
            </header>
            <Card sx={{
              bgcolor:"#d5cecc",
              borderRadius:0
            }}>
            <CardContent>
            <form onSubmit={handleSubmit}>
              <div class="row gx-3">
              <div class="col-md-6">
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
                <div class="col-md-6">
                <CssTextField
                  className="mt-1 w-100"
                  label="Author"
                  autoComplete="off"
                  required
                  variant="outlined"
                  id="author"
                  value={values.author}
                  onChange={handleChange}
                />
                </div>
              </div>

              <div>
                <CssTextField
                  className="mt-3 w-100"
                  label="Description"
                  multiline
                  rows={3}
                  autoComplete="off"
                  variant="outlined"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <CssTextField
                  className="mt-3 w-100"
                  label="Genre"
                  autoComplete="off"
                  variant="outlined"
                  id="genre"
                  value={values.genre}
                  onChange={handleChange}
                />
              </div>

              <div>
              <div class="row gx-3">
              <div class="col-md-6">
                <CssTextField
                  className="mt-3 w-100"
                  label="Price"
                  autoComplete="off"
                  required
                  variant="outlined"
                  id="price"
                  value={values.price}
                  onChange={handleChange}
                />
                </div>
              <div class="col-md-6">
                <CssTextField
                  className="mt-3 w-100"
                  label="Rent Price"
                  autoComplete="off"
                  variant="outlined"
                  id="rentprice"
                  value={values.rentprice}
                  onChange={handleChange}
                />
                </div>
              </div>
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.rentable}
                      onChange={handleChange}
                      id="rentable"
                    />
                  }
                  className="mt-1"
                  label="Rentable"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.exchangeble}
                      onChange={handleChange}
                      id="exchangeble"
                    />
                  }
                  className="mt-1"
                  label="Exchangeble"
                />
              </div>

              <label>Upload Image</label>
              <div>
                <input type="file" onChange={uploadThumbnail} required/>
              </div>

              <div>
                <Button className="mt-3" type="submit" variant="contained" color="inherit">
                  ADD NOVEL
                </Button>
              </div>
            </form>
            </CardContent>
            </Card>
            </div>
            <div class="col-md-6">
            </div>
            </div>
            </Container>
            </div>
          )}
        </Formik>
     
    
  );
};

export default AddNovel;
