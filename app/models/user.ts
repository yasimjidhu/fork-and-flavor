import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  image:string;
  googleId: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image:{type:String,default:''},
  googleId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, otherwise create it
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
