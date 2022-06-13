import React from "react";
import Header from "./main/header";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  TextField,
  CardMedia,
} from "@mui/material";
import { color, textAlign } from "@mui/system";
import app_config from "../config";

const Home = () => {
  const navigate = useNavigate();
  const url = app_config.api_url;

  const CssButton = styled(Button)(({ theme }) => ({
    "&:hover": {
      color: "#ced3d8",
    },
  }));

  return (
    <div>
      <div className="homes" fixed>
        <Header></Header>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: 25,
            color: "white",
          }}
        >
          <p className="h5">Come and join our reading club</p>
          <h1 style={{ fontSize: 67, fontWeight: 400 }}>Enjoy the silence</h1>
          <h1 style={{ fontSize: 67, fontWeight: 400 }}>in our reading room</h1>
        </Container>
      </div>

      <div class="row g-0 feature">
        <div class="col-lg-4 feature-box">
          <i
            class="fa-solid fa-book-open fa-4x"
            style={{ paddingBottom: 16 }}
          ></i>
          <h4 style={{ paddingBottom: 4 }}>ADD YOUR BOOK</h4>
          <p>
            Add your book which you have already read,earn some money let other
            bookworms enjoy
          </p>
        </div>

        <div class="col-lg-4 feature-box">
          <i
            class="fa-solid fa-right-left fa-4x"
            style={{ paddingBottom: 16 }}
          ></i>
          <h4 style={{ paddingBottom: 4 }}>BUY RENT EXCHANGE</h4>
          <p>
            Buy or rent book at low price or exchange it by directly having a
            chat with the owner
          </p>
        </div>

        <div class="col-lg-4 feature-box">
          <i
            class="fa-solid fa-circle-question fa-4x"
            style={{ paddingBottom: 16 }}
          ></i>
          <h4 style={{ paddingBottom: 4 }}>PEOPLE QUERIES</h4>
          <p>
            Do someone a favour by giving them the book they want to read and
            enjoy by directly having a chat{" "}
          </p>
        </div>
      </div>

      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
        data-interval="600"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <h1>
              “It is our choices, Harry, that show what we truly are, far more
              than our abilities.”
            </h1>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 3,
                paddingLeft: 40,
              }}
            >
              <img
                className="testimonial"
                src={url+"/images/2slide.png"}
                alt="Harry potter"
              />
              <div className="text">
                <h3>Harry Potter and the Chamber of Secrets</h3>
                <h5>-JK Rowling</h5>
              </div>
            </Container>
          </div>

          <div class="carousel-item">
            <h1>
              "Mediocrity knows nothing higher than itself; but talent instantly
              recognizes genius."
            </h1>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 3,
                paddingLeft: 40,
              }}
            >
              <img
                className="testimonial"
                src={url + /images/1slide.png}
                alt="sherlock homes "
              />
              <div className="text">
                <h3>The Adventure Of The Blue Carbuncle</h3>
                <h5>-Arthur Conan Doyle</h5>
              </div>
            </Container>
          </div>

          <div class="carousel-item">
            <h1>
              "You step into the Road, and if you don’t keep your feet, there is
              no knowing where you might be swept off to."
            </h1>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 3,
                paddingLeft: 40,
              }}
            >
              <img
                className="testimonial"
                src={url + /images/3slide.png}
                alt="lord of rings "
              />
              <div className="text">
                <h3>The Lord of the Rings</h3>
                <h5>-J.R.R. Tolkien</h5>
              </div>
            </Container>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="home-browse" fixed>
        <Container
          className="inner"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2 style={{ paddingBottom: 10 }}>
            Browse Through Our Complete Library
          </h2>
          <CssButton
            color="inherit"
            disableRipple
            onClick={(e) => navigate("/main/browseNovel")}
          >
            BROWSE COLLECTIONS ➜
          </CssButton>
        </Container>
      </div>
    </div>
  );
};

export default Home;
