const express = require('express');
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/new", (req, res) => {
    res.render("../views/posts/new.handlebars");
})

router.get("/:id", (req, res) => {
    postData.getPostById(req.params.id).then((post) => {
        // res.render('posts/single', { post: post });
        res.render("../views/posts/single.handlebars",{postHTML:post});
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

router.get("/tag/:tag", (req, res) => {
    postData.getPostsByTag(req.params.tag).then((postList) => {
        res.render('../views/index.handlebars', { posts: postList });
    });
});

router.get("/", (req, res) => {
    postData.getAllPosts().then((postList) => {
        res.render('../views/index.handlebars', { postsSingle: postList }); // postsSingle 对应 single.handlebars里面的 class name，相当于在这里我选择了postsSingle这个参数
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});



router.post("/", (req, res) => {
    let blogPostData = req.body;
    let errors = [];

    if (!blogPostData.title) {
        errors.push("No title provided");
    }

    if (!blogPostData.body) {
        errors.push("No body provided");
    }

    if (!blogPostData.posterId) {
        errors.push("No poster selected");
    }

    if (errors.length > 0) {
        res.render('posts/new', { errors: errors, hasErrors: true, post: blogPostData});
        return;
    }

    postData.addPost(blogPostData.title, blogPostData.body, blogPostData.tags || [], blogPostData.posterId)
        .then((newPost) => {
            res.redirect(`/posts/${newPost._id}`);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.updatePost(req.params.id, updatedData)
            .then((updatedPost) => {
                res.json(updatedPost);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.removePost(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;