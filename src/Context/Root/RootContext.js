import { createContext, useContext, useState } from "react";
import { useUserContext } from "../User/UserContext";
import { toast } from 'react-toastify'

export const RootContext = createContext()

export const RootContextProvider = ({ children }) => {
    const { API_END_POINT, setIsLoading, CURRENT_USER } = useUserContext()

    const [vendors, setVendors] = useState([])
    const [vendorActivity, setVendorActivity] = useState([])
    const [adminActivity, setAdminActivity] = useState([])

    const fetchVendors = () => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/vendors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setVendors(data)
                })
                .catch((error) => {
                    toast.error(error.message);
                });
            setIsLoading(false)

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const fetchVendorActivity = () => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/vendor/${CURRENT_USER._id}/activity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setVendorActivity(data?.activityLog)
                })
                .catch((error) => {
                    toast.error(error.message);
                });
            setIsLoading(false)

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const fetchAdminActivity = () => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/${CURRENT_USER._id}/activity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setAdminActivity(data?.activityLog)
                })
                .catch((error) => {
                    toast.error(error.message);
                });
            setIsLoading(false)

        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    return (
        <RootContext.Provider value={{ fetchVendors, vendors, vendorActivity, fetchVendorActivity, adminActivity, fetchAdminActivity }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRootContext = () => {
    return useContext(RootContext)
}