import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient";
import "./Login.css";

export default function Login({ setAppState }) {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleOnInputChange = (event) => {

    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
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
      // setUser(data.user);
      setAppState(data);
      apiClient.setToken(data.token);
      navigate("/activity"); // after logging in, navigates to activity
  }

    setIsLoading(false);

    // try {
    //   const res = await axios.post(`http://localhost:3001/auth/login`, form)
    //   if (res?.data?.user) {
    //     setUser(res.data.user); //double check...
    //     setAppState(res.data) //???????
    //     setIsLoading(false)
    //     navigate("/activity") // after logging in, navigates to home
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Invalid email/password combination" }))
    //     setIsLoading(false)
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    //   setIsLoading(false)
    // }
  }


  return (
    <div className="Login">
        <div className="card">

            <h2>Login</h2>
            {/* shows error at the top of the form */}
            {Boolean(errors.form) && <span className="error">{errors.form}</span>}
            <br/>

            <div className="form">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                {/* shows error after input field */}
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <button className="login-btn" disabled={isLoading} onClick={handleOnSubmit}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>

            <div className="footer">
              <p>Don"t have an account? Sign up <Link to="/register">here.</Link></p>
            </div>

        </div>
    </div>
  )
}

