import mongoose from 'mongoose';

const LabSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true
    },
    batchGroup: {
      type: String,
      required: true
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
      }
    ],
    codeChallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'challenge',
        required: false
      }
    ]
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Lab = mongoose.model('Lab', LabSchema);

export default Lab;
