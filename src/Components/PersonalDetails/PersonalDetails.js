import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export default function PersonalDetails({ data }) {
    const dateTemplete = moment(data?.createdAt).format("D MMM YYYY")
    return (
        <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/2 text-text-color">
            <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Personal Details</div>
            <Formik
                initialValues={{
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    email: data?.email,
                    role: data?.role,
                    _id: data?._id,
                    createdAt:dateTemplete ,
                }}
                validationSchema={SignupSchema}
                enableReinitialize={true}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="my-6">
                        {errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                        ) : null}
                        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    First Name
                                </label>
                                <Field name="firstName" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" />
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    Last Name
                                </label>
                                <Field name="lastName" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    Email
                                </label>
                                <Field name="email" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    Role
                                </label>
                                <Field name="role" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    User Id
                                </label>
                                <Field name="_id" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-text-color text-xs block mb-2">
                                    Join Date
                                </label>
                                <Field name="createdAt" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled/>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
