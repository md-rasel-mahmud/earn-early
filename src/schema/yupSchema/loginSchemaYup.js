import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is Required"),
  password: yup.string().min(6).required("Password Is required"),
});
