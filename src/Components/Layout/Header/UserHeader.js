import { BiWind, BiLogOutCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../../Context/User/UserContext";
import { Menu } from '@headlessui/react'
export default function UserHeader() {
  const location = useLocation()
  let page_Type;
  function getPageType() {
    if (location.pathname.includes("admin")) {
      page_Type = "admin"
    } else if (location.pathname.includes("vendor")) {
      page_Type = "vendor"
    } else if (location.pathname.includes("customer")) {
      page_Type = "customer"
    } else {
      page_Type = undefined
    }
    return page_Type
  }
  const CURRENT_PAGE_TYPE = getPageType()
  const { CURRENT_USER, signOut } = useUserContext()

  return (
    <div className="bg-active-color w-full px-6 py-2 text-white-color relative z-10">
      <div className="flex justify-between items-center">
        <div className="font-heading">
          <Link to={`/${CURRENT_PAGE_TYPE}`} className="flex items-center gap-1 text-xl font-bold"><BiWind /> MlApp</Link>
        </div>
        <div className="user-menu relative">
          <Menu>
            <Menu.Button>
              <div className="flex items-center bg-[rgba(255,255,255,.2)] pl-2 rounded-sm gap-2">
                <div className="text-xs capitalize">{CURRENT_USER?.firstName}</div>
                <div className="bg-active-color2 text-white-color w-8 h-8 font-bold font-heading flex items-center justify-center rounded-md">{CURRENT_USER?.firstName.charAt(0)}</div>
              </div>
            </Menu.Button>
            <Menu.Items className="absolute bg-white-color rounded-sm px-4 py-2 shadow-md right-0 w-52">
              <Menu.Item className="my-3">
                <button className="text-text-color flex items-center gap-1 text-sm hover:text-active-color" onClick={() => signOut()}><BiLogOutCircle /> Signout</button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  )
}
