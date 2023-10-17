import { createContext, useContext, useState } from "react";
import { useUserContext } from "../User/UserContext";
import { toast } from 'react-toastify'


export const RootContext = createContext()

export const RootContextProvider = ({ children }) => {
    const { API_END_POINT, setIsLoading, CURRENT_USER, postActivityLog } = useUserContext()

    const [vendors, setVendors] = useState([])
    const [vendorActivity, setVendorActivity] = useState([])
    const [adminActivity, setAdminActivity] = useState([])
    const [singleVendorData, setSingleVendorData] = useState(null)
    const [toggleMainNav, setToggleMainNav] = useState(false)
    const [LOADING, setLOADING] = useState(false)


    const shitchNavStatus = () => {
        setToggleMainNav(prevStatus => !prevStatus)
    }

    const fetchVendors = () => {
        setLOADING(true)
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
                    setLOADING(false)
                })
                .catch((error) => {
                    toast.error(error.message);
                    setLOADING(false)
                });
                
                
        } catch (error) {
            toast.error(error.message);
            setLOADING(false)
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

    const handleAddServiceCat = ({ name, caturl }) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    name,
                    caturl
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

    const fetchAllServices_Category = () => {
        setLOADING(true)
        try {
            fetch(`${API_END_POINT}/${CURRENT_USER?.role.toLowerCase()}/services/cat`, {
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
                    setLOADING(false)
                })
                .catch((error) => {
                    toast.error(error.message);
                    setLOADING(false)
                });

        } catch (error) {
            toast.error(error.message);
            setLOADING(false)
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

    const updateSingleSeriveCat_As_Admin = ({ catstatus, caturl, name, _id }) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/admin/services/cat/edit/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    catstatus,
                    name,
                    caturl
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


    // add service

    const handleAddService = ({ name, catId, cost, images, description }) => {
        setIsLoading(true)
        try {
            fetch(`${API_END_POINT}/vendor/services/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${CURRENT_USER.token}`
                },
                body: JSON.stringify({
                    name,
                    cost,
                    description,
                    images,
                    category: catId,
                    createdBy: CURRENT_USER._id
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setIsLoading(false)
                    toast.success(`New Service Added - ${data.name} `)
                    try {
                        postActivityLog({ _id: CURRENT_USER._id, token: CURRENT_USER.token, CURRENT_PAGE_TYPE: "vendor", message: `New Service Added - ${data.name}` })
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

    // fetch All service by vendor

    const [allService, setAllService] = useState([])

    const fetchAllServices_AS_VENDOR = () => {
        setLOADING(true)
        try {
            fetch(`${API_END_POINT}/vendor/services/createdby/${CURRENT_USER._id}`, {
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
                    setAllService(data)
                    setLOADING(false)
                })
                .catch((error) => {
                    toast.error(error.message);
                    setLOADING(false)
                });

        } catch (error) {
            toast.error(error.message);
            setLOADING(false)
        }
    }



    return (
        <RootContext.Provider value={{LOADING, fetchVendors, vendors, vendorActivity, fetchVendorActivity, adminActivity, fetchAdminActivity, fetchSingleVendor_AS_ADMIN, singleVendorData, setSingleVendorData, setVendorActivity, setVendors, setAdminActivity, updateVendorStatus, shitchNavStatus, toggleMainNav, handleAddServiceCat, allServiceCat, setAllServiceCat, fetchAllServices_Category, singleServiceData, setSingleServiceData, fetchSingleServiceCat_AS_ADMIN, updateSingleSeriveCat_As_Admin, handleAddService, allService, setAllService, fetchAllServices_AS_VENDOR }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRootContext = () => {
    return useContext(RootContext)
}