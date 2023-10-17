import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import Moment from 'react-moment'
import { useNavigate } from "react-router";
import Rectangle from "../../../Components/Sklaton/Rectangle";
import { CSVLink } from "react-csv";
import { BiCloudDownload } from 'react-icons/bi';

export default function AdminListAllServices() {
    
    const navigate = useNavigate()

    const {allServiceCat,  setAllServiceCat, fetchAllServices_Category} = useRootContext()
 
    useEffect(() => {
        fetchAllServices_Category()
        return()=> setAllServiceCat([])
    },[])

    const allServiceCatInReverseOrder = allServiceCat.sort().reverse()

    const dateTemplete = (rowData) => {
        return <Moment format="D MMM YYYY" withTitle>{rowData.createdAt}</Moment>
    }

    const onRowSelect = (event) => {
        navigate(`/admin/service/${event.data._id}`, {
            state: event.data
          })
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getSeverity(rowData.catstatus)} severity={getSeverity(rowData.catstatus) === "Active" ? "success" : "warning"} />;
    };

    const getSeverity = (value) => {
        if (value === true) {
            return 'Active';
        } else {
            return 'In-Active';
        }
    };

   
    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">All Service Category</h1>
                <div className="flex justify-end">
                    <CSVLink
                        data={allServiceCatInReverseOrder}
                        filename={"Service-cat-list.csv"}
                        className="flex gap-1 font-bold items-center hover:text-active-color"
                    >
                        <BiCloudDownload className="text-active-color text-xl" />
                        <span className="text-xs">Download CSV</span>
                    </CSVLink>
                </div>
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4">
                {allServiceCatInReverseOrder.length === 0 ? <Rectangle /> :
                    <div>
                        <DataTable value={allServiceCatInReverseOrder} className="w-full" tableStyle={{ minWidth: '100%' }} paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50]} onRowSelect={onRowSelect} selectionMode="single">
                            <Column sortable field="_id" header="#id" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                            <Column sortable field="name" header="Name" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                            <Column sortable field="caturl" header="Alice" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                            <Column sortable field="createdAt" header="Date" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={dateTemplete}></Column>
                            <Column sortable field="catstatus" header="Status" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={statusBodyTemplate}></Column>
                        </DataTable>
                    </div>
                }
            </div>
        </AdminWarpper>
    )
}
