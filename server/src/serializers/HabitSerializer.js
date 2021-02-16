class HabitSerializer {
  static getSummary(habit) {
    const allowedAttributes = ["id", "name"]

    let serializedHabit = {}
    for (const attribute of allowedAttributes) {
      serializedHabit[attribute] = habit[attribute]
    }
    return serializedHabit
  }
}

export default HabitSerializer