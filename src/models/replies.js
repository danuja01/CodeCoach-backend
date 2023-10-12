import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const replySchema = new mongoose.Schema({
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  });


  replySchema.plugin(mongoosePaginate);

  replySchema.index({ createdAt: 1 });
  
  const Reply = mongoose.model("Reply", replySchema);
  
  Reply.syncIndexes();
  
  export default Reply