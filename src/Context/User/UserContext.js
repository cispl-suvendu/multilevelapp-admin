import { createContext, useContext, useState } from "react"
import AdminLogin from "../../Pages/Admin/Login/AdminLogin"
import { toast } from 'react-toastify'
import VendorLogin from "../../Pages/Vendor/Login/VendorLogin"
import CustomerLogin from "../../Pages/Customer/Login/CustomerLogin"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const API_END_POINT = "http://localhost:5000/api/v1"

    const USER_TYPE = {
        ADMIN: "ADMIN",
        VENDOR: "VENDOR",
        CUSTOMER: "CUSTOMER",
        GLOBAL: "GLOBAL"
    }

    const TEMP_CURRENT_USER = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : null;

    const CURRENT_USER = JSON.parse(TEMP_CURRENT_USER)

    const CURRENT_USER_TYPE = CURRENT_USER?.role || USER_TYPE.GLOBAL

    function GlobalElement({ children }) {
        return <>{children}</>
    }

    function AdminElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN) {
            return <>{children}</>
        } else {
            return <AdminLogin />
        }
    }

    function VendorElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN || CURRENT_USER_TYPE === USER_TYPE.VENDOR) {
            return <>{children}</>
        } else {
            return <VendorLogin />
        }
    }

    function CustomerElement({ children }) {
        if (CURRENT_USER_TYPE === USER_TYPE.ADMIN || CURRENT_USER_TYPE === USER_TYPE.CUSTOMER) {
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

    const handleResetPassword = async ({ token, password, CURRENT_PAGE_TYPE }) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_END_POINT}/reset-password/${CURRENT_PAGE_TYPE}/${token}`, {
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
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ GlobalElement, AdminElement, VendorElement, CustomerElement, signOut, isLoading, handleSignIn, handleForgotPassword, handleResetPassword }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}