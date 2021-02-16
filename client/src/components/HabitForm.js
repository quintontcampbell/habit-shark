import React, { useState } from 'react'
import { Redirect } from "react-router-dom"

const HabitForm = props => {

  const [newHabit, setNewHabit] = useState({
    name: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      else {
        setShouldRedirect(true)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

   if (shouldRedirect) {
    return <Redirect to="/habits" />
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