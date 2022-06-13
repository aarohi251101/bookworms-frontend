import {Button,Card,CardContent,Grid,Paper,TextField,Container} from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "./header";


const Login = () => {
  const url = app_config.api_url;

  const navigate = useNavigate();

  const loginForm = {
    email:"",
    password: "",
  };

  const CssTextField = styled(TextField)({
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
  })

  const loginSubmit = (values) => {
  
    fetch(url + "/user/verify", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        res.json()
        .then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));

          const item_value = sessionStorage.getItem("user");
          
          console.log(item_value);

          if (data.isAdmin) {
            sessionStorage.setItem("admin", JSON.stringify(data));
            navigate("/admin");
            return;
          }
          navigate("/user/addNovel");
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Loggedin Successfully",

        });
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Loggedin Failed",
        });
      }
      //console.log(res.formData);
    });
  };

  return (

      <Formik initialValues={loginForm} onSubmit={loginSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <div className="signup-img" fixed>
            <Header></Header>
            <Container style={{
              marginTop: 130
            }}>
            <Card sx={{ 
              maxWidth: 400,
              m:'auto',
              bgcolor:'#d5cecc'
              }} 
              >
                <CardContent>
                  <Box>
                    <h2 style={{
                      display: "flex",
                      justifyContent: "center"
                      }}>LOGIN</h2>
                  </Box>
                  <p>
                    Don't have an account?{" "}
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={(e) => navigate("/main/signup")}
                    >
                      Sign up
                    </Button>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <h6>Email Address</h6>
                      <CssTextField
                        className="w-100 mb-2"
                        variant="standard"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </div>
                    
                    <div>
                      <h6>Password</h6>
                      <CssTextField
                        className="w-100 "
                        variant="standard"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </div>
   
                    <div style={{float:"right", marginBottom:10}}>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={(e) => navigate("/main/resetPassword")}
                    >
                      Forgot Password?
                    </Button>
                    </div >
  
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        className="mt-2 mb-2 "
                        color="inherit"
                        size="large"
                      >
                        Login
                      </Button>
                      </div>
                  </form>
                </CardContent>
                </Card>
                </Container>
         </div>
          
        )}
      </Formik>
   
  );
};

export default Login;