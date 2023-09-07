import ForgotPassword from "../../../Components/ForgotPassword/ForgotPassword"
import { useUserContext } from "../../../Context/User/UserContext"
export default function VendorForgotPassword() {
    const {handleForgotPassword} = useUserContext()
    const initialValues = {
        email: ''
    }
  return <ForgotPassword title="Forgot Password!" initialValues={initialValues} handleSubmit={handleForgotPassword} />
}
