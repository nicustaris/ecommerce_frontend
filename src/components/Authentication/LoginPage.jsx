import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getUser, login } from "../../services/userServices.js";

import "./LoginPage.css";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z.string().min(5),
});

const LoginPage = () => {
  const { state } = useLocation();

  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      window.location = state ? state.from : "/";
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
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="password">Email</label>
            <input
              type="text"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <div className="form_error">{formError}</div>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
