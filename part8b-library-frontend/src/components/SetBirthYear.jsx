import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR } from '../graphql/mutations/author'

const SetBirthYear = ({notify}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR)

  const hadnleSubmit = (e) => {
    e.preventDefault()
    console.log('name before udpate', name)
    console.log('born before update', born)

    updateAuthor({ variables: { name: name, born: parseInt(born) } })
    // mutation here
    setName('')
    setBorn('')

    //updating cache here
  }

  useEffect(() => {
    if (result.error) {
      console.log('iside use effect')
      notify('author not found', 'ERROR')
    }
  }, [result.error])

  return (
    <div>
      <h2>Set author's birth year</h2>
      <form method="post">
        <div>
          <label htmlFor="name">name</label>
          <input
          value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
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
        <button type="submit" onClick={hadnleSubmit}>
          update
        </button>
      </form>
    </div>
  )
}

export default SetBirthYear
