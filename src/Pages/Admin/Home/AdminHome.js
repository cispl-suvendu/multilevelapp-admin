import { useUserContext } from "../../../Context/User/UserContext"

export default function AdminHome() {
  const {signOut} = useUserContext()
  return (
    <div>
      <h1 className="text-6xl font-bold text-center">AdminHome</h1>
      <div className="flex justify-center">
      <button className="border border-gray-dark rounded-md px-4 py-2 hover:text-active-color hover:border-active-color" onClick={()=>signOut()}>Signout</button>
      </div>
    </div>
  )
}
