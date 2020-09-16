const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
    },
    teacherid: {
      type: String,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    days: {
      type: [Number],
    },
    starttime: {
      type: String,
    },
    endtime: {
      type: String,
    },
    enrolled: {
      type: [String],
    },
    archive: {
      type: Boolean,
      default: false,
    },
    homework: [
      {
        assignment: {
          type: String,
          required: true,
        },
        duedate: {
          type: Date,
          required: true,
        },
        details: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Unit = mongoose.model("unit", UnitSchema);
