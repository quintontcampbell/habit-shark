import React from "react"
import HabitDelete from "./HabitDelete"

const HabitTile = ({ habit }) => {
  return (
      <li>
        {habit.name}
        <HabitDelete habit={habit}/>
      </li>
  )
}

export default HabitTile