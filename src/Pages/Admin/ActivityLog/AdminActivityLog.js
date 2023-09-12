import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import Log from "../../../Components/Log/Log"

export default function AdminActivityLog() {
    const { adminActivity, fetchAdminActivity } = useRootContext()
    useEffect(() => {
        fetchAdminActivity()
        return () => {
            fetchAdminActivity()
        }
    }, [])
    const adminActivityLog = adminActivity !== undefined && adminActivity.sort().reverse()
    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">Activity Log</h1>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                {adminActivity !== undefined && adminActivityLog.map(item => {
                    return <Log item={item} key={item._id} />
                })}
            </div>
        </AdminWarpper>
    )
}
