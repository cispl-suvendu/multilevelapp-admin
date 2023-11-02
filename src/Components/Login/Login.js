import { FcGoogle } from "react-icons/fc"
import { BiArrowBack } from "react-icons/bi";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useLocation } from "react-router-dom"
import { useUserContext } from "../../Context/User/UserContext";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min('6').max('12').required('Password Required')
});

export default function Login({ title, initialValues, handleSubmit, signUpLink, socialLogin, forgotPasswordLink }) {
    const { isLoading, loadingIcon } = useUserContext()
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
                <div className="bg-white-color p-6 rounded shadow-sm hover:shadow-md">
                <div className="flex justify-between item-center my-3">
                        <h1 className="text-3xl font-bold capitalize">{title}</h1>
                        <Link to={"/"} className="flex items-center gap-1 hover:text-active-color"><BiArrowBack /> Back</Link>
                    </div>
                    {socialLogin !== '' ?
                        <>
                            <div className="my-6">
                                <div className="bg-white p-4 rounded-md shadow-sm hover:border-active-color border cursor-pointer hover:text-active-color">
                                    <div className="flex justify-center items-center gap-3">
                                        <FcGoogle className="text-2xl" />
                                        <span className="capitalize">Login with Google</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-8">
                                <div className="border-b-2 border-gray-light-3 flex-1"></div>
                                <div className="px-4">OR</div>
                                <div className="border-b-2 border-gray-light-3 flex-1"></div>
                            </div>
                        </>
                        : null}
                    <div className="pt-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                handleSubmit({...values, CURRENT_PAGE_TYPE});
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {errors.email && touched.email ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.email}</div> : null}
                                    {errors.password && touched.password ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.password}</div> : null}
                                    <label className="block mb-4">
                                        <span className="block text-md font-medium text-slate-400 mb-1">Email</span>
                                        <Field name="email" className="border w-full py-2 px-3 rounded h-12" placeholder="Email" type="email" />
                                    </label>
                                    <label className="block mb-4">
                                        <span className="block text-md font-medium text-slate-400 mb-1">Password</span>
                                        <Field name="password" type="password" className="border w-full py-2 px-3 rounded h-12" placeholder="Password" />
                                    </label>
                                    <button className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:cursor-not-allowed disabled:py-0" type="submit" disabled={isLoading}>{isLoading ? loadingIcon : 'Sign in to your account'}</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="py-4 flex flex-col md:flex-row items-center justify-between">
                        <div><Link to={forgotPasswordLink} className="text-active-color underline hover:text-text-color">Forgot Password!</Link></div>
                        {signUpLink !== '' ?
                            <div>Don't have an account, <Link to={signUpLink} className="text-active-color underline hover:text-text-color">Signup here!</Link></div> : null}
                    </div>

                </div>
            </div>
        </section>
    )
}
