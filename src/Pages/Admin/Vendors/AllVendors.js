import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"

export default function AllVendors() {
    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold text-text-color">All Vendors</h1>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                <div>
                    <table className="w-full">
                        <thead className="text-xs text-text-color font-normal">
                            <tr>
                                <th>#id</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminWarpper>
    )
}
