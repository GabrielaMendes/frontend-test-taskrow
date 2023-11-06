import Container from "@mui/material/Container";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box
          component="main"
          marginY={14}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default AppLayout;
