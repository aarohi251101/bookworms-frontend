import { useEffect, useState } from "react";
import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  TextField,
  CardMedia,
} from "@mui/material";
import app_config from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Email } from "@mui/icons-material";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import Header from "./header";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      padding: "0.5rem",
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const url = app_config.api_url;

const appearance = {
  theme: "stripe",
};

const BuyNovel = () => {
  const navigate = useNavigate();

  const url = app_config.api_url;

  const stripe = useStripe();
  const elements = useElements({ appearance });

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [address, setAddress] = useState("");

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [values, setValues] = useState({});

  const [novel, setNovelDetail] = useState(
    JSON.parse(sessionStorage.getItem("novel"))
  );

  const { id } = useParams();

  const checkoutForm = {
    title: novel.title,
    author: novel.author,
    genre: novel.genre,
    shippingAddress: "",
    shippingStatus: "Shipped",
  };

  const checkoutSubmit = () => {
    // console.log(values);

    fetch(url + "/checkout/buy", {
      method: "POST",
      body: JSON.stringify({
        novel: novel._id,
        shippingAddress: address,
        shippingStatus: "Shipped",
        createdAt: new Date(),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Checkout Completed Succesfully",
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/home");
      });
  };

  useEffect(() => {}, []);

  const getIntent = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: novel.price * 100 }),
    };
    return fetch(url + "/create-payment-intent", requestOptions).then(
      (response) => response.json()
    );
  };

  const payMoney = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    getIntent().then((res) => {
      console.log(res);
      let clientSecret = res.client_secret;

      completePayment(clientSecret);
    });
  };

  const completePayment = async (key) => {
    const paymentResult = await stripe.confirmCardPayment(key, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.name,
        },
      },
    });

    setPaymentLoading(false);
    if (paymentResult.error) {
      alert();
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: paymentResult.error.message,
      });
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log(paymentResult);

        // saveOrder();
        checkoutSubmit();
      }
    }
  };

  return (
    <div>
 
          <main className="mt-0 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-5 h2 text-center">Buy Novel</h2>
              <div className="row">
                <div className="col-md-8 mb-4">
                  <div className="card">
                    {/* <form className="card-body" onSubmit={handleSubmit}> */}
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="md-form ">
                            <input
                              disabled
                              type="text"
                              id="title"
                              className="form-control"
                              value={novel.title}
                            />
                            <label for="title" className="">
                              Title
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 mb-2">
                          <div className="md-form">
                            <input
                              disabled
                              type="text"
                              id="author"
                              className="form-control"
                              value={novel.author}
                            />
                            <label for="lastName" className="">
                              Author
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="md-form mb-5 mt-3">
                        <input
                          disabled
                          type="text"
                          id="genre"
                          value={novel.genre}
                          className="form-control"
                          placeholder="youremail@example.com"
                        />

                        <label for="email" className="">
                          Genre
                        </label>
                      </div>

                      <div className="md-form mb-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1234 Main St"
                          values={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label for="address" className="">
                          Address
                        </label>
                      </div>
                    {/* </form> */}
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div>
                    <form onSubmit={payMoney}> 
                    <CardElement className="card" options={CARD_OPTIONS} />

                    <Button
                      disabled={isPaymentLoading}
                      className="mt-5 w-100"
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      {isPaymentLoading
                        ? "Loading..."
                        : `Pay ₹${novel.price}/-`}
                    </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
    </div>
  );
};

export default BuyNovel;