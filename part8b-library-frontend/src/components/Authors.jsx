import { useQuery } from "@apollo/client/react"
import SetBirthYear from "./SetBirthYear"
import { ALL_AUTHORS } from "../graphql/queries/author"

const Authors = ({notify}) => {
  const { loading, data, error } = useQuery(ALL_AUTHORS)

  if (loading) return <p>loading data</p>

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
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <SetBirthYear authors={data.allAuthors} notify={notify} />
    </div>
  )
}

export default Authors
