import { Link, useLocation } from "react-router-dom"

export default function UserNavigation({ NAV }) {
  const location = useLocation()
  return (
    <div className="w-full md:w-1/6 md:min-h-screen bg-gray-light2 px-6 py-12 md:sticky md:top-0">
      <nav>
        <ul className="flex flex-col gap-6">
          {NAV.map(({ page, link, icon }, index) => {
            return (
              <li key={index}>
                <Link to={link} className={`${location.pathname === link ? "text-active-color" : "text-text-color"} text-sm font-bold  hover:text-active-color flex items-center`}>
                  <span className="mr-2 text-xl">{icon}</span>
                  <span>{page}</span></Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div >
  )
}
