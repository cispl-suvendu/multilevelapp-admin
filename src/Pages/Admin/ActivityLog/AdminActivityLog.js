import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import Log from "../../../Components/Log/Log"
import Rectangle from "../../../Components/Sklaton/Rectangle"
import { CSVLink } from "react-csv";
import { BiCloudDownload } from 'react-icons/bi';

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
                <div className="flex justify-end">
                    <CSVLink
                        data={adminActivityLog}
                        filename={"Activity-Log.csv"}
                        className="flex gap-1 font-bold items-center hover:text-active-color"
                    >
                        <BiCloudDownload className="text-active-color text-xl" />
                        <span className="text-xs">Download CSV</span>
                    </CSVLink>
                </div>
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
