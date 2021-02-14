import express from "express"
import objection from "objection"

import { Habit } from "../../../models/index.js"

const habitsRouter = new express.Router()

// habitsRouter.get("/", async (req, res) => {
//   try {
//     const habits = await Habit.query()
//     res.status(200).json({ habits })
//   } catch(error) {
//     res.status(500).json({ error })
//   }
// })

habitsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const { name } = body
    const newHabit = await Habit.query().insertAndFetch({ name })
    return res.status(201).json({ habit: newHabit})
  } catch(error) {
    return res.status(500).json({ error: error })
  }
})

export default habitsRouter