import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { useParams } from "react-router"
import PersonalDetails from "../../../Components/PersonalDetails/PersonalDetails"
import { Skeleton } from 'primereact/skeleton';
import SubscriptionDetails from "../../../Components/SubscriptionDetails/SubscriptionDetails"

export default function SingleVendorAdminView() {
    const { id } = useParams()
    const { fetchSingleVendor_AS_ADMIN, singleVendorData, setSingleVendorData } = useRootContext()
    useEffect(() => {
        fetchSingleVendor_AS_ADMIN(id)
        return () => setSingleVendorData(null)
    }, [])
    return (
        <AdminWarpper>
            <div className="mb-6">
                {singleVendorData === null ? <Skeleton className="mb-2" height="2rem"></Skeleton> : <h1 className="text-md font-bold">{singleVendorData?.firstName} {singleVendorData?.lastName}</h1>}
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <PersonalDetails data={singleVendorData} />
                <SubscriptionDetails data={singleVendorData} />
            </div>
        </AdminWarpper>
    )
}
