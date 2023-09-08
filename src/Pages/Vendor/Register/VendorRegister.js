import Register from "../../../Components/Register/Register"
import { useUserContext } from "../../../Context/User/UserContext"

export default function VendorRegister() {
    const {handleSignUp} = useUserContext()
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation:''
    }
    
    return <Register title="Vendor Register" initialValues={initialValues} handleSubmit={handleSignUp} signInLink="/login/vendor" socialLogin="" forgotPasswordLink="/forgot-password/vendor"/>
}
