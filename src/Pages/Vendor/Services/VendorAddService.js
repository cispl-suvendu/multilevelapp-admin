import { useEffect, useState } from "react"
import VendorWrapper from "../../../Components/Layout/Vendor/VendorWrapper"
import { useRootContext } from "../../../Context/Root/RootContext"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from "../../../Context/User/UserContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploading from 'react-images-uploading';
import { BsCloudUploadFill } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { MdRemoveCircleOutline } from 'react-icons/md';




const serviceSchema = Yup.object().shape({
  name: Yup.string()
    .required('Service name can not be blank'),
  catId: Yup.string()
    .required('Please add a category'),
  cost: Yup.string()
    .required('Service cost is requir'),
});

export default function VendorAddService() {
  const { allServiceCat, setAllServiceCat, fetchAllServices, handleAddService } = useRootContext()
  const { isLoading } = useUserContext()
  useEffect(() => {
    fetchAllServices()
    return () => setAllServiceCat([])
  }, [])

  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const handleImageUpload = (imageList, addUpdateIndex) => {
    //console.log("imageList", imageList, "addUpdateIndex", addUpdateIndex);
    setImages(imageList);
  };


  return (
    <VendorWrapper>
      <div className="mb-6">
        <h1 className="text-md font-bold">Add Service</h1>
      </div>
      <Formik
        initialValues={{
          name: '',
          catId: '',
          cost: '',
        }}
        validationSchema={serviceSchema}
        onSubmit={values => {
          handleAddService({ ...values, images, description })
        }}
      >
        {({ errors, touched, setFieldValue, isValid, dirty }) => (
          <Form>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-2/3 text-text-color">
                <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Service Details</div>
                <div className="my-6">
                  <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
                    <div className="w-full">
                      <label className="font-bold text-text-color text-xs block mb-2">
                        Name
                      </label>
                      <Field name="name" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" placeholder="Water Purifier" />
                    </div>
                    <div className="w-full">
                      <label className="font-bold text-text-color text-xs block mb-2">
                        Cost
                      </label>
                      <div className="relative">
                        <Field name="cost" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark" placeholder="125" />
                        <span className="absolute right-[2px] top-[4%] bg-gray-light2 text-text-color font-bold text-xs px-4 h-[90%] rounded-md flex items-center">(&#8377;) per hour</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-4">
                    <label className="font-bold text-text-color text-xs block mb-2">
                      Description
                    </label>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
                  </div>
                  <div className="w-full mb-4">
                    <label className="font-bold text-text-color text-xs block mb-2">
                      Image (max limit 5)
                    </label>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={handleImageUpload}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <div
                            onClick={onImageUpload}
                            {...dragProps}
                            className={`w-full border-2 border-dashed border-gray-light3  rounded h-20 cursor-pointer flex items-center justify-center text-xs ${isDragging ? 'bg-[rgba(0,159,255,.1)] border-active-color' : 'bg-gray-light2'} hover:bg-[rgba(0,159,255,.1)] hover:border-active-color`}
                          >
                            <BsCloudUploadFill className="text-xl mr-2" /> Click or Drop here
                          </div>
                          <div className="flex gap-4 my-4 flex-wrap">
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <div className="border flex items-center justify-center p-4 rounded border-gray-light3">
                                  <img src={image['data_url']} alt="" width="80" className="h-14 w-auto" />
                                </div>
                                <div className="flex justify-between p-2 text-md border border-gray-light3 rounded mt-2">
                                  <div onClick={() => onImageUpdate(index)} className="text-[green] cursor-pointer"><BiEdit /></div>
                                  <div onClick={() => onImageRemove(index)} className="text-error-color cursor-pointer"><MdRemoveCircleOutline /></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {imageList.length > 0 && <div onClick={onImageRemoveAll} className="flex items-center cursor-pointer font-bold text-xs hover:text-error-color"><MdRemoveCircleOutline className="text-error-color text-md mr-1" /> Remove all images</div>}
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                </div>
              </div>
              <div className="bg-white-color rounded-md shadow-md p-4 w-full md:w-1/3 text-text-color">
                <div className="font-bold text-sm border-b border-gray-light3 pb-2 mb-2">Category Details</div>
                <div className="my-6">
                  <div className="w-full">
                    <label className="font-bold text-text-color text-xs block mb-2">
                      Category
                    </label>
                    <Field as="select" name="catId" className="h-10 border border-gray-light3 w-full px-2 text-sm rounded-md text-gray-dark">
                      <option value="">--Select Category--</option>
                      {allServiceCat.filter(cat => cat.catstatus === true).map((cat => {
                        return <option key={cat._id} value={cat._id}>{cat.name}</option>
                      }))}
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-6 w-full">
              {errors.name && touched.name ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.name}</div> : null}
              {errors.catId && touched.catId ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.catId}</div> : null}
              {errors.cost && touched.cost ? <div className="bg-error-color px-4 py-1 text-white-color text-sm font-bold my-2 rounded-sm capitalize">{errors.cost}</div> : null}
              <button
                className="rounded bg-active-color text-white px-12 py-3 font-bold text-white-color disabled:bg-gray-light3 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >{isLoading ? 'Please wait...' : 'Add'}</button>
            </div>
          </Form>
        )}
      </Formik>
    </VendorWrapper>
  )
}
