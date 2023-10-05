import { useEffect, useState } from 'react';
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { useParams } from "react-router"
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment'
import Rectangle from "../../../Components/Sklaton/Rectangle";
import { InputSwitch } from "primereact/inputswitch";
import { Tag } from 'primereact/tag';
import { useUserContext } from '../../../Context/User/UserContext';


export default function AdminSingleService() {
    const { id } = useParams()
    const { isLoading } = useUserContext()
    const { singleServiceData, setSingleServiceData, fetchSingleServiceCat_AS_ADMIN, updateSingleSeriveCat_As_Admin } = useRootContext()
    useEffect(() => {
        fetchSingleServiceCat_AS_ADMIN(id)
        return () => setSingleServiceData(null)
    }, [])
    const dateTemplete = moment(singleServiceData?.createdAt).format("D MMM YYYY")

    const [switchVal, setSwitchVal] = useState(null)
    const [dataName, setDataName] = useState("")
    const [dataAlice, setDataAlice] = useState("")
    useEffect(() => {
        setSwitchVal(singleServiceData?.catstatus)
        setDataName(singleServiceData?.name)
        setDataAlice(singleServiceData?.caturl)
        return () => {
            setSwitchVal(null)
            setDataName("")
            setDataAlice("")
        }
    }, [singleServiceData])

    useEffect(() => {
        const temp = dataName?.trim().replace(/\s/g, "-").toLocaleLowerCase()
        setDataAlice(temp)
        return () => {
            setDataAlice(singleServiceData?.caturl)
        }
    }, [dataName])

    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">{singleServiceData === null ? <Skeleton className="mb-2" height="2rem"></Skeleton> : <>Service Category - <span className="bg-active-color text-white-color p-1 rounded-md">{singleServiceData.name}</span></>}</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                    {singleServiceData === null ? <Rectangle /> : <>
                        <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Category Details</div>
                        <div className="my-6">
                            <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                                <div className="w-full">
                                    <label className="font-bold text-text-color text-xs block mb-2">
                                        Name
                                    </label>
                                    <input value={dataName} onChange={(e) => setDataName(e.target.value)} className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" />
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-text-color text-xs block mb-2">
                                        Alice
                                    </label>
                                    <input value={dataAlice} name="caturl" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                                <div className="w-full">
                                    <label className="font-bold text-text-color text-xs block mb-2">
                                        Cat Id
                                    </label>
                                    <input name="_id" value={singleServiceData._id} className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-text-color text-xs block mb-2">
                                        Created At
                                    </label>
                                    <input value={dateTemplete} name="createdAt" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
                <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                    {singleServiceData === null ? <Rectangle /> : <>
                        <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Category Status</div>
                        <div className="font-bold text-sm mt-4">Service Category - {singleServiceData.name}'s - current Status is {singleServiceData.catstatus ? <Tag severity="success" value="Active"></Tag> : <Tag severity="warning" value="Inactive"></Tag>}</div>
                        <div className="text-gray-dark text-xs mt-4">Please Note: Admin can update the status any time.</div>
                        <div className="text-gray-dark text-xs mb-4 mt-2">(To update the status please click on update status button)</div>
                        <div className="mb-4">
                            <InputSwitch name="catstatus" checked={switchVal} onChange={(e) => {
                                setSwitchVal(e.value);
                            }} />
                        </div>
                        {/* {dataName === "" && <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">Category name can not be blank</div>} */}
                        {singleServiceData.name !== dataName || singleServiceData.catstatus !== switchVal ? <button
                            onClick={() => updateSingleSeriveCat_As_Admin(id, switchVal, dataName, dataAlice)}
                            className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading || dataName === ""}
                        >
                            {isLoading ? 'Please wait...' : 'Update'}
                        </button> : <button
                            onClick={() => updateSingleSeriveCat_As_Admin(id, switchVal, dataName, dataAlice)}
                            className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={true}
                        >
                            {isLoading ? 'Please wait...' : 'Update'}
                        </button>}

                    </>}
                </div>
            </div>
        </AdminWarpper>
    )
}
