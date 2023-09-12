import { useEffect } from "react"
import VendorWrapper from "../../../Components/Layout/Vendor/VendorWrapper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { useUserContext } from "../../../Context/User/UserContext"
import Log from "../../../Components/Log/Log"
export default function VendorActivityLog() {
    const { vendorActivity, fetchVendorActivity } = useRootContext()
    const { isLoading } = useUserContext()
    useEffect(() => {
        fetchVendorActivity()
        return () => {
            fetchVendorActivity()
        }
    }, []);
    const vendorActivityLog = vendorActivity !== undefined && vendorActivity.sort().reverse()
    return (
        <VendorWrapper>
            <div className="mb-6">
                <h1 className="text-md font-bold">Vendor Activity Log</h1>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                {isLoading === true ? "Loading..." : <>
                    {vendorActivity !== undefined && vendorActivityLog.map(item => {
                        return <Log item={item} key={item._id} />
                    })}
                </>}
            </div>
        </VendorWrapper>
    )
}
