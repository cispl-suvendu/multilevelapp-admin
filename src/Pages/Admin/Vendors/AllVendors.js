import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRootContext } from "../../../Context/Root/RootContext";
import { useEffect } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Tag } from 'primereact/tag';
import Moment from 'react-moment'
import { useNavigate } from "react-router";
import Rectangle from "../../../Components/Sklaton/Rectangle";
import { CSVLink } from "react-csv";
import { BiCloudDownload } from 'react-icons/bi';
import { useUserContext } from "../../../Context/User/UserContext";


export default function AllVendors() {
    const navigate = useNavigate()
    const { fetchVendors, vendors, setVendors } = useRootContext()
    const {isLoading} = useUserContext()
    useEffect(() => {
        fetchVendors()
        return () => setVendors([])
    }, [])

    const vendorsDesc = vendors.sort().reverse()

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getSeverity(rowData.isActive)} severity={getSeverity(rowData.isActive) === "Active" ? "success" : "warning"} />;
    };

    const getSeverity = (value) => {
        if (value === true) {
            return 'Active';
        } else {
            return 'In-Active';
        }
    };

    const onRowSelect = (event) => {
        navigate(`/admin/vendor/${event.data._id}`)
    };

    const dateTemplete = (rowData) => {
        return <Moment format="D MMM YYYY" withTitle>{rowData.createdAt}</Moment>
    }

    const nameTemplete = (rowData) => {
        return `${rowData.firstName} ${rowData.lastName}`
    }

    console.log("isLoading", isLoading)
    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold text-text-color">All Vendors</h1>
                <div className="flex justify-end">
                    <CSVLink
                        data={vendorsDesc}
                        filename={"Vendors-list.csv"}
                        className="flex gap-1 font-bold items-center hover:text-active-color"
                    >
                        <BiCloudDownload className="text-active-color text-xl" />
                        <span className="text-xs">Download CSV</span>
                    </CSVLink>
                </div>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                {isLoading ? <Rectangle /> :
                    <div>
                        <DataTable value={vendorsDesc} className="w-full" tableStyle={{ minWidth: '100%' }} paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50]} onRowSelect={onRowSelect} selectionMode="single">
                            <Column sortable field="_id" header="#id" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                            <Column sortable field="firstName" header="Name" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={nameTemplete}></Column>
                            <Column sortable field="createdAt" header="Date" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={dateTemplete}></Column>
                            <Column sortable field="email" header="Email" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                            <Column sortable field="isActive" header="Status" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={statusBodyTemplate}></Column>
                        </DataTable>
                    </div>
                }
            </div>
        </AdminWarpper>
    )
}
