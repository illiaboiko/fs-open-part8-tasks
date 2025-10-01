import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { useState } from 'react'


const App = () => {

  const [notification, setNotification] = useState(null)
  const notify = (message, type) => {
   setNotification({message, type}) 
   setTimeout(() => {
    setNotification(null) 
   }, 3000);
  }
  

  return (
    <Router>
      <div>
        <div style={{display: "flex", gap: 5}}>
          <Link to="/authors">authors</Link>
          <Link to="/books">books</Link>
          <Notification notification={notification} />
        </div>
        <Routes>
          <Route path="/authors" element={<Authors notify={notify} />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/new" element={<NewBook />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
