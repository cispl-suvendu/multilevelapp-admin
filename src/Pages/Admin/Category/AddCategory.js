import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext";
import AddServiceCat from "../../../Components/Service/Cat/AddServiceCat";

export default function AdminAddServiceCat() {

    const { handleAddServiceCat } = useRootContext()

    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">Add Service Category</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                    <AddServiceCat addServiceCat={handleAddServiceCat} />
                </div>
            </div>
        </AdminWarpper>
    )
}
