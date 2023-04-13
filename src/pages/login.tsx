import React, { useEffect } from 'react'
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import axios from 'axios';

export default function Error() {
  const router = useRouter()

  useEffect(() => {
    // Update the document title using the browser API
    if(hasCookie("jwt")){
      router.push('/')
    }
  });

  

function handleSubmit(values: { login: string; password: string; remember: boolean; }) {
  axios.post('http://localhost:8002/login', {
    "username": values.login,
    "password": values.password
  }, {withCredentials: true})
  .then(function (response) {
    if (response.status == 200){
      
      console.log(response)
      //const token = response.headers['Set-Cookie']
      //setCookie('jwt', token);
      router.push('/')
    }
    else {
      // Set the JWT cookie
      
      console.log('Login failed');
      // Redirect to the home page or other authenticated page
      //router.push('/dashboard')
    }

  })
  .catch(function (error) {
    console.log(error);
  });
  
}

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik
            initialValues={{ login: '', password: '', remember: true }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label="Login" help="Please enter your login">
                <Field  name="login" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>

             <FormCheckRadio type="checkbox" label="Remember">
                <Field type="checkbox" name="remember" />
              </FormCheckRadio>
 
              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Login" color="info" />
                
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
