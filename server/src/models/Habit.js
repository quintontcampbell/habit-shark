const Model = require("./Model")

class Habit extends Model {
  static get tableName() {
    return "habits"
  }
}

module.exports = Habit