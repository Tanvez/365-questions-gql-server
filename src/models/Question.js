import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  question: String,
  date: { type: Date, default: Date.now },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
});

export const Question = model('Question', questionSchema);
