import { createContext, useContext, useState } from "react";
import { useUserContext } from "../User/UserContext";
import { toast } from 'react-toastify'

export const RootContext = createContext()

export const RootContextProvider = ({ children }) => {
    const { API_END_POINT, setIsLoading, CURRENT_USER } = useUserContext()

    const [vendors, setVendors] = useState([])
    const [vendorActivity, setVendorActivity] = useState([])
    const [adminActivity, setAdminActivity] = useState([])
    const [singleVendorData, setSingleVendorData] = useState(null)

    const fetchVendors = () => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/vendors`, {
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

    const fetchSingleVendor_AS_ADMIN = (id) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/vendor/${id}`, {
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
                    setSingleVendorData(data)
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
        <RootContext.Provider value={{ fetchVendors, vendors, vendorActivity, fetchVendorActivity, adminActivity, fetchAdminActivity, fetchSingleVendor_AS_ADMIN, singleVendorData, setSingleVendorData, setVendorActivity, setVendors, setAdminActivity }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRootContext = () => {
    return useContext(RootContext)
}