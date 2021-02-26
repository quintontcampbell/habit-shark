import React from "react"
import { useHistory } from "react-router-dom"

const HabitDelete = ({ habit }) => {
  const history = useHistory()

  const deleteHabit = async (habitPayload) => {
    try {
      const response = await fetch(`/api/v1/habits`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(habitPayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const onClickHandler = event => {
    event.preventDefault()
    deleteHabit(habit)
    history.go(0)
  }

  return <button className="button alert" onClick={onClickHandler}>Delete Habit</button>
}

export default HabitDelete