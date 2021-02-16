import React, { useState } from 'react'
import ErrorList from "./ErrorList.js"
import translateServerErrors from "../services/translateServerErrors.js"

const HabitForm = props => {
  const [errors, setErrors] = useState([])
  const [newHabit, setNewHabit] = useState({
    name: ""
  })

  const postHabit = async (newHabitData) => {
    try {
      const response = await fetch(`/api/v1/habits`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newHabitData)
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
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const resetFields = () => {
    setNewHabit({
      name: ""
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    postHabit(newHabit)
    resetFields()
  }

  const handleInputChange = event => {
    setNewHabit({
      ...name,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = event => {
    event.preventDefault()
    resetFields()
  }

  return (
    <div className= "callout">
      <h3>Track New Habit</h3>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newHabit.name}>
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