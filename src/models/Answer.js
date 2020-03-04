import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const answerSchema = new Schema({
  answer: String,
  date: { type: Date, default: Date.now },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Answer = model('Answer', answerSchema);
