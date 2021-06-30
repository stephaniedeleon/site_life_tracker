import { useState } from "react";
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient";

export const useSignUpForm = ({ setAppState }) => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: ""
    });
  
  
    const handleOnInputChange = (event) => {
  
      if (event.target.name === "password") {
        if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
          setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
      }
      if (event.target.name === "passwordConfirm") {
        if (form.password && form.password !== event.target.value) {
          setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
      }
      if (event.target.name === "email") {
        if (event.target.value.indexOf("@") <= 0) {
          setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
        } else {
          setErrors((e) => ({ ...e, email: null }))
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
  
  
    const handleOnSubmit = async () => {
  
      setIsLoading(true)
      setErrors((e) => ({ ...e, form: null }))
  
      if (form.passwordConfirm !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
        setIsLoading(false)
        return
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
  
      const { data, error } = await apiClient.signupUser({ 
        email: form.email,
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
      });
      if (error) setErrors((e) => ({ ...e, form: error })) 
      if (data?.user) {
        setAppState(data);
        apiClient.setToken(data.token);
        navigate("/activity"); // after logging in, navigates to activity
      }
  
      setIsLoading(false)
    }

    return {
        form,
        errors,
        isLoading,
        handleOnInputChange,
        handleOnSubmit
    }

}