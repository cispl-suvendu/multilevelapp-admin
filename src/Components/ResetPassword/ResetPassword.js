import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useUserContext } from "../../Context/User/UserContext";
import { useLocation, useParams } from 'react-router';


const SignupSchema = Yup.object().shape({
    password: Yup.string().min('6').max('12').required('Password Required')
});

export default function ResetPassword({ title, initialValues, handleSubmit }) {
    const { isLoading } = useUserContext()
    const {token} = useParams()
    const location = useLocation()
    let page_Type;
    function getPageType() {
        if(location.pathname.includes("admin")) {
            page_Type = "admin"
        } else if(location.pathname.includes("vendor")) {
            page_Type = "vendor"
        } else if(location.pathname.includes("customer")) {
            page_Type = "customer"
        } else {
            page_Type = undefined
        }
        return page_Type
    }
    const CURRENT_PAGE_TYPE = getPageType()
    return (
        <section className="bg-gray-light2 min-h-screen flex justify-center items-center">
            <div className="md:w-2/5 w-10/12">
                <div className="bg-white-color p-6 rounded-md shadow-sm hover:shadow-md border">
                    <h1 className="mt-3 text-3xl font-bold capitalize">{title}</h1>
                    <div className="pt-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                handleSubmit({...values, token, CURRENT_PAGE_TYPE});
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {errors.email && touched.email ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.email}</div> : null}
                                    <label className="block mb-4">
                                        <span className="block text-md font-medium text-slate-400 mb-1">Password</span>
                                        <Field name="password" type="password" className="border w-full py-2 px-3 rounded h-12" placeholder="password" />
                                    </label>
                                    <button className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color" type="submit" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Send'}</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}
