import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  date: { type: Date, default: Date.now },
});

export const Question = model('Question', questionSchema);
