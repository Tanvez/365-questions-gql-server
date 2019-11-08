import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  question: String,
  date: { type: Date, default: Date.now },
});

export const Question = model('Question', questionSchema);
