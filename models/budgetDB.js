const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    expenseTitle: {
        type: String,
        required: true
    },
    // url string for thumbnail image
    amount: {
        type: Number,
        default: ""
    },
    // url for recipe web page - unique index
    category: {
        type: String,
        default: "",
    },

});

const Budget = mongoose.model("budget", budgetSchema);

module.exports = Budget;