import Header from "../Header/UserHeader"
import MainContent from "../Content/MainContent"
import UserNavigation from "../Navigation/UserNavigation"
import { AiOutlineHome, AiOutlineShop } from "react-icons/ai";
import { TbChartHistogram } from "react-icons/tb";

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
