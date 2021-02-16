const Model = require("./Model")

class Habit extends Model {
  static get tableName() {
    return "habits"
  }

  static get jsonSchema() {
    return {
      type:"object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1},
      }
    }
  }
}

module.exports = Habit