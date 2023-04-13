import { mdiAccount, mdiBallotOutline, mdiCloudUpload, mdiLibraryShelves, mdiMail, mdiPlus, mdiTrashCan, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useRef, useState } from 'react'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import BaseDivider from '../../components/BaseDivider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { editProduct, getProduct, upload } from '../../hooks/requests'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { Product, ProductAdd } from '../../interfaces'
import { useAppSelector } from '../../stores/hooks'
import MultiImageSelect from '../../components/ImageSelect'
import SectionTitle from '../../components/SectionTitle'
import FormFilePicker from '../../components/FormFilePicker'
import NotificationBar from '../../components/NotificationBar'
import OverlayLayer from '../../components/OverlayLayer'
import Spinner from '../../components/spinner'
import { useDispatch } from 'react-redux'
import { setEditProduct } from '../../stores/mainSlice'

const EditProduct = () => {
    const router = useRouter()
    const { id } = router.query
    const editProductD = useAppSelector((state) => state.main.editProduct)
    //const [productD, setproduct] = useState<Product>(editProductD)
    const [images, setimages] = useState<any[]>(editProductD.images)
    const dispatch = useDispatch();
    /* let tempProduct = {}

    useEffect(()=>{
        getProduct(String(id)).then((resp)=>{
            console.log(resp)
            const product: Product = {
                name: resp.name,
                description: resp.description,
                tables: resp.tables,
                images: resp.images,
                status: resp.status,
                id: resp.id
            }
        })
    },[]) */


    const [loading, setloading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [done, setDone] = useState(false)
    const [error, setError] = useState(false)


    let product: Product = {
        name: editProductD.name,
        description: editProductD.description,
        tables: editProductD.tables,
        images: editProductD.images,
        status: editProductD.status,
        id: editProductD.id
    }

    const productEmpty: Product = {
        name: '',
        description: '',
        tables: [],
        images: [],
        status: '',
        id: ''
    }

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    function handleReset() {
        setSelectedImages([])
        setimages([])
        dispatch(setEditProduct(productEmpty))
        product = productEmpty
        setError(false)
        setSuccess(false)
    }

    function handleEditSubmit(values, { resetForm }) {
        setloading(true)
        let uploadedimages = []
        const FinalImages = [...images]
        console.log(values)
        if (selectedImages.length > 0) {
            console.log("here")
            const data = new FormData();
            selectedImages.forEach((file, i) => {
                data.append(`files`, file, file.name);
            });
            console.log(data)
            upload(data).then((resp) => {
                console.log(resp)
                uploadedimages = [...resp]
                //console.log("uploaded:"+ uploadedimages)
                console.log("before concat" + FinalImages)
                const concated = FinalImages.concat(uploadedimages)
                console.log(concated)
                const editable = {
                    id: values.id,
                    name: values.name,
                    tables: values.tables,
                    description: values.description,
                    images: concated,
                    status: values.status,
                }
                editProduct(editable.id, editable).then((response) => {
                    console.log(response)
                    resetForm()
                    handleReset()
                    setSuccess(true)
                    setError(false)
                    setloading(false)
                    setDone(true)
                    //router.push("/products")
                }).catch((err) => {
                    setSuccess(false)
                    setError(true)
                    setloading(false)
                })
            })
        }
        else {
            const editable = {
                id: values.id,
                name: values.name,
                tables: values.tables,
                description: values.description,
                images: FinalImages,
                status: values.status,
            }
            editProduct(editable.id, editable).then((response) => {
                console.log(response)
                resetForm()
                handleReset()
                setSuccess(true)
                
                setError(false)
                setloading(false)
                setDone(true)
                //router.push("/products")
            }).catch((err) => {
                setSuccess(false)
                setError(true)
                setloading(false)

            })
        }
    }

    function handlePresentImgRemove(index: number) {
        const tempPR = [...images];
        console.log(index)
        if (tempPR.length === 1) {
            tempPR.pop()
        }
        else {
            tempPR.splice(index, index)
        }

        console.log(tempPR)
        setimages(tempPR)

    }

    function handleAllimagesRemove(){
        setimages([])
    }

    function handleGo(){
        setSuccess(false) 
        router.push('/products')
    }


    return (
        <>
            <Head>
                <title>{getPageTitle('NewProduct')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title={`Editing ${product.name}`} main>
                    {/* <BaseButton
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          /> */}
                </SectionTitleLineWithButton>

                {loading && (
                    <OverlayLayer onClick={() => console.log("close")}>
                        <Spinner />
                    </OverlayLayer>
                )}
                {success && (
                    <NotificationBar
                        color="success"
                        icon={mdiCloudUpload}
                        button={
                            <BaseButton
                                color="info"
                                label="Products"
                                roundedFull
                                small
                                onClick={handleGo}
                            />
                        }>
                        <b>Edit Product Success.</b>
                    </NotificationBar>
                )}

                {error && (
                    <NotificationBar
                        color="danger"
                        icon={mdiCloudUpload}
                        button={
                            <BaseButton
                                color={'white'}
                                label="close"
                                roundedFull
                                small
                                onClick={() => { setError(false) }}
                            />
                        }>
                        <b>Edit Product Returned with Error.</b>
                    </NotificationBar>
                )}

                {!done && (

                
                <CardBox>
                    <Formik
                        initialValues={{

                            id: product.id,
                            name: product.name,
                            tables: product.tables,
                            description: product.description,
                            images: product.images,
                            status: product.status,

                        }}
                        onSubmit={handleEditSubmit}
                        onReset={handleReset}
                    >
                        <Form>
                            <FormField label="Name" icons={[mdiLibraryShelves]}>
                                <Field name="name" placeholder="Name" />

                            </FormField>



                            <FormField label="Discription" hasTextareaHeight>
                                <Field name="description" as="textarea" placeholder="description" />
                            </FormField>

                            <BaseDivider />

                            <FormField label="Attached Tables">
                                <FormCheckRadioGroup>
                                    <FormCheckRadio type="checkbox" label="Table 1">
                                        <Field type="checkbox" name="tables" value="Table 1" />
                                    </FormCheckRadio>
                                    <FormCheckRadio type="checkbox" label="Table 2">
                                        <Field type="checkbox" name="tables" value="Table 2" />
                                    </FormCheckRadio>
                                    <FormCheckRadio type="checkbox" label="Table 3">
                                        <Field type="checkbox" name="tables" value="Table 3" />
                                    </FormCheckRadio>
                                </FormCheckRadioGroup>
                            </FormField>

                            <BaseDivider />

                            {/* <FormField label='Images Present' isBorderless> */}
                                {images.length >= 0 && (
                                    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Images List</h5>
                                        <div onClick={handleAllimagesRemove} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            Remove all
                                        </div>
                                   </div>
                                   <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {images.map((image, index) => (
                                            <li key={index} className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={image} alt={image} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {image}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        <BaseButton
                                                            color="danger"
                                                            icon={mdiTrashCan}
                                                            onClick={() => { handlePresentImgRemove(index) }}
                                                            small
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                    </div>

                                )}

                            {/* </FormField> */}
                            <BaseDivider />

                            <FormField label="Add Images">

                                <FormFilePicker
                                    label="Upload"
                                    color="info"
                                    icon={mdiUpload}
                                    selectedImages={selectedImages}
                                    handleImageSelect={handleImageSelect}
                                    handleRemoveImage={handleRemoveImage} />
                            </FormField>





                            <BaseButtons>
                                <BaseButton type="submit" color="success" label="Submit" />
                                <BaseButton type="reset" color="info" outline label="Reset"/>
                            </BaseButtons>


                        </Form>
                    </Formik>
                </CardBox>
                )}
            </SectionMain>
        </>
    )
}

EditProduct.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default EditProduct
