import Header from "../Header/UserHeader"
import MainContent from "../Content/MainContent"
import UserNavigation from "../Navigation/UserNavigation"
import { AiOutlineHome } from "react-icons/ai";
import { TbChartHistogram } from "react-icons/tb";
import { FiFeather } from "react-icons/fi";

export default function VendorWrapper({ children }) {
    const homeIcon = () => {
        return <AiOutlineHome />
    }
    const activityIcon = () => {
        return <TbChartHistogram />
    }
    const serviceIcon = () => {
        return <FiFeather />
    }
    const VENDOR_NAV = [
        {
            page:"Home",
            link:"/vendor",
            icon:homeIcon()
        },
        {
            page:"Services",
            link:"/vendor/services",
            icon:serviceIcon(),
            hasSub:true,
            subMenu:[
                {
                    page:"All Service",
                    link:"/vendor/services",
                    icon:serviceIcon()
                },
                {
                    page:"Add Service",
                    link:"/vendor/services/add",
                    icon:serviceIcon()
                }
            ]
        },
        {
            page:"Track Activity",
            link:"/vendor/activity",
            icon:activityIcon()
        }
    ]
    return (
        <div className="site-layout">
            <Header />
            <div className="flex flex-col md:flex-row md:items-start w-full bg-gray-light min-h-screen">
                <UserNavigation NAV={VENDOR_NAV} />
                <MainContent>
                    <>{children}</>
                </MainContent>
            </div>
        </div>
    )
}
