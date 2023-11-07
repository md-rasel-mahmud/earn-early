import { Box, Button, Container, Stack, Typography } from "@mui/material";
import hospitalImg from "../../assets/banner-img.png";

const Banner = () => {
  return (
    <Container>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
      >
        <Box>
          <Typography variant="h2" color="primary">
            Earn early and gain your life at the top
          </Typography>
          <Typography variant="h5" color="GrayText">
            This is a Hospital Management System where you can manage your
            patients and doctors.
          </Typography>
          <Button variant="contained" sx={{ margin: "1rem 0" }}>
            Continue
          </Button>
        </Box>
        <Box
          component="img"
          src={hospitalImg}
          alt="Banner Image"
          sx={{ width: { xs: "100%", lg: "40%" }, margin: "0" }}
        />
      </Stack>
    </Container>
  );
};

export default Banner;
