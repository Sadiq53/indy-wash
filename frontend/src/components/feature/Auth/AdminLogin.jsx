import { useFormik } from "formik"
import { loginValidation } from '../../../schemas/loginValidationSchema'
import { login } from "../../../services/AdminService"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const AdminLogin = () => {

  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState({state: false, message: ''})

  const loginForm = useFormik({
    validationSchema: loginValidation,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async(formData) => {
      const response = await login(formData)
      if(response.success) {
        localStorage.setItem('ddlj', response.token)
        navigate('/')
      } else {
        if(response.type === 'email') {
          setErrMsg({state: true, message: 'Email is Invalid!'})
          setTimeout(()=>{
            setErrMsg({state: false, message: ''})
          }, 2000)
        } else if(response.type === 'password') {
          setErrMsg({state: true, message: 'Password is Incorrect!'})
          setTimeout(()=>{
            setErrMsg({state: false, message: ''})
          }, 2000)
        } 
      }
    }
  })

  return (
    <>
          <div className="box-cs height-100vh p-0">
        <div className="container-fluid p-0">
            <div className="row m-0">
              <div className="col-md-4 p-0">
                <form onSubmit={loginForm.handleSubmit}>
                  <div className="login-layout">
                    <div className="flex-cs justify-center w-100">
                        <img src="assets/img/logo.svg" alt="" />
                    </div>
                    <div className="pt-5 box-cs w-90 bg-theme-7">
                      {errMsg?.state && (<small className="text-danger">{errMsg?.message}</small>)}
                      {(loginForm?.errors.password && loginForm.touched.password) ? (<small className="text-danger">{loginForm?.errors.password}</small>) : (loginForm?.errors.email && loginForm.touched.email) && (<small className="text-danger">{loginForm?.errors.email}</small>)}
                      <div className="input-section gtc-1">
                        <input type="email" required placeholder="Enter Email Address" name="email" id="" onChange={loginForm.handleChange} />
                        <input type="text" placeholder="Enter Password" name="password" id="" onChange={loginForm.handleChange} />
                      </div>
                      <div className="pt-3 flex-cs ">
                        <button type="submit" className="filter-btn w-15 bg-theme-1">Login</button>
                      </div>
                    </div>
                  </div>
                </form>
                </div>
                <div className="col-md-8 p-0">
                  <div className="w-100" style={{objectFit: 'cover'}}>
                    <img className="login-img" style={{objectFit: 'cover'}} src="assets/img/login.jpg" alt="" />
                  </div>
                </div>
            </div>
          </div>
        </div>
<ToastContainer />
    </>
  )
}

export default AdminLogin