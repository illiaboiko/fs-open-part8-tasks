import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { CREATE_BOOK } from '../graphql/mutations/book'
import { ALL_BOOKS } from '../graphql/queries/book'

const NewBook = ({ setNotification , token}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      setNotification(error.errors[0].message, 'error')
    },
    update: (cache, response) => {
      console.log(response.data.addBook)
      cache.updateQuery({query: ALL_BOOKS, variables: {
        genre: ''
      }}, ({allBooks})=> {
        return {
          allBooks: allBooks.concat(response.data.addBook)
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: Number(published), genres },
    })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setNotification('new book added!')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!token) return <>You must be logged in to add new book</>

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
