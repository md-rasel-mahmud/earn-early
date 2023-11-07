import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schema/yupSchema/registerSchemaYup";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { ArrowBack, UploadFile } from "@mui/icons-material";
import useRegisterWithEmailPass from "../../hooks/useRegisterWithEmailPass";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/authSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Register = () => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [registerWithEmailPass, resUser] = useRegisterWithEmailPass();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    delete data.confirmPassword;
    const { fullName, email, password, image } = data;
    registerWithEmailPass(email, password, fullName, image, data);
    console.log(data);
  };

  useEffect(() => {
    console.log(resUser);
    if (resUser?.acknowledged) {
      dispatch(setToken(resUser?.token));
    }
  }, [resUser]);
  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      marginTop={{ xs: "70px", md: "50px" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        bgcolor={blueGrey[50]}
        padding={4}
        sx={{ borderRadius: ".5rem", position: "relative" }}
        width={{ xs: "70%", md: "35%" }}
        paddingTop={10}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-70px",
            left: "50%",
            fontSize: "70px",
            zIndex: "2",
            lineHeight: "0",
            textAlign: "center",
            transform: "translateX(-50%)",
          }}
        >
          <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
          <Typography
            component="h2"
            bgcolor="primary.main"
            color="white"
            paddingX={3}
            paddingY={1}
            borderRadius={2}
            marginTop={-1}
          >
            REGISTER
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Controller
              name="fullName"
              control={control}
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <TextField
                  error={!!error}
                  helperText={error && error.message}
                  id="name"
                  label="Name"
                  variant="outlined"
                  name="fullName"
                  fullWidth
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="email"
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="phone"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  name="phone"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+88</InputAdornment>
                    ),
                  }}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="occupation"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="occupation"
                  label="Occupation"
                  variant="outlined"
                  name="occupation"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>

          {/* Address  */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="address"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error}
                  helperText={error && error.message}
                  id="Address"
                  label="Address"
                  variant="outlined"
                  name="fullName"
                  fullWidth
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="image"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFile />}
                  onChange={onChange}
                  fullWidth
                  color="inherit"
                  sx={{ height: "100%" }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    value={value}
                    onChange={onChange}
                    accept="image/*"
                    multiple={false}
                    hidden={true}
                    id="image"
                    label="image"
                    variant="outlined"
                    error={!!error}
                    helperText={error && error.message}
                    sx={{ mt: 1 }}
                  />
                </Button>
              )}
            />
          </Grid>

          {/* Gender  */}
          <Grid item xs={12} md={6}>
            <Controller
              name="gender"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormControl error={!!error}>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    onChange={onChange}
                    value={value || ""}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    ></FormControlLabel>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    ></FormControlLabel>
                  </RadioGroup>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Age  */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="age"
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                  name="age"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>

          {/* password  */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="password"
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  name="confirmPassword"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <ButtonGroup>
              <Link to="/login">
                <Button
                  startIcon={<ArrowBack />}
                  color="primary"
                  size="large"
                  variant="outlined"
                >
                  Login
                </Button>
              </Link>
              <Button
                color="primary"
                size="large"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Register;
