import { Link } from "react-router-dom"
export default function GlobalHome() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="text-center py-6 bg-gray-light2">
        <h1 className="font-bold text-2xl">MultiLevel App</h1>
      </header>
      <section className="max-w-screen-2xl w-9/12 mx-auto">
        <h1 className="text-center font-light text-6xl">Welcome User!</h1>
        <h4 className="text-center text-md mt-4">Please Login to your account</h4>
        <nav className="flex gap-6 justify-center items-center my-12 font-para">
          <Link to="/admin" className="border border-gray-dark rounded-md px-10 py-2 hover:text-active-color hover:border-active-color">Admin</Link>
          <Link to="/vendor" className="border border-gray-dark rounded-md px-10 py-2  hover:text-active-color hover:border-active-color">Vendor</Link>
          <Link to="/customer" className="border border-gray-dark rounded-md px-10 py-2  hover:text-active-color hover:border-active-color">Customer</Link>
        </nav>
      </section>
      <footer className="text-center bg-text-color text-white-color py-4 w-full">
        &copy; Suvendu
      </footer>
    </div>
  )
}
