import Header from "../Header/UserHeader"
import MainContent from "../Content/MainContent"
import UserNavigation from "../Navigation/UserNavigation"


export default function AdminWarpper({ children }) {
    const ADMIN_NAV = [
        {
            page:"Home",
            link:"/admin",
            icon:`<BiHomeAlt />`
        },
        {
            page:"Vendors",
            link:"/admin/vendors",
            icon:`<AiOutlineShop />`
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
