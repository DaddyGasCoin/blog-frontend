import DisplayHeader from './components/DisplayHeader'
import DisplayPostList from './components/DisplayPostList'
import DisplayPost from './components/DisplayPost';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>
      <div className="flex flex-col">
        <Routes>
          <Route path='/' element={<DisplayHeader />}>
            <Route path='/' element={<DisplayPostList />} />
            <Route path='/posts'>
              <Route path=":Id" element={<DisplayPost />} />
            </Route>
            <Route path='/login' element={<LoginForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
