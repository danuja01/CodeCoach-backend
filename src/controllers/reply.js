import Post from '../models/posts';
import Reply from '../models/replies';

export const createReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).send("The Post with given ID doesn't exists!");
    }

    const reply = new Reply({
      post: req.params.id,
      comment: req.body.comment,
      author: req.user._id
    });

    await reply.save();

    const reply_populated = await Reply.findOne({ _id: reply._id }).populate('author', 'name -_id');

    res.send(reply_populated);
  } catch (ex) {
    res.status(500).send('Internal Server Error');
  }
};

export const getReplies = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).send("The Post with given ID doesn't exists!");
    }

    const replies = await Reply.find({ post: req.params.id }).populate('author', 'name username');

    res.send(replies);
  } catch (ex) {
    res.status(500).send('Internal Server Error');
  }
};

export const deleteReply = async (req, res) => {
  try {
    const reply = await Reply.findByIdAndRemove(req.params.id);

    if (!reply) {
      return res.status(404).send("The Reply with given ID doesn't exist!");
    }

    res.send('Reply deleted successfully!');
  } catch (ex) {
    res.status(500).send('Internal Server Error');
  }
};

export const updateReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (!reply) {
      return res.status(404).send("The Reply with given ID doesn't exist!");
    }

    reply.comment = req.body.comment;
    await reply.save();

    res.send('Reply updated successfully!');
  } catch (ex) {
    res.status(500).send('Internal Server Error');
  }
};
