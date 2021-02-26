import React, { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const HabitForm = () => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: ""
  })

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const postHabit = async (newHabit) => {
    try {
      const response = await fetch(`/api/v1/habits`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newHabit)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        }
        else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      }
      else {
        setErrors([])
        setShouldRedirect(true)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

   if (shouldRedirect) {
    return <Redirect to="/habits" />
  }

  const handleSubmit = event => {
    event.preventDefault()
    postHabit(newHabit)
  }

  const handleInputChange = event => {
    setNewHabit({
      ...name,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = event => {
    event.preventDefault()
    setErrors([])
    setNewHabit({
      name: ""
    })
  }

  return (
    <div className= "callout">
      <div className="callout small primary">
        <h3>Track New Habit</h3>
      </div>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="swim faster"
            onChange={handleInputChange}
            value={newHabit.name}
            ref={inputRef}>
          </input>
        </label>
        <div className="button-group">
          <button className="button" type="submit">Submit</button>
          <button className="button" onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  )

}

export default HabitForm