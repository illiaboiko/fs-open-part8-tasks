import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../graphql/queries/book'
import BookFilter from './BookFilter'
import { useState } from 'react'

const Books = () => {
  const [filter, setFilter] = useState('')
  console.log('filter state', filter)
  const { data: allBooksForGenresFilter } = useQuery(ALL_BOOKS)
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  if (error) {
    return (
      <>
        <p>{`${error.message}`}</p>
        <p>{`${error.stack}`}</p>
      </>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <BookFilter
        allBooks={allBooksForGenresFilter?.allBooks}
        filter={filter}
        changeFilter={(f) => setFilter(f)}
      />
      {loading ? (
        <p>Loading books ...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Books
