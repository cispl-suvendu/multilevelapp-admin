import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import Log from "../../../Components/Log/Log"
import Rectangle from "../../../Components/Skeleton/Rectangle"

export default function AdminActivityLog() {
    const { adminActivity, fetchAdminActivity, setAdminActivity } = useRootContext()
    useEffect(() => {
        fetchAdminActivity()
        return () => {
            setAdminActivity([])
        }
    }, [])
    const adminActivityLog = adminActivity !== undefined && adminActivity.sort().reverse()
    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">Activity Log</h1>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                {adminActivityLog.length === 0 ? <Rectangle /> :
                    adminActivity !== undefined && adminActivityLog.map(item => {
                        return <Log item={item} key={item._id} />
                    })
                }
            </div>
        </AdminWarpper>
    )
}
