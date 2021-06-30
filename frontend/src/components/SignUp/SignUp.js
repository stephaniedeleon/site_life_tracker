import { Link } from "react-router-dom"
import { useSignUpForm } from "../../hooks/useSignUpForm";
import "./SignUp.css";

export default function SignUp({ setAppState }) {

  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } = useSignUpForm({ setAppState });

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