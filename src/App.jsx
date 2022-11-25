import { useState } from 'react'
import DisplayHeader from './components/DisplayHeader'
import DisplayPostList from './components/DisplayPostList'
import DisplayPost from './components/DisplayPost';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <div className="flex flex-col">
        <Routes>
          <Route path='/' element={<DisplayHeader />}>
            <Route path='/' element={<DisplayPostList />} />
            <Route path='/posts'>
              <Route path=":Id" element={<DisplayPost />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}
{/* <div className="flex flex-col">
  <div className="flex flex-row-reverse py-1 px-1">
    <DisplayHeader />
  </div>
  <DisplayPostList />
</div> */}

export default App
