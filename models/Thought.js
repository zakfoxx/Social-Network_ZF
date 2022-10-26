const { Schema, model, Types } = require("mongoose");
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Typesof.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
  },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
);
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
UserSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
