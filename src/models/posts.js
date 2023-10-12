import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'challenge',
    required: true
  },
  views: {
    type: Number,
    default: 1,
    min: 1
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  time: {
    type: Date,
    default: Date.now
  }
});

postSchema.plugin(mongoosePaginate);

postSchema.index({ time: 1 }); // Changed from 'createdAt' to 'time'

const Post = mongoose.model('Post', postSchema);

export default Post;
