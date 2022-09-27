import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import { pink } from "@mui/material/colors";
import { Observable } from "windowed-observable";
import { navigateToUrl } from "single-spa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Container = () => {
  const observable = new Observable("cart");
  observable.publish("abcd");

  const [location, setLocation] = useState(window.location.pathname);

  return (
    <Box
      data-testid="nav"
      sx={{
        backgroundColor: "slateblue",
        margin: 0,
        height: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingX: "5%",
      }}
    >
      <Typography sx={{ color: "white" }}>Logo</Typography>

      <a href="/" onClick={navigateToUrl} style={{ textDecoration: "none" }}>
        <Box
          onClick={() => setLocation("/")}
          sx={{
            borderBottom: location == "/" && "1px solid white",
            marginLeft: "20px",
          }}
        >
          <Typography sx={{ color: "white" }}>Home</Typography>
        </Box>
      </a>

      <Box sx={{ marginLeft: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Badge badgeContent={4} color="primary">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
          <Avatar sx={{ bgcolor: pink[500], marginLeft: "30px" }}>A</Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
