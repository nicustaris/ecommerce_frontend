import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./SignupPage.css";
import profile from "../../assets/profile.svg";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3, {
      message: `Name must contain at least 3 character(s)
  `,
    }),
    email: z.string().email().min(3),
    password: z.string().min(5, {
      message: `Password must contain at least 5 character(s)
  `,
    }),
    confirmPassword: z.string(),
    deliveryAddress: z.string().min(15, {
      message: `Delivery address must contain at least 15 character(s)
  `,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match the password",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await signup(formData, profilePicture);
      window.location = "/";
    } catch (error) {
      if (error && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Sign Up Form</h2>
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={
                profilePicture ? URL.createObjectURL(profilePicture) : profile
              }
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            id="file-ip-1"
            className="image_input"
          />
        </div>

        {/* Form Inputs */}
        {formError && <em className="form_error">* {formError}</em>}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="error_message">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="error_message">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="error_message">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="error_message">
                {errors.confirmPassword.message}
              </em>
            )}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <em className="error_message">
                {errors.deliveryAddress.message}
              </em>
            )}
          </div>
        </div>
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
