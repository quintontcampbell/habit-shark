import React, { useState, useEffect } from "react"
import HabitTile from "./HabitTile.js"

const HabitIndex = props => {
  const [habits, setHabits] = useState([])

  const getHabits = async() => {
    try {
      const response = await fetch(`/api/v1/habits`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setHabits(body.habits)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getHabits()
  }, [])

  const habitItems = habits.map((habit) => {
    // debugger
    return (
      <HabitTile
        key={habit.id}
        habit={habit}
        user={props.user}
      />
    )
  })

  return (
    <div>
      <h1>Habits</h1>
      <div>{habitItems}</div>
    </div>
  )
}

export default HabitIndex