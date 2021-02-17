import React from "react"
import HabitDelete from "./HabitDelete"

const HabitTile = ({ habit }) => {
  return (
    <div className="button-group">
      <h3>
        {habit.name}
      </h3>
      <div>
        <HabitDelete habit={habit}/>
      </div>
    </div>
  )
}

export default HabitTile