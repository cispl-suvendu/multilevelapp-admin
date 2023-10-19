import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link, useNavigate } from "react-router-dom";
import { Tag } from 'primereact/tag';

export default function DashBoardTable({ title, data, field1, field2, field3, field4, viewAll, singleLink }) {
    
    const navigate = useNavigate()

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getSeverity(rowData.isActive || rowData.catstatus || rowData.servicestatus)} severity={getSeverity(rowData.isActive || rowData.catstatus || rowData.servicestatus) === "Active" ? "success" : "warning"} />
    }

    const getSeverity = (value) => {
        if (value === true) {
            return 'Active';
        } else {
            return 'In-Active';
        }
    }
    const onRowSelect = (event) => {
        navigate(`${singleLink}/${event.data._id}`)
    }


    return (
        <div>
            <div className="border-b border-gray-light3 pb-4 flex justify-between items-center">
                <div className="font-bold text-sm capitalize">{title}</div>
                <Link to={viewAll} className="text-xs text-gray-dark hover:text-active-color">View all</Link>
            </div>
            <DataTable value={data} className="w-full" tableStyle={{ minWidth: '100%' }} onRowSelect={onRowSelect} selectionMode="single">
                <Column field={field1?.field} header={field1?.header} className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                <Column field={field2?.field} header={field2?.header} className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                <Column field={field3?.field} header={field3?.header} className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
                <Column field={field4?.field} header={field4?.header} className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={statusBodyTemplate}></Column>
            </DataTable>
        </div>
    )
}
