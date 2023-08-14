import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      // Username is required only for STUDENT role
      required: function () {
        return this.role === 'STUDENT' && (!this.username || this.username.trim() === '');
      },
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    university: {
      type: String,
      required: true
    },
    verification_code: {
      type: String
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    is_active: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'LECTURER', 'STUDENT'],
      default: 'STUDENT'
    }
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

UserSchema.plugin(aggregatePaginate);

UserSchema.index({ createdAt: 1 });

const User = mongoose.model('User', UserSchema);

User.syncIndexes();

export default User;
