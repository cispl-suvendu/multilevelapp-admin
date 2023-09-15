import { Suspense, useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { useParams } from "react-router"
import PersonalDetails from "../../../Components/PersonalDetails/PersonalDetails"
import Rectangle from "../../../Components/Skeleton/Rectangle"

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
                <h1 className="text-md font-bold">{singleVendorData?.firstName} {singleVendorData?.lastName}</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <Suspense fallback={<Rectangle/>}>
                    <PersonalDetails data={singleVendorData} />
                </Suspense>
            </div>
        </AdminWarpper>
    )
}
