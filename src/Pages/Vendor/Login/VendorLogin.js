import Login from "../../../Components/Login/Login"
import { useUserContext } from "../../../Context/User/UserContext"

export default function VendorLogin() {
    const {handleSignIn} = useUserContext()
    const initialValues = {
        email: '',
        password: ''
    }
    
    return <Login title="Vendor Login" initialValues={initialValues} handleSubmit={handleSignIn} signUpLink="/register/vendor" socialLogin="" forgotPasswordLink="/forgot-password/vendor" />
}
