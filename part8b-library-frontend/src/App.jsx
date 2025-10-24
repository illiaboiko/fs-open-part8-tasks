import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client/react'
import RecommendedView from './components/RecommendedView'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [notification, setNotification] = useState(null)
  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const [token, setToken] = useState(undefined)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.removeItem('books-user-token')
    client.resetStore()
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('books-user-token')
    setToken(savedToken)
  }, [])

  if (token === undefined) return null

  return (
    <Router>
      <div>
        <div style={{ display: 'flex', gap: 5 }}>
          <Link to="/authors">
            <button>authors</button>
          </Link>
          <Link to="/books">
            <button>books</button>
          </Link>
          {token ? (
            <>
              <Link to="/books/new">
                <button>New Book</button>
              </Link>
              <Link to="/recommended">
                <button>Recommended</button>
              </Link>
              <Link onClick={logout}>
                <button>Log out</button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button>Log In</button>
            </Link>
          )}

          <Notification notification={notification} />
        </div>
        <Routes>
          <Route path="/authors" element={<Authors notify={notify} />}></Route>
          <Route path="/books" element={<Books notify={notify} />}></Route>
          <Route
            path="/books/new"
            element={<NewBook setNotification={notify} token={token} />}
          ></Route>
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setNotification={notify} />}
          ></Route>
          <Route
            path="/recommended"
            element={<RecommendedView token={token} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
