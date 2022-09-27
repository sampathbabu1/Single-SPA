import React from "react";
import { Box, Grid, Typography,Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import axios from 'axios';

// import StarRateIcon from '@mui/icons-material/StarRate';
function App() {
  const product = {
    id: 3,
    name: "Redmi 10 prime",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
    price: 11000,
    rating: 4.2,
    description:
      "Xiaomi 12 Pro 5G feature a screen of up to 6.73 inches, its screen uses WQHD+ AMOLED panels with resolution (1440 x 3200Pixels) to provide vivid visibility, sharp details that are suitable for reading newspapers, entertainment or gaming. It is equipped with Octa-core Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm) processor that lets you enjoy a faster and lag-free performance. Xiaomi 12 Pro 5G comes with various memory variations, up to 256GB and 12GB RAM (Please check specification table).",
  };

  let cart = {};
  const starImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZdmJ9_hr5UUsGC5__u0btapjLcoYROBYCvWVTwqu8LiMX1K-pg6Z8Wg4m8ryEs9s9Z3k&usqp=CAU";

  const addToCart = async () => {
    const id=product.id;
    cart = await axios.get(`http://localhost:8080/cart/${product.id}`);
    console.log(cart);
    const updatedQuantity=cart.data.quantity+1;

    await axios.put(`http://localhost:8080/cart/${product.id}`, {
      id:id,
      quantity: updatedQuantity,
    })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Grid
        container
        alignItems="left"
        sx={{
          alignItems: "left",
          justifyContent: "left",
          pt: 5,
          pl: "8%",
          pr: "10%",
          flexDirection: "row",
        }}
      >
        <Grid>
          <Grid item xs={6} sx={{ maxWidth: "30%" }}>
            <Grid
              sx={{
                borderRadious: 15,
                
              }}
            >
              <Box
                sx={{
                  borderRadious: "8px",
                }}
              >
                <img
                  src={product.imageUrl}
                  height="750px"
                  width="600px"
                  style={{ borderRadius: 12 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            alignItems: "left",
            justifyContent: "left",
            pl: 10,
            flexDirection: "row",
          }}
        >
          <Typography variant="h4" sx={{ pt: 3, pb: 5, color: "#00001a" }}>
            {product.name}
          </Typography>
          <Grid item sx={{ pb: 3, display: "flex", color: "#00004d" }}>
            <Typography variant="h6" sx={{ pt: -6 }}>
              Rating: {product.rating}{" "}
            </Typography>
            <Box
              sx={{
                borderRadious: "8px",
                pt: "4px",
              }}
            >
              <img src={starImgUrl} height="20" />
            </Box>
          </Grid>
          <Grid sx={{ pb: 3 }}>
            <Button
              variant="outlined"
              onClick={addToCart}
                sx={{
                  width: "222px",
                  color: "green",
                  "&:hover": {
                    backgroundColor: "green",
                    color:'white'
                  },
                }}
            >
              ADD TO CART
            </Button>
          </Grid>
          <Typography variant="h6" sx={{ pb: 1, color: "#000033" }}>
            Available offers
          </Typography>
          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWait: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer10% off on Axis Bank Credit Card and Credit Card EMI
              Trxns,up to ₹1500. On orders of ₹5000 and aboveT&C
            </Typography>
          </Grid>
          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer10% off on ICICI Bank Credit Cards (incl. EMI Txns), up
              to ₹1,500. On orders of ₹5,000 and aboveT&C
            </Typography>
          </Grid>

          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWait: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer8% off on Flipkart Axis Bank Credit Card, up to ₹1,500.
              On orders of ₹5,000 and aboveT&C
            </Typography>
          </Grid>

          <Typography variant="h6" sx={{ pb: 1, color: "black" }}>
            Description
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ pb: 4, pl: 1, color: "#595959" }}
          >
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

