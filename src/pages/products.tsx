import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBoxComponentEmpty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import TableProducts from '../components/TableProducts'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setDisabledProducts, setProducts } from '../stores/mainSlice'
import { getDisabledProducts, getProducts } from '../hooks/requests'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import TableProductsDisabled from '../components/TableProductsDis'
import OverlayLayer from '../components/OverlayLayer'
import Spinner from '../components/spinner'

const Products = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [loading, setloading] = useState(false)
    const GP = useAppSelector((state) => state.main.products)
    const GPD = useAppSelector((state) => state.main.disabled)
    function handleNewProduct(){
        
        router.push('/newproduct')
    }

    function handleLoading(val: boolean){
      setloading(val)
    }


    

  return (
    <>
      <Head>
        <title>{getPageTitle('Products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Products" main>
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

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

         
        <BaseButtons>
            <BaseButton
            color="info"
            label="New Product"
            onClick={handleNewProduct}
            />
        </BaseButtons>
        <br /> 
        <CardBox className="mb-6" hasTable>
        <TableProducts setLoading={setloading} />
        </CardBox>

        <SectionTitleLineWithButton icon={mdiTableOff} title="Disabled Products" />

        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Disabled Products.</b> Can be Bring Back to life
        </NotificationBar>

        <CardBox className="mb-6" hasTable>
          <TableProductsDisabled setLoading={setloading} />
        </CardBox>
      </SectionMain>
    </>
  )
}

Products.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Products
