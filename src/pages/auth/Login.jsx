import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schema/yupSchema/loginSchemaYup";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import useLoginWithEmailPass from "../../hooks/useLoginWithemailPass";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/features/authSlice";

const Login = () => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [loginWithEmailPass, resToken] = useLoginWithEmailPass();
  const { user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    loginWithEmailPass(data.email, data.password);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (resToken) {
      localStorage.setItem("token", resToken?.token);
      dispatch(setToken(resToken?.token));
    }
    if (user && token) {
      navigate("/");
    }
  }, [resToken, user]);

  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="85vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        bgcolor={blueGrey[50]}
        padding={4}
        sx={{ borderRadius: ".5rem", position: "relative" }}
        width={{ xs: "70%", md: "20%" }}
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
            LOGIN
          </Typography>
        </Box>
        <Stack gap={2}>
          <Controller
            control={control}
            name="email"
            render={({ fieldState: { error }, field: { onChange, value } }) => (
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                fullWidth
                onChange={onChange}
                value={value}
                error={error}
                helperText={error && error.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                id="password"
                label="password"
                variant="outlined"
                type="password"
                name="password"
                fullWidth
                onChange={onChange}
                value={value}
                error={error}
                helperText={error && error.message}
              />
            )}
          />
          <Box textAlign="center">
            <ButtonGroup>
              <Link to="/register">
                <Button
                  startIcon={<ArrowBack />}
                  color="primary"
                  size="large"
                  variant="outlined"
                >
                  Register
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
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
