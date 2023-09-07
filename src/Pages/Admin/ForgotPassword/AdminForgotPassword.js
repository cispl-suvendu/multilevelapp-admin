import ForgotPassword from "../../../Components/ForgotPassword/ForgotPassword"
import { useUserContext } from "../../../Context/User/UserContext"

export default function AdminForgotPassword() {
    const {handleForgotPassword} = useUserContext()
    const initialValues = {
        email: ''
    }
  return <ForgotPassword title="Forgot Password!" initialValues={initialValues} handleSubmit={handleForgotPassword} />
}
