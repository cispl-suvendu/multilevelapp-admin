import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext";
import { useUserContext } from "../../../Context/User/UserContext";
import { useEffect, useState } from "react";



export default function AdminAddService() {

    const { isLoading } = useUserContext()

    const { handleAddServiceCat } = useRootContext()

    const [dataName, setDataName] = useState("")

    const [dataAlice, setDataAlice] = useState("")

    useEffect(() => {
        const temp = dataName?.trim().replace(/\s/g, "-").toLocaleLowerCase()
        setDataAlice(temp)
        return () => {
            setDataAlice("")
        }
    }, [dataName])

    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">Add Service Category</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                    <form onSubmit={(event) => handleAddServiceCat(event, dataName, dataAlice)}>
                        <div className="flex flex-col w-full mb-4">
                            <label className="font-bold text-text-color text-xs block mb-2">
                                Service Name
                            </label>
                            <input type="text" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark " placeholder="Air Conditioner" value={dataName} onChange={(e) => setDataName(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="font-bold text-text-color text-xs block mb-2">
                                Service Alice (auto generated)
                            </label>
                            <input type="text" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark disabled:cursor-not-allowed" placeholder="air-conditioner" value={dataAlice} disabled />
                        </div>

                        {dataName?.length === 0 ? <button className="rounded bg-gray-light3 text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed" disabled>Add</button> : <button className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Add'}</button>}
                    </form>
                </div>
            </div>
        </AdminWarpper>
    )
}
