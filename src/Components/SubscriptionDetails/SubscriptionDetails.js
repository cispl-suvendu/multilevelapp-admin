import Rectangle from '../Sklaton/Rectangle'
import { InputSwitch } from "primereact/inputswitch";
import { useUserContext } from '../../Context/User/UserContext';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useRootContext } from '../../Context/Root/RootContext';


export default function SubscriptionDetails({ data }) {
    const { isLoading } = useUserContext()
    const {updateVendorStatus} = useRootContext()
    const [switchVal, setSwitchVal] = useState(null)
    const [showError, setShowError] = useState(false)
    useEffect(() => {
        setSwitchVal(data?.isActive)
    }, [data])

    return (
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
            {data === null ? <Rectangle /> : <>
                <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Subscription Status</div>
                <div className="font-bold text-sm mt-4">{data.firstName} {data.lastName}'s current Status is {data.isActive ? <Tag severity="success" value="Active"></Tag> : <Tag severity="warning" value="Inactive"></Tag>}</div>
                <div className="text-gray-dark text-xs mt-4">Please Note: Admin can update the status any time.</div>
                <div className="text-gray-dark text-xs mb-4 mt-2">(To update the status please click on update status button)</div>
                <div className="mb-4">
                    <InputSwitch name="isActive" checked={switchVal} onChange={(e) => {
                        setSwitchVal(e.value);
                        setShowError(false)
                    }} />
                </div>
                {showError && <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">Please make a changes</div>}
                {switchVal === data.isActive ? <button className="rounded bg-gray-light3 text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3" onClick={() => setShowError(true)}>Update Status</button> : <button onClick={() => updateVendorStatus({isActive:switchVal, id:data?._id})} className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Update Status'}</button>}
                
            </>}
        </div>
    )
}
