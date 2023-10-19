import Header from "../Header/UserHeader"
import MainContent from "../Content/MainContent"
import UserNavigation from "../Navigation/UserNavigation"
import { AiOutlineHome, AiOutlineShop } from "react-icons/ai";
import { TbChartHistogram } from "react-icons/tb";
import { FiFeather } from "react-icons/fi";
import { MdOutlineWorkHistory } from "react-icons/md";


export default function AdminWarpper({ children }) {
    const homeIcon = () => {
        return <AiOutlineHome />
    }
    const vendorIcon = () => {
        return <AiOutlineShop />
    }
    const activityIcon = () => {
        return <TbChartHistogram />
    }

    const serviceIcon = () => {
        return <MdOutlineWorkHistory />
    }

    const serviceCatIcon = () => {
        return <FiFeather />
    }

    const ADMIN_NAV = [
        {
            page:"Home",
            link:"/admin",
            icon:homeIcon()
        },
        {
            page:"Vendors",
            link:"/admin/vendors",
            icon:vendorIcon()
        },
        {
            page:"Services",
            link:"/admin/services",
            icon:serviceIcon()
        },
        {
            page:"Services Category",
            link:"/admin/services/category",
            icon:serviceCatIcon(),
            hasSub:true,
            subMenu:[
                {
                    page:"All Category",
                    link:"/admin/services/category",
                    icon:serviceCatIcon()
                },
                {
                    page:"Add Category",
                    link:"/admin/services/category/add",
                    icon:serviceCatIcon()
                }
            ]
        },
        {
            page:"Track Activity",
            link:"/admin/activity",
            icon:activityIcon()
        },
    ]
    return (
        <div className="site-layout">
            <Header />
            <div className="flex flex-col md:flex-row md:items-start w-full bg-gray-light min-h-screen">
                <UserNavigation NAV={ADMIN_NAV} />
                <MainContent>
                    <>{children}</>
                </MainContent>
            </div>
        </div>
    )
}
