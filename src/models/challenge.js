import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const Schema = mongoose.Schema;

const ChallengeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    testCases: [
      {
        testNo: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        output: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

ChallengeSchema.plugin(aggregatePaginate);

ChallengeSchema.index({ createdAt: 1 });

const Challenge = mongoose.model('challenge', ChallengeSchema);

Challenge.syncIndexes();

export default Challenge;
