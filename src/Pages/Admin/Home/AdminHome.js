import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import CountUp from 'react-countup';
import { AiOutlineShop } from "react-icons/ai";
import { FiFeather, FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';
import { MdOutlineWorkHistory } from "react-icons/md";
import DashBoardTable from "../../../Components/Table/DashBoardTable";


export default function AdminHome() {
  const { fetchVendors, vendors, setVendors, allServiceCat, setAllServiceCat, fetchAllServices_Category, LOADING, adminViewAllServices, setAdminViewAllServices, fetchAllServices_AS_ADMIN, serviceIsLoading } = useRootContext()

  useEffect(() => {
    fetchVendors()
    fetchAllServices_Category()
    fetchAllServices_AS_ADMIN()
    return () => {
      setVendors([])
      setAllServiceCat([])
      setAdminViewAllServices([])
    }
  }, [])


  const activeVendors = vendors.length > 0 && vendors.filter(item => item.isActive === true)
  const activServiceCat = allServiceCat.length > 0 && allServiceCat.filter(item => item.catstatus === true)
  const activeServices = adminViewAllServices.length > 0 && adminViewAllServices.filter(item => item.servicestatus === true)

  return (
    <AdminWarpper>
      <div className="mb-6">
        <h1 className="text-md font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6 flex-wrap">
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">Vendors</div>
            <AiOutlineShop className="text-3xl text-active-color" />
          </div>
          {LOADING ? <Skeleton /> : <div className="flex justify-between items-center pt-2">
            <div>
              <CountUp
                end={activeVendors.length}
                className="font-bold text-3xl"
              /> /  <CountUp
                end={vendors.length}
                className="font-bold text-sm text-gray-dark"
              />
            </div>
            <Link to="/admin/vendors" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
          </div>}
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">Service Category</div>
            <FiFeather className="text-3xl text-active-color" />
          </div>
          {LOADING ? <Skeleton /> : <div className="flex justify-between items-center pt-2">
            <div>
              <CountUp
                end={activServiceCat.length}
                className="font-bold text-3xl"
              /> /  <CountUp
                end={allServiceCat.length}
                className="font-bold text-sm text-gray-dark"
              />
            </div>
            <Link to="/admin/services/category" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
          </div>}
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">Services</div>
            <MdOutlineWorkHistory className="text-3xl text-active-color" />
          </div>
          {serviceIsLoading ? <Skeleton /> : <div className="flex justify-between items-center pt-2">
            <div>
              <CountUp
                end={activeServices.length}
                className="font-bold text-3xl"
              /> /  <CountUp
                end={adminViewAllServices.length}
                className="font-bold text-sm text-gray-dark"
              />
            </div>
            <Link to="/admin/services" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
          </div>}
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">Customers</div>
            <FiUserCheck className="text-3xl text-active-color" />
          </div>
          {LOADING ? <Skeleton /> : <div className="flex justify-between items-center pt-2">
            <div>
              <CountUp
                end={0}
                className="font-bold text-3xl"
              /> /  <CountUp
                end={0}
                className="font-bold text-sm text-gray-dark"
              />
            </div>
            <Link to="/admin/services" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
          </div>}
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row gap-6 flex-wrap">
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          {LOADING ? <Skeleton /> : <DashBoardTable
            title="Recently joined Vendor"
            data={vendors.slice(-5).sort().reverse()}
            field1={{ field: "_id", header: "#id" }}
            field2={{ field: "firstName", header: "Name" }}
            field3={{ field: "email", header: "Email" }}
            field4={{ field: "isActive", header: "Status" }}
            viewAll="/admin/vendors"
            singleLink="/admin/vendor"
          />}
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
          {LOADING ? <Skeleton /> : <DashBoardTable
            title="Recently Added Categorys"
            data={allServiceCat.slice(-5).sort().reverse()}
            field1={{ field: "_id", header: "#id" }}
            field2={{ field: "name", header: "Name" }}
            field3={{ field: "caturl", header: "Alice" }}
            field4={{ field: "catstatus", header: "Status" }}
            viewAll="/admin/services/category"
            singleLink="/admin/service/category"
          />}
        </div>
      </div>
    </AdminWarpper>
  )
}
