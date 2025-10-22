import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR } from '../graphql/mutations/author'

const SetBirthYear = ({ notify, authors }) => {
  const [born, setBorn] = useState('')
  const [authorSelect, setAuthorSelect] = useState(authors ? authors[0].name : '')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR)

  const handleSubmit = (e) => {
    e.preventDefault()

    updateAuthor({ variables: { name: authorSelect, born: parseInt(born) } })
  }

  useEffect(() => {
    if (result.error) {
      console.log('iside use effect')
      notify('author not found', 'ERROR')
    }
  }, [result.error])

  if(!authors) return null

  return (
    <div>
      <h2>Set author&apos;s birth year</h2>
      <form method="post">
        <div>
          <select name="authors" id="authors" value={authorSelect} onChange={(e)=> setAuthorSelect(e.target.value)}>
            {authors.map((a) => (
              <option value={a.name} key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input
            value={born}
            onChange={(e) => setBorn(e.target.value)}
            type="number"
            name="born"
            id="born"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          update
        </button>
      </form>
    </div>
  )
}

export default SetBirthYear
