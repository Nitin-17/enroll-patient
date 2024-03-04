import * as yup from "yup";

const passwordRules =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:;<>,.?~\\-]).{12,}$/;
const emailRules = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "Must be at least 3 characters long")
    .max(40, "Must not exceed 40 characters long"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Must be at least 3 characters long")
    .max(40, "Must not exceed 40 characters long"),
  email: yup
    .string()
    .matches(emailRules, { message: "Please enter a correct email" })
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(12)
    .matches(passwordRules, {
      message: `Must include at least one ('A-Z','a-z','0-9') and special character`,
    })
    .required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm Password is Required"),
  timeZone: yup.string().required("Timezone is required"),
});

export default signupSchema;
