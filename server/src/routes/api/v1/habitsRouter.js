import express from "express"
import objection, { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

import { Habit } from "../../../models/index.js"
import HabitSerializer from "../../../serializers/HabitSerializer.js"

const habitsRouter = new express.Router()

habitsRouter.get("/", async (req, res) => {
  try {
    const habits = await Habit.query()
    const serializedHabits = habits.map((habit) => HabitSerializer.getSummary(habit))
    res.status(200).json({ habits: serializedHabits })
  } catch(error) {
    res.status(500).json({ error })
  }
})

habitsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const cleanBody = cleanUserInput(body)
    const { name } = cleanBody
    const newHabit = await Habit.query().insertAndFetch({ name })
    return res.status(201).json({ habit: newHabit})
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

habitsRouter.delete("/", async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.body
    console.log(id)
    await Habit.query().deleteById(id)
    return res.status(200).json()
  } catch(error) {
    return res.status(500).json({ error: error})
  }
})

export default habitsRouter