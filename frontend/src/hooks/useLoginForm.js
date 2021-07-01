import { useState } from "react";
import { useNavigate } from "react-router-dom";

import React, { useContext } from "react";
import AuthContext from "contexts/auth";

import apiClient from "services/apiClient";

export const useLoginForm = () => {

    const { setAppState, setUser, setAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
      email: "",
      password: ""
    });    
  
    const handleOnInputChange = (event) => {
  
      if (event.target.name === "email") {
        if (event.target.value.indexOf("@") <= 0) {
          setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
        } else {
          setErrors((e) => ({ ...e, email: null }))
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
  
    
    const handleOnSubmit = async (event) => {
  
      event.preventDefault()
      setIsLoading(true)
      setErrors((e) => ({ ...e, form: null }))
  
      const { data, error } = await apiClient.loginUser({ 
        email: form.email, 
        password: form.password
      })
      if (error) setErrors((e) => ({ ...e, form: error })) 
      if (data?.user) {
        setAppState(data);
        setUser(data.user);
        setAuthenticated(true);
        apiClient.setToken(data.token);
        navigate("/activity"); // after logging in, navigates to activity
    }
  
      setIsLoading(false);
    }

    
    return {
        form,
        errors,
        isLoading,
        handleOnInputChange,
        handleOnSubmit
    }
}