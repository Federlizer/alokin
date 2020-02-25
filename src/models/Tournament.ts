import mongoose from 'mongoose';

export interface ITournament extends mongoose.Document {
  name: string;
  displayName: string;
  participants: string[];
}

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    lowercase: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
  },
});

const Tournament = mongoose.model<ITournament>('Tournament', TournamentSchema);
export default Tournament;
