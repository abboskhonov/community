import LoginForm from "../components/Auth/LoginForm"
import { useNavigate } from "@solidjs/router"
import { isAuthenticated } from "../utils/authHelpers"


const LoginPage = () => {
    const navigate = useNavigate()

    if (isAuthenticated()) {
        navigate('/')
    }
  return (
    <>
    <LoginForm />
    
    </>
  )
}

export default LoginPage
