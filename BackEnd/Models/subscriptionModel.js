const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
    required: true,
  },
  movies: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: true,
      },
      date: { type: Date, required: true },
    },
  ],
});

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = subscriptionModel;
