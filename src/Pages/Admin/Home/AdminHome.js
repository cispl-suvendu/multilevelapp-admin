import { useEffect } from "react"
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import CountUp from 'react-countup';

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

  const activeVendors = vendors.length > 0 && vendors.filter(item=> item.isActive === true)
  const activServiceCat = allServiceCat.length > 0 && allServiceCat.filter(item => item.catstatus === true)

  return (
    <AdminWarpper>
      <div className="mb-6">
        <h1 className="text-md font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-3/12 text-text-color">
          <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Active Vendors</div>
          <CountUp
            end={activeVendors.length}
            className="font-bold text-3xl"
          />
        </div>
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-3/12 text-text-color">
          <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Active Service Category</div>
          <CountUp
            end={activServiceCat.length}
            className="font-bold text-3xl"
          />
        </div>
      </div>
    </AdminWarpper>
  )
}
