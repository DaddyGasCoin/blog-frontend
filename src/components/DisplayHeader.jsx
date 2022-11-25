import { Button } from 'antd';
import { Outlet } from "react-router-dom";

const DisplayHeader = () => {
   return (
      <>
         <div className="flex flex-row-reverse py-1 px-1">
            <div className="flex flex-row-reverse py-1 px-1">
               <Button type="text" size='large'>Login</Button>
               <Button type="text" size='large'>Sign-Up</Button>
            </div>
         </div>
         <Outlet />
      </>

   )
}

export default DisplayHeader