import React from 'react'
import {Toaster} from 'sonner'

const Layout = ({children}) => {
  return (
    <div>{children}
    <Toaster richColors/>
    </div>
  )
}

export default Layout

