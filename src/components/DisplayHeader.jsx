import { Button, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

const DisplayHeader = () => {


   const [user, setUser] = useState(false)

   //Clear token info from session/local stoarge to logout
   const logout = () => {
      const token = sessionStorage.getItem('token_info')
      if (token) {
         sessionStorage.removeItem('token_info')
      }
      else {
         localStorage.removeItem('token_info')
      }
      document.location.href = '/'

   }
   const items = [
      {
         key: '1',
         label: (
            <a onClick={logout} >
               Logout
            </a>
         ),
      }
   ];

   useEffect(() => {
      //TOKEN contains usersname and JWT for authentication
      //Check for user token in localstorage else session storage
      let token = localStorage.getItem('token_info')
      if (!token) {
         token = sessionStorage.getItem('token_info')
      }
      if (token) {
         //If token exists;check if expired
         //If expired clear from storage;user must login again
         //JWT expires after 24 hours
         token = JSON.parse(token)
         if (parseInt(token.expiration) > Math.floor(new Date().getTime() / 1000.0))
            setUser(token.username)

         //Token not expired
         else {
            localStorage.clear()
         }
      }

   })
   return (
      <>
         <div className="flex flex-row-reverse py-1 px-1">
            <div className="flex flex-row-reverse py-1 px-1">
               {user ?
                  <Dropdown
                     menu={{
                        items,
                     }}
                     placement='bottomLeft'
                  >
                     <Button type="text" size='large'>{user}</Button>
                  </Dropdown>
                  :
                  <Button type="text" size='large' href='/login'>
                     Login
                  </Button>
               }
               <Button type="text" size='large' href='/signup'>Sign-Up</Button>
            </div>
         </div>
         <Outlet />
      </>

   )
}

export default DisplayHeader