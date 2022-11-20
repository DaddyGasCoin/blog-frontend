import { useState } from 'react'
import DisplayHeader from './components/DisplayHeader'
import DisplayPostList from './components/DisplayPostList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse py-1 px-1">
        <DisplayHeader />
      </div>
      <DisplayPostList />

    </div>
  )
}

export default App
