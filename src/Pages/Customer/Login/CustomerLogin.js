import Login from "../../../Components/Login/Login"

export default function CustomerLogin() {
    const initialValues = {
        email: '',
        password: ''
    }
    
    return <Login title="Cutomer Login" initialValues={initialValues} handleSubmit="" signUpLink="" socialLogin={true} />
}
