const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"]
})

class Habit extends unique(Model) {
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