import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    testCasesStatus: [
      {
        testCaseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question.testCases',
          required: true
        },
        status: {
          type: String,
          enum: ['Completed', 'Failed'],
          required: true
        }
      }
    ],
    attempts: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

SubmissionSchema.plugin(aggregatePaginate);

SubmissionSchema.index({ createdAt: 1 });

const Submission = mongoose.model('Submission', SubmissionSchema);

Submission.syncIndexes();

export default Submission;
