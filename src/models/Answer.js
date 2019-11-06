import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const answerSchema = new Schema({
  answer: String,
  date: { type: Date, default: Date.now },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
});

export const Answer = model('Answer', answerSchema);
