const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
  movies: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
      date: { type: Date },
    },
  ],
});

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = subscriptionModel;