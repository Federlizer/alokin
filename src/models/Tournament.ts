import mongoose from 'mongoose';

export interface ITournament extends mongoose.Document {
  name: string;
  displayName: string;
  registrationOpen: boolean;
  teams: boolean;
  registered: string[];

  openRegistration(): Promise<void>;
  closeRegistration(): Promise<void>;
  registerParticipant(participant: string): Promise<boolean>;
}

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  displayName: {
    type: String,
    required: true,
  },
  registrationOpen: {
    type: Boolean,
    default: true,
  },
  teams: {
    type: Boolean,
    default: false,
  },
  registered: {
    type: [String],
  },
});

TournamentSchema.methods.openRegistration = async function openRegistration() {
  this.registrationOpen = true;
  await this.save();
};

TournamentSchema.methods.registerParticipant = async function registerParticipant(participant: string): Promise<boolean> {
  // don't allow empty names
  if (participant.length === 0) return false;

  const alreadyRegistered = this.registered.find((r: string) => r === participant);

  if (alreadyRegistered) return false;

  this.registered = [...this.registered, participant];
  await this.save();
  return true;
};

TournamentSchema.methods.closeRegistration = async function closeRegistration() {
  this.registrationOpen = false;
  await this.save();
};

const Tournament = mongoose.model<ITournament>('Tournament', TournamentSchema);
export default Tournament;
