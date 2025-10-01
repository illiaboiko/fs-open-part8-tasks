import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../graphql/queries/book'

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <p>loading data...</p>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
