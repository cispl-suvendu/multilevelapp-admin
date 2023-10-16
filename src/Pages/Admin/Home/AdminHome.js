import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import CountUp from 'react-countup';
import { AiOutlineShop } from "react-icons/ai";
import { FiFeather } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function AdminHome() {
  const { fetchVendors, vendors, setVendors, allServiceCat, setAllServiceCat, fetchAllServices } = useRootContext()

  useEffect(() => {
    fetchVendors()
    return () => setVendors([])
  }, [])

  useEffect(() => {
    fetchAllServices()
    return () => setAllServiceCat([])
  }, [])

  const activeVendors = vendors.length > 0 && vendors.filter(item => item.isActive === true)
  const activServiceCat = allServiceCat.length > 0 && allServiceCat.filter(item => item.catstatus === true)


  return (
    <AdminWarpper>
      <div className="mb-6">
        <h1 className="text-md font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-3/12 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">All Vendors</div>
            <AiOutlineShop className="text-3xl text-active-color" />
          </div>
          <div className="flex justify-between items-center pt-2">
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
          </div>
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-3/12 text-text-color">
          <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
            <div className="font-bold text-sm">Service Category</div>
            <FiFeather className="text-3xl text-active-color" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <CountUp
                end={activServiceCat.length}
                className="font-bold text-3xl"
              /> /  <CountUp
                end={allServiceCat.length}
                className="font-bold text-sm text-gray-dark"
              />
            </div>
            <Link to="/admin/services" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
          </div>
        </div>
      </div>
    </AdminWarpper>
  )
}
