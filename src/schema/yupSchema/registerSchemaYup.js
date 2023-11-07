import * as yup from "yup";

export const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is Required"),
  phone: yup.string().min(11).max(14).required("Phone number is Required"),
  occupation: yup.string().required("Occupation is Required"),
  address: yup.string().required("Address is Required"),
  gender: yup.string().required("Gender Address is Required"),
  age: yup.number().required("Age Address is Required"),
});
