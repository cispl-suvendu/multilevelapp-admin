import { useUserContext } from "../../../Context/User/UserContext"
import Login from "../../../Components/Login/Login"


export default function AdminLogin() {

    const {handleSignIn} = useUserContext()

    const initialValues = {
        email: '',
        password: ''
    }
    
    return <Login title="Admin Login" initialValues={initialValues} handleSubmit={handleSignIn} signUpLink="" socialLogin="" forgotPasswordLink="/forgot-password/admin" />
}
