import { useNavigate } from "@solidjs/router";
import RegisterForm from "../components/Auth/RegisterForm";
import { isAuthenticated } from "../utils/authHelpers";

const RegisterPage = () => {
  const navigate = useNavigate();
  if (isAuthenticated()) {
    navigate('/')
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
