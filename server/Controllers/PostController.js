const Post = require("../Models/Post");

class PostController {
  // @router GET api/posts
  // @desc show post
  // @access Private
  async show(req, res) {
    try {
      const posts = await Post.find({ user: req.userId }).populate("user", [
        "username",
      ]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @router POST api/posts/create
  // @desc Create post
  // @access Private
  async create(req, res) {
    const { title, description, url, status } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is require" });
    try {
      const newPost = await new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });
      await newPost.save();
      res.json({ success: true, message: "Happy learning", post: newPost });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @router PUT api/posts/:id
  // @desc Update post
  // @access Private
  async update(req, res) {
    const { title, description, url, status } = req.body;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    try {
      let updatedPost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
      };
      const postUpdateCondition = { _id: req.params.id, user: req.userId };
      updatedPost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatedPost,
        { new: true }
      );
      // User not authorised to update post or post not found
      if (!updatedPost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });

      res.json({
        success: true,
        message: "Excellent progress",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @router DELETE api/posts/:id
  // @desc Delete post
  // @access Private
  async delete(req, res) {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletePost = await Post.findOneAndDelete(postDeleteCondition);
      console.log(postDeleteCondition);
      console.log(deletePost);
      // User not authorrised or post not found
      if (!deletePost) {
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      }
      res.json({
        success: true,
        message: "The post has been deleted",
        post: deletePost,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new PostController();
