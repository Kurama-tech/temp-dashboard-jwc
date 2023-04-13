import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/SectionMain'
import { StyleKey } from '../interfaces'
import { gradientBgPurplePink } from '../colors'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode, setStyle } from '../stores/styleSlice'
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { setUser } from '../stores/mainSlice'

const StyleSelect = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const styles: StyleKey[] = ['white', 'basic']

  const router = useRouter()

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(setStyle(styles[1]))
    router.push('/dashboard')
  
  });



  /* const handleStylePick = (e: React.MouseEvent, style: StyleKey) => {
    e.preventDefault()

    dispatch(setStyle(styles[1]))

    router.push('/dashboard')
  } */

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      {/* <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
        <SectionMain>
          <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
            Pick a style&hellip;
          </h1>
          <h2 className="text-xl md:text-xl text-center text-white mb-12">
            Style switching with a single{' '}
            <code className="px-1.5 py-0.5 rounded bg-white bg-opacity-20">action()</code>
          </h2>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 max-w-6xl mx-auto">
            {styles.map((style) => (
              <CardBox
                key={style}
                className="cursor-pointer bg-gray-50"
                isHoverable
                onClick={(e) => handleStylePick(e, style)}
              >
                <div className="mb-3 md:mb-6">
                  <Image
                    src={`https://static.justboil.me/templates/one/small/${style}-v3.png`}
                    width={1280}
                    height={720}
                    alt={style}
                  />
                </div>
                <h1 className="text-xl md:text-2xl font-black capitalize">{style}</h1>
                <h2 className="text-lg md:text-xl">& Dark mode</h2>
              </CardBox>
            ))}
          </div>
        </SectionMain>
      </div> */}
    </>
  )
}

StyleSelect.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default StyleSelect
