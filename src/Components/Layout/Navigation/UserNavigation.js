import { Link } from "react-router-dom"



export default function UserNavigation({NAV}) {
  return (
    <div className="w-full md:w-1/6 min-h-screen bg-gray-light2 px-6 py-12">
      <nav>
        <ul className="flex flex-col gap-4">
          {NAV.map(({page, link}, index) => <li key={index}><Link to={link} className="text-sm font-bold text-text-color hover:text-active-color">{page}</Link></li>)}
        </ul>
      </nav>
    </div>
  )
}
