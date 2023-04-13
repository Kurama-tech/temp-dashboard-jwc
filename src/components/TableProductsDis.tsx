import { mdiEye, mdiTrashCan, mdiUpload, mdiDatabaseEyeOff, mdiDatabaseEdit, mdiAccount, mdiMail, mdiLibraryShelves, mdiWrapDisabled } from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Client, Product } from '../interfaces'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBox from './CardBox'
import CardBoxModal, { CardBoxEditModal } from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import FormCheckRadioGroup from './FormCheckRadioGroup'
import FormField from './FormField'
import UserAvatar from './UserAvatar'
import axios from 'axios';
import { deleteProduct, disableProduct, enableProduct, getDisabledProducts, getProducts } from '../hooks/requests'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setDisabledProducts, setEditProduct, setProducts } from '../stores/mainSlice'
import PillTag from './PillTag'
import MultiImageSelect from './ImageSelect'
import CardBoxComponentEmpty from './CardBoxComponentEmpty'
import { useRouter } from 'next/router'
import BaseButton from './BaseButton'

type Props = {
    setLoading: (value: boolean) => void
  }

const TableProductsDisabled = ({setLoading}:Props) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

  const productsGlobal = useAppSelector((state) => state.main.disabled)
  const prod = useRef(productsGlobal);
  //const { clients } = useSampleClients()

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [editItem, setEditItem] = useState([])
  const [products, setproducts] = useState(productsGlobal)
  const [deleteItem, setdelete] = useState("")
  const [deleteItemName, setdeleteName] = useState("")
  const [productspaginated, setproductspaginated] = useState([])
  const [makecall, setMakeCall] = useState(false)

  const productsdivided = products.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = products.length / perPage
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
      pagesList.push(i)
  }

  useEffect(() => {    
    getDisabledProducts().then((resp) => {
            setproducts(resp!=null? resp: [])
            dispatch(setDisabledProducts(resp!=null? resp: []))
    })
  }, [dispatch]);


  const handleModalAction = () => {
    setdelete("")
    setdeleteName("")
    setIsModalInfoActive(false)
  }

  const handleDeleteModalOpen = (name, id) => {
    setdelete(id)
    setdeleteName(name)
    setIsModalTrashActive(true)
  }

  const handleEnableModalOpen = (name, id) => {
    setdelete(id)
    setdeleteName(name)
    setIsModalInfoActive(true)
  }

  const handleDeleteModalClose = () => {
        setdelete("")
        setdeleteName("")
        setIsModalTrashActive(false)
  }

  const handleDeleteModalSubmit = () => {
   
    deleteProduct(deleteItem).then((resp)=>{
        setLoading(true)
        setdelete("")
        setdeleteName("")
        getDisabledProducts().then((resp) => {
            setproducts(resp!=null? resp: [])
              dispatch(setDisabledProducts(resp!=null? resp: []))
              getProducts().then((resp) => {
                    dispatch(setProducts(resp!=null? resp: []))
                    setLoading(false)
                    window.location.reload();
              })
        })
        setIsModalTrashActive(false)
    })
    
  }

  const handleEditModalOpen = (product: []) => {
    setEditItem(product)
    setIsModalInfoActive(true)
  }


  const handleEditModalSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2))
    
    setIsModalInfoActive(false)
    
  }

  function handleEnable(){

    enableProduct(deleteItem).then((resp)=>{
        setLoading(true)
        setdelete("")
        setdeleteName("")
        getDisabledProducts().then((resp) => {
            setproducts(resp!=null? resp: [])
            dispatch(setDisabledProducts(resp!=null? resp: []))
            getProducts().then((resp) => {
                  dispatch(setProducts(resp!=null? resp: []))
                  setLoading(false)
                  window.location.reload();
            })
      })
        setIsModalInfoActive(false)
    })

  }

  const handleEnlargeEdit = (client: Product) => {
    const url = "/edit/"+ client.id
    dispatch(setEditProduct(client))
    router.push(url)
  }

  return (
    <>
      <CardBoxModal
        title="Enable Items"
        buttonColor="success"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleEnable}
        onCancel={handleModalAction}
      >
        <p>
          Are you sure you want to Enable <b>{deleteItemName}</b>
        </p>
        <p><b>Brings it back to life!</b></p>
      </CardBoxModal>

      <CardBoxModal
        title="Disable Item"
        buttonColor="danger"
        buttonLabel="Confirm Delete?"
        isActive={isModalTrashActive}
        onConfirm={handleDeleteModalSubmit}
        onCancel={handleDeleteModalClose}
      >
        <p>
          Are you sure you want to delete <b>{deleteItemName}</b>
        </p>
        <p><b>This Action Cannot Be Undone!</b></p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Discription</th>
            <th>Tables Attached</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((client: Product) => (
            <tr key={client.id}>
              {/* <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td> */}
              <td data-label="Name">{client.name}</td>
              <td data-label="Discription">{client.description}</td>
              <td data-label="Tables Attached">{client.tables}</td>
              <td data-label="Status" className="lg:w-32">
                {client.status == 'active' && (
                    <PillTag
                    color="success"
                    label={client.status}
                  />
                )}
                {client.status == 'disabled' && (
                    <PillTag
                    color="danger"
                    label={client.status}
                  />
                )}
              </td>
              
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>

                <BaseButton
                    color="success"
                    icon={mdiUpload}
                    onClick={() => handleEnableModalOpen(client.name, client.id)}
                    small
                  />

                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => handleDeleteModalOpen(client.name, client.id)}
                    small
                  />
                  
                </BaseButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>

    </>
  )
}

export default TableProductsDisabled
