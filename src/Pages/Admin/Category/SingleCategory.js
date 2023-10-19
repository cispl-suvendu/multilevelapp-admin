import { useEffect } from 'react';
import AdminWarpper from "../../../Components/Layout/Admin/AdminWarpper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { useParams } from "react-router"
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment'
import Rectangle from "../../../Components/Sklaton/Rectangle";
import { InputSwitch } from "primereact/inputswitch";
import { Tag } from 'primereact/tag';
import { useUserContext } from '../../../Context/User/UserContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const catSchema = Yup.object().shape({
    name: Yup.string()
        .required('Category name can not be blank'),
});


export default function AdminSingleServiceCat() {

    const { id } = useParams()
    const { isLoading } = useUserContext()
    const { singleServiceData, setSingleServiceData, fetchSingleServiceCat_AS_ADMIN, updateSingleSeriveCat_As_Admin } = useRootContext()
    useEffect(() => {
        fetchSingleServiceCat_AS_ADMIN(id)
        return () => setSingleServiceData(null)
    }, [])
    const dateTemplete = moment(singleServiceData?.createdAt).format("D MMM YYYY")

    return (
        <AdminWarpper>
            <div className="mb-6">
                <h1 className="text-md font-bold">{singleServiceData === null ? <Skeleton className="mb-2" height="2rem"></Skeleton> : <>Service Category - <span className="bg-active-color text-white-color p-1 rounded-md">{singleServiceData.name}</span></>}</h1>
            </div>
            {singleServiceData ? <><Formik
                initialValues={{
                    name: singleServiceData?.name,
                    caturl: singleServiceData?.caturl,
                    catstatus: singleServiceData?.catstatus,
                    _id: singleServiceData?._id,
                    createdAt: dateTemplete
                }}
                validationSchema={catSchema}
                enableReinitialize={true}
                onSubmit={values => {
                    updateSingleSeriveCat_As_Admin(values)
                }}
            >
                {({ errors, touched, setFieldValue, values, isValid , dirty }) => (

                    <Form>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                                <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Category Details</div>
                                <div className="my-6">
                                    <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                                        <div className="w-full">
                                            <label className="font-bold text-text-color text-xs block mb-2">
                                                Name
                                            </label>
                                            <Field name="name" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" onChange={(e) => {
                                                setFieldValue("name", e.target.value);
                                                setFieldValue("caturl", e.target.value?.trim().replace(/\s/g, "-").toLocaleLowerCase());
                                            }} />
                                        </div>
                                        <div className="w-full">
                                            <label className="font-bold text-text-color text-xs block mb-2">
                                                Alice
                                            </label>
                                            <Field name="caturl" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                                        <div className="w-full">
                                            <label className="font-bold text-text-color text-xs block mb-2">
                                                Cat Id
                                            </label>
                                            <Field name="_id" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                        </div>
                                        <div className="w-full">
                                            <label className="font-bold text-text-color text-xs block mb-2">
                                                Created At
                                            </label>
                                            <Field name="createdAt" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
                                <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Category Status</div>
                                <div className="font-bold text-sm mt-4">Service Category - {singleServiceData.name}'s - current Status is {singleServiceData.catstatus ? <Tag severity="success" value="Active"></Tag> : <Tag severity="warning" value="Inactive"></Tag>}</div>
                                <div className="text-gray-dark text-xs mt-4">Please Note: Admin can update the status any time.</div>
                                <div className="text-gray-dark text-xs mb-4 mt-2">(To update the status please click on update status button)</div>
                                <div className="mb-4">
                                    <InputSwitch checked={values.catstatus} name="catstatus" onChange={(e) => {
                                        setFieldValue("catstatus", e.value)
                                    }} />
                                </div>
                                {errors.name && touched.name ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.name}</div> : null}
                                <button
                                    className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={!dirty || !isValid}
                                >{isLoading ? 'Please wait...' : 'Update'}</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik></> : <Rectangle />}
        </AdminWarpper>
    )
}
