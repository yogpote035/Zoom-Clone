const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    meting_code: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
