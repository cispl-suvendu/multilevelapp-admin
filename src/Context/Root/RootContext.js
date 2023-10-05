import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../User/UserContext";
import { toast } from 'react-toastify'
import { Tag } from 'primereact/tag'

export const RootContext = createContext()

export const RootContextProvider = ({ children }) => {
    const { API_END_POINT, setIsLoading, CURRENT_USER, postActivityLog } = useUserContext()

    const [vendors, setVendors] = useState([])
    const [vendorActivity, setVendorActivity] = useState([])
    const [adminActivity, setAdminActivity] = useState([])
    const [singleVendorData, setSingleVendorData] = useState(null)
    const [toggleMainNav, setToggleMainNav] = useState(false)


    const shitchNavStatus = () => {
        setToggleMainNav(prevStatus => !prevStatus)
    }

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

    const updateVendorStatus = ({ id, isActive }) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/vendor/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    isActive
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setSingleVendorData(data)
                    setIsLoading(false)
                    toast.success("Vendor Status Updated!")
                    try {
                        postActivityLog({ _id: CURRENT_USER._id, token: CURRENT_USER.token, CURRENT_PAGE_TYPE: "admin", message: `${data.firstName} ${data.lastName} Account status updated to ${data.isActive === true ? "Active" : "Inactive"}` })
                    } catch (error) {
                        toast.error(error.message);
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                    setIsLoading(false)
                });


        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const handleAddServiceCat = (event, dataName, dataAlice) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    name: dataName,
                    caturl: dataAlice
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setIsLoading(false)
                    toast.success(`New Service category Added - ${data.name} `)
                    try {
                        postActivityLog({ _id: CURRENT_USER._id, token: CURRENT_USER.token, CURRENT_PAGE_TYPE: "admin", message: `New Service category Added - ${data.name}` })
                    } catch (error) {
                        toast.error(error.message);
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                    setIsLoading(false)
                });
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const [allServiceCat, setAllServiceCat] = useState([])

    const fetchAllServices = () => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat`, {
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
                    setAllServiceCat(data)
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

    const [singleServiceData, setSingleServiceData] = useState(null)

    const fetchSingleServiceCat_AS_ADMIN = (id) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat/${id}`, {
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
                    setSingleServiceData(data)
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

    const updateSingleSeriveCat_As_Admin = (id, switchVal, dataName, dataAlice) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat/edit/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    catstatus: switchVal,
                    name: dataName,
                    caturl: dataAlice
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setSingleServiceData(data)
                    setIsLoading(false)
                    toast.success(`Service category - ${data.name} updated successfully!`)
                    try {
                        postActivityLog({ _id: CURRENT_USER._id, token: CURRENT_USER.token, CURRENT_PAGE_TYPE: "admin", message: `Service category - ${data.name} updated successfully!` })
                    } catch (error) {
                        toast.error(error.message);
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                    setIsLoading(false)
                });


        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }



    return (
        <RootContext.Provider value={{ fetchVendors, vendors, vendorActivity, fetchVendorActivity, adminActivity, fetchAdminActivity, fetchSingleVendor_AS_ADMIN, singleVendorData, setSingleVendorData, setVendorActivity, setVendors, setAdminActivity, updateVendorStatus, shitchNavStatus, toggleMainNav, handleAddServiceCat, allServiceCat, setAllServiceCat, fetchAllServices, singleServiceData, setSingleServiceData, fetchSingleServiceCat_AS_ADMIN, updateSingleSeriveCat_As_Admin }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRootContext = () => {
    return useContext(RootContext)
}