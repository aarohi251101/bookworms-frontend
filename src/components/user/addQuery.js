import React from "react";
import {Button,Container,TextField,Card,CardContent,FormControlLabel,Checkbox,} from "@mui/material";
import { Formik } from "formik";
import app_config from "../../config";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from "../main/header";


const AddQuery = () =>{
    const url = app_config.api_url;
    
    const [currentuser, setCurrentuser] = useState(JSON.parse(sessionStorage.getItem("user")));
      
    const queryinitial={
        title:"",
        description:"",
        user:currentuser._id
    }


    const submitquery = (values) => {

        console.log(values);
        fetch(url + "/query/add", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res.status);
          if (res.status == 200) {
            Swal.fire({
              icon: "success",
              title: "POSTED!",
            });
          }
        });
      };
    
 
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

      const Cssformcontrol = styled(FormControl)({
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

    return(
      
        <Formik initialValues={queryinitial} onSubmit={submitquery}>
          {({ values, handleChange, handleSubmit }) => (
            <div className="querypage" fixed>
            <Header></Header>
            <Container maxWidth="xl"
            sx={{
              m:0,
              pt:7
            }}
            >
            <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6">
            <header className="add-header">
              <h2>WHAT DO YOU THINK ABOUT IT!!</h2>
              <h2>ADD YOUR PERSPECTIVE</h2>
            </header>
            <Card sx={{
              bgcolor:"#d5cecc",
              borderRadius:0
            }}>
            <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <CssTextField
                  className="mb-3 w-100"
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
                  className="mb-3 w-100"
                  label="Description"
                  autoComplete="off"
                  required
                  variant="outlined"
                  multiline
                  rows={6}
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Button className="mt-2" type="submit" variant="contained" color="inherit">
                  POST 
                </Button>
              </div>
            </form>
            </CardContent>
            </Card>
            </div>
            </div>
            </Container>
            </div>
          )}
        </Formik>
        
    )
}
export default AddQuery;