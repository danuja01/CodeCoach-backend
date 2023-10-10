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
    codeChallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'challenge'
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
