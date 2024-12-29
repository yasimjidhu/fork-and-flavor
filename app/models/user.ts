import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password?:string;
  image?:string;
  googleId?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true,index:true},
  password: { type: String },
  image:{type:String},
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
},
{ timestamps: true }
);

// Check if the model already exists, otherwise create it
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
