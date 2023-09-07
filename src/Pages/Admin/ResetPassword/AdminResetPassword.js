import ResetPassword from "../../../Components/ResetPassword/ResetPassword"
import { useUserContext } from "../../../Context/User/UserContext"

export default function AdminResetPassword() {
    const {handleResetPassword} = useUserContext()
    const initialValues = {
        password: ''
    }
  return <ResetPassword title="Reset Password!" initialValues={initialValues} handleSubmit={handleResetPassword} />
}
