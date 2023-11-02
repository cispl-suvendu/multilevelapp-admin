import VendorWrapper from "../../../Components/Layout/Vendor/VendorWrapper"
import { useUserContext } from "../../../Context/User/UserContext"
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
import { FiFeather, FiUserCheck } from "react-icons/fi";
import { useRootContext } from "../../../Context/Root/RootContext";
import { useEffect } from "react";
import { Skeleton } from 'primereact/skeleton';
import DashBoardTable from "../../../Components/Table/DashBoardTable";

export default function VendorHome() {
  const { DECODED_CURRENT_USER_Active_STATUS } = useUserContext()
  const { vendorAllService, setVendorAllService, fetchAllServices_AS_VENDOR, LOADING, serviceIsLoading } = useRootContext()
  useEffect(() => {
    fetchAllServices_AS_VENDOR()
    return () => {
      setVendorAllService([])
    }
  }, [])
  const activeSerices = vendorAllService.filter(item => item.servicestatus === true)
  return (
    <VendorWrapper>
      <div className="mb-6">
        <h1 className="text-md font-bold">Dashboard</h1>
      </div>
      {!DECODED_CURRENT_USER_Active_STATUS.isActive ?
        <div className="bg-blue-light p-4 rounded w-full md:w-6/12">
          <h2 className="text-white-color font-bold">Thank you for signing up with the ML App.</h2>
          <p className="text-white-color my-4 text-sm">Please be aware that your account has been successfully created but is currently undergoing verification. Our administrative team will promptly review and verify your account. Once the verification process is complete, you will be able to add services to our platform. We kindly ask for your patience during this time. Please log in to your account again to check the activation status.</p>
          <p className="text-white-color text-sm italic">(The verification process is expected to take approximately 2-4 hours.)</p>
        </div>
        : <div>
          <div className="flex flex-col md:flex-row gap-6 flex-wrap">
            <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
              <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
                <div className="font-bold text-sm">Services</div>
                <FiFeather className="text-3xl text-active-color" />
              </div>
              {serviceIsLoading ? <Skeleton height="2rem"></Skeleton> :
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <CountUp
                      end={activeSerices.length}
                      className="font-bold text-3xl"
                    /> /  <CountUp
                      end={vendorAllService.length}
                      className="font-bold text-sm text-gray-dark"
                    />
                  </div>
                  <Link to="/vendor/services" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
                </div>}
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
              <div className="flex justify-between items-center border-b border-gray-light3 pb-2 mb-2">
                <div className="font-bold text-sm">Customers</div>
                <FiUserCheck className="text-3xl text-active-color" />
              </div>
              {LOADING ? <Skeleton height="2rem"></Skeleton> :
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <CountUp
                      end={0}
                      className="font-bold text-3xl"
                    /> /  <CountUp
                      end={0}
                      className="font-bold text-sm text-gray-dark"
                    />
                  </div>
                  <Link to="/vendor/customers" className="text-xs text-gray-dark hover:text-active-color">View all</Link>
                </div>}
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row gap-6 flex-wrap">
            <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
              {serviceIsLoading ? <Skeleton /> : <DashBoardTable
                title="Recently created services"
                data={vendorAllService.slice(-5).sort().reverse()}
                field1={{ field: "_id", header: "#id" }}
                field2={{ field: "name", header: "Name" }}
                field3={{ field: "category.name", header: "Category" }}
                field4={{ field: "servicestatus", header: "Status" }}
                viewAll="/vendor/services"
                singleLink="/vendor/service"
              />}
            </div>
            <div className="bg-white-color rounded-md shadow-md p-4 w-full flex-1 text-text-color">
              {LOADING ? <Skeleton /> : <DashBoardTable
                title="Last 5 customer"
                data=""
                field1={{ field: "_id", header: "#id" }}
                field2={{ field: "name", header: "Name" }}
                field3={{ field: "caturl", header: "Alice" }}
                field4={{ field: "catstatus", header: "Status" }}
                viewAll="/admin/services/category"
                singleLink="/admin/service/category"
              />}
            </div>
          </div>
        </div>
      }
    </VendorWrapper>
  )
}
