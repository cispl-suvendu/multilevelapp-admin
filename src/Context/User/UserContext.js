import { createContext, useContext, useState } from "react"
import AdminLogin from "../../Pages/Admin/Login/AdminLogin"
import { toast } from 'react-toastify'
import VendorLogin from "../../Pages/Vendor/Login/VendorLogin"
import CustomerLogin from "../../Pages/Customer/Login/CustomerLogin"
import jwt_decode from "jwt-decode"


export const UserContext = createContext()

// const API_END_POINT = "https://multilevelapp-api.vercel.app/api/v1"
const API_END_POINT = "http://localhost:5000/api/v1"


export const UserContextProvider = ({ children }) => {

    const USER_TYPE = {
        ADMIN: "ADMIN",
        VENDOR: "VENDOR",
        CUSTOMER: "CUSTOMER",
        GLOBAL: "GLOBAL"
    }

    const TEMP_CURRENT_USER = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : null;

    const CURRENT_USER = JSON.parse(TEMP_CURRENT_USER)

    const CURRENT_USER_TOKEN = CURRENT_USER?.token

    const DECODED_CURRENT_USER_TOKEN = CURRENT_USER_TOKEN ? jwt_decode(CURRENT_USER_TOKEN) : null

    const CURRENT_USER_TYPE = CURRENT_USER?.role || USER_TYPE.GLOBAL


    function GlobalElement({ children }) {
        return <>{children}</>
    }

    function AdminElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN && DECODED_CURRENT_USER_TOKEN._id === CURRENT_USER._id) {
            return <>{children}</>
        } else {
            return <AdminLogin />
        }
    }

    function VendorElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN && DECODED_CURRENT_USER_TOKEN._id === CURRENT_USER._id) {
            return <>{children}</>
        } else if (CURRENT_USER_TYPE === USER_TYPE.VENDOR && DECODED_CURRENT_USER_TOKEN._id === CURRENT_USER._id) {
            return <>{children}</>
        } else {
            return <VendorLogin />
        }
    }

    function CustomerElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN && DECODED_CURRENT_USER_TOKEN._id === CURRENT_USER._id) {
            return <>{children}</>
        } else if (CURRENT_USER_TYPE === USER_TYPE.CUSTOMER && DECODED_CURRENT_USER_TOKEN._id === CURRENT_USER._id) {
            return <>{children}</>
        } else {
            return <CustomerLogin />
        }
    }

    function signOut() {
        sessionStorage.removeItem("userInfo");
        window.location.href = "/"
    }

    const [isLoading, setIsLoading] = useState(false)

    // Signin

    const handleSignIn = async ({ email, password, CURRENT_PAGE_TYPE }) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_END_POINT}/signin/${CURRENT_PAGE_TYPE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email,
                        password
                    }
                )
            })
            const res_data = await res.json()
            if (res_data.error) {
                toast.warn(res_data.error);
                setIsLoading(false)
                return
            }
            toast.success(`Welcome back ${res_data.firstName}`);
            setIsLoading(false)
            sessionStorage.setItem("userInfo", JSON.stringify(res_data));
            try {
                await postActivityLog({ ...res_data, CURRENT_PAGE_TYPE, message: "Successfully signin" })
            } catch (error) {
                toast.error(error.message);
            }

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    // Forgot password

    const handleForgotPassword = async ({ email, CURRENT_PAGE_TYPE }) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_END_POINT}/forgot-password/${CURRENT_PAGE_TYPE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email
                    }
                )
            })
            const res_data = await res.json()
            if (res_data.error) {
                toast.warn(res_data.error)
                setIsLoading(false)
                return
            }
            toast.success(`We have sent you an email with reset password link, please check your mailbox. Thanks`);
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    // Reset Password

    const handleResetPassword = async ({ token, id, password, CURRENT_PAGE_TYPE }) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_END_POINT}/reset-password/${CURRENT_PAGE_TYPE}/${id}/${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        password
                    }
                )
            })
            const res_data = await res.json()
            if (res_data.error) {
                toast.warn(res_data.error)
                setIsLoading(false)
                return
            }
            toast.success(`Password Updated successfully!`, {
                onClose: () => window.location.href = `/${CURRENT_PAGE_TYPE}`
            });
            setIsLoading(false)
            try {
                await postActivityLog({ _id:id, token, CURRENT_PAGE_TYPE, message: "Password Updated successfully!" })
            } catch (error) {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    // Signup

    const handleSignUp = async ({ firstName, lastName, email, password, CURRENT_PAGE_TYPE }) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_END_POINT}/signup/${CURRENT_PAGE_TYPE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        firstName,
                        lastName,
                        email,
                        password
                    }
                )
            })
            const res_data = await res.json()
            if (res_data.error) {
                toast.warn(res_data.error);
                setIsLoading(false)
                return
            }
            toast.success(`Hello ${res_data.firstName}, You have successfully register to our system.`, {
                onClose: () => window.location.href = `/${CURRENT_PAGE_TYPE}`
            });
            setIsLoading(false)
            sessionStorage.setItem("userInfo", JSON.stringify(res_data));
            try {
                await postActivityLog({ ...res_data, CURRENT_PAGE_TYPE, message: `Account created with ${res_data.email}` })
            } catch (error) {
                toast.error(error.message);
            }

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    // postActivityLog

    async function postActivityLog({ _id, token, message, CURRENT_PAGE_TYPE }) {
        // console.log(_id, token, message, CURRENT_PAGE_TYPE)
        try {
            await fetch(`${API_END_POINT}/${CURRENT_PAGE_TYPE}/${_id}/activity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    fetch(`${API_END_POINT}/${CURRENT_PAGE_TYPE}/${_id}/activity`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(
                            {
                                activityLog: data === null ? [{ message }] : [...data.activityLog, { message }]
                            }
                        )
                    })
                })
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <UserContext.Provider value={{ setIsLoading, API_END_POINT, GlobalElement, AdminElement, VendorElement, CustomerElement, signOut, isLoading, handleSignIn, handleForgotPassword, handleResetPassword, handleSignUp, CURRENT_USER }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}