import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar
      sx={{
        background:
          " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 88%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        <Box display="flext" marginLeft="auto">
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="white"
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="white"
          >
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
