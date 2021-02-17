import React, { useState, useEffect } from "react"
import HabitTile from "./HabitTile"

const HabitIndex = props => {
  const [habits, setHabits] = useState([])

  const getHabits = async() => {
    try {
      const response = await fetch(`/api/v1/habits`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
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
    return (
        <HabitTile
          key={habit.id}
          habit={habit}
          user={props.user}
        />
    )
  })

  return (
    <ul className="callout small success">
      <h2>Tracked Habits</h2>
      {habitItems}
    </ul>
  )
}

export default HabitIndex