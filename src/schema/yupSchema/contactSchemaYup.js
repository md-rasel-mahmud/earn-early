import * as yup from "yup";

export const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is Required"),
  phone: yup.string().max(14).min(11).required("Phone is Required"),
  location: yup.string().required("Location is Required"),
  description: yup.string().required("Description is Required"),
});
