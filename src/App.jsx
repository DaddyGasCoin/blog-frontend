import DisplayHeader from './components/DisplayHeader'
import DisplayPostList from './components/DisplayPostList'
import DisplayPost from './components/DisplayPost';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (

    <BrowserRouter basename="/blog-frontend">
      <div className="flex flex-col">
        <Routes>
          <Route path='/' element={<DisplayHeader />}>
            <Route path='/' element={<DisplayPostList />} />
            <Route path='/posts'>
              <Route path=":Id" element={<DisplayPost />} />
            </Route>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
