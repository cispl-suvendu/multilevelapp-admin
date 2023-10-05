import { Link, useLocation } from "react-router-dom"
import { Menu } from '@headlessui/react'
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { useRootContext } from "../../../Context/Root/RootContext";

export default function UserNavigation({ NAV }) {
  const location = useLocation()
  const {shitchNavStatus, toggleMainNav} = useRootContext()
  return (
    <div className={`${toggleMainNav ? 'md:w-[46px] px-2' : 'md:w-1/6 px-6'} w-full md:min-h-screen bg-gray-light2 py-12 md:sticky md:top-0 relative`}>
      <button className="absolute top-4 right-4 text-xl text-text-color" onClick={() => shitchNavStatus()}>
        {toggleMainNav ? <BiHide /> : <BiShowAlt />}
      </button>
      <nav>
        <ul className="flex flex-col gap-6">
          {NAV.map(({ page, link, icon, hasSub, subMenu }, index) => {
            if (hasSub === true) {
              return (
                <li key={index}>
                  <Menu>
                    <Menu.Button className={`text-text-color text-xs font-bold hover:text-active-color flex items-center`}>
                      <span className="mr-2 text-xl">{icon}</span>
                      {!toggleMainNav && <span>{page}</span>}
                    </Menu.Button>
                    <Menu.Items className="flex flex-col pl-4 pt-6 gap-4">
                      {subMenu.map(({ page, link, icon }, index) => {
                        return (
                          <Link key={index} to={link} className={`${location.pathname === link ? "text-active-color" : "text-text-color"} text-xs font-bold  hover:text-active-color flex items-center`}>
                            <span className="mr-2 text-xs">{icon}</span>
                            {!toggleMainNav && <span>{page}</span>}</Link>
                        )
                      })}
                    </Menu.Items>
                  </Menu>
                </li>
              )
            } else {
              return (
                <li key={index}>
                  <Link to={link} className={`${location.pathname === link ? "text-active-color" : "text-text-color"} text-xs font-bold  hover:text-active-color flex items-center`}>
                    <span className="mr-2 text-xl">{icon}</span>
                    {!toggleMainNav && <span>{page}</span>}</Link>
                </li>
              )
            }
          })}
        </ul>
      </nav>
    </div >
  )
}
