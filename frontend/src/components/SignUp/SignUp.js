import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient";
import "./SignUp.css";

export default function SignUp({ setAppState }) {

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
      if (event.target.value.indexOf("@") < 0) {
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
      // setUser(data.user);
      setAppState(data);
      apiClient.setToken(data.token);
      navigate("/activity"); // after logging in, navigates to activity
    }

    setIsLoading(false)

    // try {
    //   const res = await axios.post("http://localhost:3001/auth/register", {
    //     email: form.email,
    //     username: form.username,
    //     firstName: form.firstName,
    //     lastName: form.lastName,
    //     password: form.password,
    //   })

    //   if (res?.data?.user) {
    //     setUser(res.data.user);
    //     setAppState(res.data) //????????????
    //     setIsLoading(false)
    //     navigate("/activity")
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
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
    <div className="SignUp">
        <div className="card">

            <h2>Sign Up</h2>
            {/* shows error at the top of the form */}
            {errors.form && <span className="error">{errors.form}</span>}
            <br/>

            <div className='form'>

              <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' placeholder='Enter a valid email' value={form.email} onChange={handleOnInputChange} />
                {/* shows error after input field */}
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className='input-field'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' placeholder='your_username'value={form.username} onChange={handleOnInputChange} />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>

              <div className="split-input-field">
                <div className="input-field">
                  <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleOnInputChange} />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="input-field">
                  <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleOnInputChange} />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
              </div>

              <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Enter a secure password' value={form.password} onChange={handleOnInputChange}/>
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="input-field">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" name="passwordConfirm" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange} />
                {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
              </div>

              <button className='login-btn' disabled={isLoading} onClick={handleOnSubmit}>
                {isLoading ? "Loading..." : "Create Account"}
              </button>

            </div>

            <div className="footer">
              <p>Already have an account? Login <Link to="/login">here.</Link></p>
            </div>
        </div>
    </div>
  )
}