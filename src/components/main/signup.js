import {Button,Card,CardContent,Grid,Paper,TextField,Container} from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Header from "./header";

const Signup = () => {
  const url = app_config.api_url;


  const userForm = {
    name:"",
    username: "",
    password: "",
    email: "",
    avatar: "",
    isAdmin:false
  };


  const CssTextField = styled(TextField)({
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
  });


  const navigate = useNavigate();


  const userSubmit = (values) => {
    console.log(values);

    fetch(url + "/user/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registered Successfully",
          });
        }
        navigate("/main/login");
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };



  return (
      <Formik initialValues={userForm} onSubmit={userSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <div className="signup-img" fixed>
            <Header></Header>
            <Container style={{
              marginTop: 70 
            }}>
            <Card sx={{ 
              maxWidth:400,
              m:'auto',
              bgcolor:'#d5cecc'
              }}
             >
                <CardContent>
                  <Box>
                    <h2 style={{
                      display: "flex",
                      justifyContent: "center"
                      }}>SIGN UP</h2>
                  </Box>
                  <p>
                    Have an existing account?{" "}
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={(e) => navigate("/main/login")}
                    >
                      Log In
                    </Button>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <h6 >Name</h6>
                      <CssTextField
                        className="w-100 mb-2"
                        variant="standard"
                        type="name"
                        id="name"
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.name}
                      />
                    </div>
                    
                    <div>
                      <h6>User Name</h6>
                      <CssTextField
                        className="w-100 mb-2"
                        autoComplete="off"
                        variant="standard"
                        type="username"
                        id="username"
                        onChange={handleChange}
                        value={values.username}
                      />
                    </div>
                    
                    <div>
                      <h6>Email Address</h6>
                      <CssTextField
                        className="w-100 mb-2"
                        autoComplete="off"
                        variant="standard"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </div>
                    
                    <div>
                      <h6 >Password</h6>
                      <CssTextField
                        className="w-100 mb-1"
                        variant="standard"
                        autoComplete="off"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </div>
                    <FormGroup sx={{ mt: 1 }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                      <Button
                        type="submit"
                        variant="contained"
                        className="mt-1 mb-1 "
                        color="inherit"
                        size="large"
                      >
                        Register
                      </Button>
                    
                  </form>
                </CardContent>
            </Card>
            </Container>
            </div>
         
        )}
      </Formik>
    
  );
};

export default Signup;