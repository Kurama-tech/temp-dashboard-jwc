import React, { useEffect } from 'react'
import { deleteCookie} from 'cookies-next';
import type { ReactElement } from 'react'
import { useRouter } from 'next/router';
import LayoutGuest from '../layouts/Guest';

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Update the document title using the browser API
    deleteCookie("jwt")
    router.push('/login')
  });

  return (
    <>
     
    </>
  )
}

Logout.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
