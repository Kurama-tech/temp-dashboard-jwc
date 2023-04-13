import { mdiAccount, mdiBallotOutline, mdiLibraryShelves, mdiMail, mdiMonitorCellphone, mdiPlus, mdiUpload, mdiCloudUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useRef, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import { Router, useRouter } from 'next/router'
import { addProduct, getProduct, upload } from '../hooks/requests'
import FormCheckRadio from '../components/FormCheckRadio'
import FormCheckRadioGroup from '../components/FormCheckRadioGroup'
import { Product, ProductAdd } from '../interfaces'
import { useAppSelector } from '../stores/hooks'
import MultiImageSelect from '../components/ImageSelect'
import SectionTitle from '../components/SectionTitle'
import FormFilePicker from '../components/FormFilePicker'
import OverlayLayer from '../components/OverlayLayer'
import Spinner from '../components/spinner'
import NotificationBar from '../components/NotificationBar'

const EditProduct = () => {

    const router = useRouter()
    
    //const [product, setproduct] = useState<ProductAdd>()
    const [loading, setloading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)


    const product : ProductAdd = {
        name: '', description: '', tables: []
    }

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  function handleReset(){
    setSelectedImages([])
    setError(false)
    setSuccess(false)
  }



    function handleEditSubmit(values, {resetForm}) {
        setloading(true)
        console.log(values)
        const data = new FormData();
        selectedImages.forEach((file, i) => {
            data.append(`files`, file, file.name);
          });
        upload(data).then((resp) => {
            console.log(resp)
            const product = {
                name: values.name,
                tables: values.tables,
                description: values.description,
                images: resp,
                status: 'active'
            }
            addProduct(product).then((response) => {
                console.log(response)
                resetForm()
                handleReset()
                setSuccess(true)
                setError(false)
                setloading(false)
            }).catch((err)=>{
                setSuccess(false)
                setError(true)
                setloading(false)
            })
        }).catch((err)=>{
            setSuccess(false)
            setError(true)
            setloading(false)
        })
        //setloading(false)
    }

   

    return (
        <>
            <Head>
                <title>{getPageTitle('NewProduct')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title={`Add New Product`} main>
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
                    <OverlayLayer onClick={()=>console.log("close")}>
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
                              onClick={() => {setSuccess(false); router.push('/products')}}
                            />
                          }>
                    <b>Add Product Success.</b>
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
                              onClick={() => {setError(false)}}
                            />
                          }>
                    <b>Add Product Returned with Error.</b>
                  </NotificationBar>
                )}
                

                <CardBox>
                    <Formik
                        initialValues={product}
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

                            <FormField label="Images">
                            <FormFilePicker 
                                label="Upload" 
                                color="info"
                                accept='.png' 
                                icon={mdiUpload}
                                selectedImages={selectedImages}
                                handleImageSelect={handleImageSelect}
                                handleRemoveImage={handleRemoveImage} />
                                
                            </FormField>

                            



                            <BaseButtons>
                                <BaseButton type="submit" color="success" label="Submit" />
                                <BaseButton type="reset" color="info" outline label="Reset" onClick={() => { console.log("reset") }} />
                            </BaseButtons>


                        </Form>
                    </Formik>
                </CardBox>
            </SectionMain>
        </>
    )
}

EditProduct.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default EditProduct
