import { useEffect } from "react"
import VendorWrapper from "../../../Components/Layout/Vendor/VendorWrapper"
import { useRootContext } from "../../../Context/Root/RootContext"
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import Moment from 'react-moment'
import { CSVLink } from "react-csv";
import { BiCloudDownload } from 'react-icons/bi';
import Rectangle from "../../../Components/Sklaton/Rectangle";
import { useNavigate } from "react-router";

export default function VendorServices() {
  const { allService, setAllService, fetchAllServices_AS_VENDOR, LOADING } = useRootContext()
  useEffect(() => {
    fetchAllServices_AS_VENDOR()
    return () => {
      setAllService([])
    }
  }, [])
  const allServiceInReverseOrder = allService.sort().reverse()
  const dateTemplete = (rowData) => {
    return <Moment format="D MMM YYYY" withTitle>{rowData.createdAt}</Moment>
  }

  const catTemplete = (rowData) => {
    return rowData.category.name
  }

  const costTemplete = (rowData) => {
    return `Rs: ${rowData.cost} / per hour`
  }

  const imageTemplate = (rowData) => {
    return rowData.images.length > 0 ? <img src={rowData.images[0].data_url} width="60" /> : "No Image Available"
  }

  const onRowSelect = (event) => {
    console.log(event.data)
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={getSeverity(rowData.servicestatus)} severity={getSeverity(rowData.servicestatus) === "Active" ? "success" : "warning"} />;
  };

  const getSeverity = (value) => {
    if (value === true) {
      return 'Active';
    } else {
      return 'In-Active';
    }
  };
  return (
    <VendorWrapper>
      <div className="mb-6">
        <h1 className="text-md font-bold">All Services</h1>
        <div className="flex justify-end">
          <CSVLink
            data={allServiceInReverseOrder}
            filename={"Service-list.csv"}
            className="flex gap-1 font-bold items-center hover:text-active-color"
          >
            <BiCloudDownload className="text-active-color text-xl" />
            <span className="text-xs">Download CSV</span>
          </CSVLink>
        </div>
      </div>
      <div className="bg-white-color rounded-md shadow-md p-4">
        {LOADING ? <Rectangle /> :
          <div>
            <DataTable value={allServiceInReverseOrder} className="w-full" tableStyle={{ minWidth: '100%' }} paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50]} onRowSelect={onRowSelect} selectionMode="single">
              <Column sortable field="_id" header="#id" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
              <Column sortable field="images" header="Thumbnail" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={imageTemplate}></Column>
              <Column sortable field="name" header="Name" className="text-xs py-4 my-2 text-left border-b border-gray-light3"></Column>
              <Column sortable field="category" header="Category" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={catTemplete}></Column>
              <Column sortable field="cost" header="Cost" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={costTemplete}></Column>
              <Column sortable field="createdAt" header="Date" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={dateTemplete}></Column>
              <Column sortable field="servicestatus" header="Status" className="text-xs py-4 my-2 text-left border-b border-gray-light3" body={statusBodyTemplate}></Column>
            </DataTable>
          </div>
        }
      </div>

    </VendorWrapper>
  )
}
