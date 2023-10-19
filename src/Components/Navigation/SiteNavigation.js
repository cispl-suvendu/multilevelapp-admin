import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AdminHome from "../../Pages/Admin/Home/AdminHome"
import VendorHome from "../../Pages/Vendor/Home/VendorHome"
import CustomerHome from "../../Pages/Customer/Home/CustomerHome"
import GlobalHome from "../../Pages/Golbal/Home/GlobalHome"
import NotFound from "../../Pages/Golbal/Error/NotFound"
import { useUserContext } from "../../Context/User/UserContext"
import AdminLogin from "../../Pages/Admin/Login/AdminLogin"
import CustomerLogin from "../../Pages/Customer/Login/CustomerLogin"
import VendorLogin from "../../Pages/Vendor/Login/VendorLogin"
import AdminForgotPassword from "../../Pages/Admin/ForgotPassword/AdminForgotPassword"
import AdminResetPassword from "../../Pages/Admin/ResetPassword/AdminResetPassword"
import VendorForgotPassword from "../../Pages/Vendor/ForgotPassword/VendorForgotPassword"
import VendorResetPassword from "../../Pages/Vendor/ResetPassword/VendorResetPassword"
import VendorRegister from "../../Pages/Vendor/Register/VendorRegister"
import AllVendors from "../../Pages/Admin/Vendors/AllVendors"
import VendorActivityLog from "../../Pages/Vendor/ActivityLog/VendorActivityLog"
import AdminActivityLog from "../../Pages/Admin/ActivityLog/AdminActivityLog"
import SingleVendorAdminView from "../../Pages/Admin/Vendors/SingleVendor"
import VendorServices from "../../Pages/Vendor/Services/VendorServices"
import AdminAddServiceCat from "../../Pages/Admin/Category/AddCategory"
import AdminListAllServicesCat from "../../Pages/Admin/Category/ListAllCategorys"
import AdminSingleServiceCat from "../../Pages/Admin/Category/SingleCategory"
import VendorAddService from "../../Pages/Vendor/Services/VendorAddService"
import AdminAllServices from "../../Pages/Admin/Services/AdminAllServices"

export default function SiteNavigation() {
    const { GlobalElement, AdminElement, VendorElement, CustomerElement, ActiveVndor } = useUserContext()
    return (
        <Router>
            <Routes>
                {/* Global */}
                <Route path="/" element={<GlobalElement><GlobalHome /></GlobalElement>} />
                <Route path="login/admin" element={<GlobalElement><AdminLogin /></GlobalElement>} />
                <Route path="forgot-password/admin" element={<GlobalElement><AdminForgotPassword /></GlobalElement>} />
                <Route path="reset-password/admin/:id/:token" element={<GlobalElement><AdminResetPassword /></GlobalElement>} />
                <Route path="login/vendor" element={<GlobalElement><VendorLogin /></GlobalElement>} />
                <Route path="register/vendor" element={<GlobalElement><VendorRegister /></GlobalElement>} />
                <Route path="forgot-password/vendor" element={<GlobalElement><VendorForgotPassword /></GlobalElement>} />
                <Route path="reset-password/vendor/:id/:token" element={<GlobalElement><VendorResetPassword /></GlobalElement>} />
                <Route path="login/customer" element={<GlobalElement><CustomerLogin /></GlobalElement>} />
                <Route path="*" element={<NotFound />} />
                {/* Admin */}
                <Route path="admin" element={<AdminElement><AdminHome /></AdminElement>} />
                <Route path="admin/vendors" element={<AdminElement><AllVendors /></AdminElement>} />
                <Route path="admin/activity" element={<AdminElement><AdminActivityLog /></AdminElement>} />
                <Route path="admin/vendor/:id" element={<AdminElement><SingleVendorAdminView /></AdminElement>} />
                <Route path="admin/services/category/add" element={<AdminElement><AdminAddServiceCat /></AdminElement>} />
                <Route path="admin/services/category" element={<AdminElement><AdminListAllServicesCat /></AdminElement>} />
                <Route path="admin/service/category/:id" element={<AdminElement><AdminSingleServiceCat /></AdminElement>} />
                <Route path="admin/services" element={<AdminElement><AdminAllServices /></AdminElement>} />
                {/* Vendor */}
                <Route path="vendor" element={<VendorElement><VendorHome /></VendorElement>} />
                <Route path="vendor/activity" element={<VendorElement><VendorActivityLog /></VendorElement>} />
                <Route path="vendor/services" element={<VendorElement><ActiveVndor><VendorServices /></ActiveVndor></VendorElement>} />
                <Route path="vendor/services/add" element={<VendorElement><ActiveVndor><VendorAddService /></ActiveVndor></VendorElement>} />
                {/* customer */}
                <Route path="customer" element={<CustomerElement><CustomerHome /></CustomerElement>} />
            </Routes>
        </Router>
    )
}

