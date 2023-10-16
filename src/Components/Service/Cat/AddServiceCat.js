import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../../../Context/User/UserContext';

const catSchema = Yup.object().shape({
    name: Yup.string()
        .required('Category name can not be blank'),
});

export default function AddServiceCat({addServiceCat}) {
    const { isLoading } = useUserContext()
    return (
        <Formik
            initialValues={{
                name: '',
                caturl: '',
            }}
            validationSchema={catSchema}
            onSubmit={values => {
                addServiceCat(values)
            }}
        >
            {({ errors, touched, setFieldValue, isValid, dirty }) => (
                <Form>
                    <div className="flex flex-col w-full mb-4">
                        <label className="font-bold text-text-color text-xs block mb-2">
                            Service Name
                        </label>
                        <Field name="name" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" onChange={(e) => {
                            setFieldValue("name", e.target.value);
                            setFieldValue("caturl", e.target.value?.trim().replace(/\s/g, "-").toLocaleLowerCase());
                        }} />
                    </div>
                    <div className="flex flex-col w-full mb-4">
                        <label className="font-bold text-text-color text-xs block mb-2">
                            Service Alice (auto generated)
                        </label>
                        <Field name="caturl" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" disabled />
                    </div>
                    {errors.name && touched.name ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.name}</div> : null}
                    <button
                        className="rounded bg-active-color text-white w-full py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={!dirty || !isValid}
                    >{isLoading ? 'Please wait...' : 'Add'}</button>
                </Form>
            )}
        </Formik>
    )
}
