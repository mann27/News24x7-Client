const { db, admin } = require('../utils/admin');
const firebaseConfig = require('../utils/config');

const {validateAddPostData} =require('../utils/validators') // add post middleware

exports.getAllPosts = function (req, res) {
    db.collection('posts')
        .orderBy('createdAt', 'desc').get()
        .then((data) => {
            posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(posts);
        })
        .catch((err) => console.error(err))
}

exports.getAllPostsMostLiked = function (req, res) {
    db.collection('posts')
        .orderBy('likeCount', 'desc').get()
        .then((data) => {
            posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(posts);
        })
        .catch((err) => console.error(err))
}

exports.getAllPostsTrending = function (req, res) {

    db.collection('posts').get()
        .then((data) => {
            data.forEach((doc) => {
                var trendV = 0;
                const postData = doc.data();
                var myDate = new Date("2020-02-10T13:19:11+0000");
                var ts = myDate.getTime();
                var currentDate = new Date(postData.createdAt);
                var tn = currentDate.getTime(); // in milliseconds
                ts = ts / 100;
                tn = tn / 100;
                var x = postData.likeCount
                var y = (x === 0) ? 0 : 1;
                var z = (x < 1) ? 1 : x;
                const postID = doc.id;
                trendV = Math.log10(z) + (y * (tn - ts)) / 45000;
                db.doc(`/posts/${postID}`).update({ trendValue: trendV })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({ error: " error in cal of trend" });
                    })
            })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ "err": "something is wrong" })
        })

    db.collection('posts')
        .orderBy('trendValue', 'desc').get()
        .then((data) => {
            posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(posts);
        })
        .catch((err) => console.error(err))
}

exports.addNewPost = function (req, res) {

    const newPost = {
        title:req.body.title,
        body:req.body.body,
        tags:req.body.tags
    }

    const { valid, errors } = validateAddPostData(newPost);
    if (!valid) {
        return res.status(400).json(errors);
    }

    const newPost = {
        handleName: req.user.handle,
        title: req.body.title,
        tags: req.body.tags,
        reportCount: 0,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        userImage: req.user.imageUrl,
        likeCount: 0,
        commentCount: 0,
        trendValue: 0,
        postImage: req.body.imgurl
    };
    db.collection('posts').add(newPost)
        .then((doc) => {
            const resPost = newPost;
            resPost.postId = doc.id;
            res.json(resPost);
            console.log("post created successfully!");
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        })
}

exports.getPost = function (req, res) {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ err: "Post not found" });
            }
            postData = doc.data();
            postData.postId = doc.id;
            return db.collection('comments')
                .orderBy('createdAt', 'desc')
                .where('postId', '==', req.params.postId)
                .get();
        })
        .then((data) => {
            postData.comments = [];
            data.forEach(doc => {
                postData.comments.push(doc.data());
            })
            return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ err: err.code });
        })
}

exports.deletePost = function (req, res) {

    const document = db.doc(`posts/${req.params.postId}`);
    const pid = req.params.postId;
    document.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            if (doc.data().handleName !== req.user.handle) {
                return res.status(403).json({ error: "Unauthorized to delete post" });
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: "Deleted sucessfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })

}


exports.addCommentToPost = function (req, res) {
    if (req.body.body.trim() === '') return res.status(400).json({ error: "Must not be empty" });
    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userHandle: req.user.handle
    };
    db.doc(`/posts/${req.params.postId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
        })
        .then(() => {
            console.log(newComment);
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: err.code });
        })
}

exports.likePost = function (req, res) {

    const likeDoc = db.collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId).limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData = {};
    postDoc.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            postData = doc.data();
            postData.postId = doc.id;
            return likeDoc.get();
        })
        .then((data) => {
            if (data.empty) {
                return db.collection('likes').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        postData.likeCount++;
                        return postDoc.update({ likeCount: postData.likeCount });
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            }
            else {
                return res.status(400).json({ error: "Post already liked" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.report = function (req, res) {

    const reportdoc = db.collection('report')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId).limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData = {};
    postDoc.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            postData = doc.data();
            postData.postId = doc.id;
            return reportdoc.get();
        })
        .then((data) => {
            if (data.empty) {
                return db.collection('report').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        postData.reportCount++;
                        return postDoc.update({ reportCount: postData.reportCount });
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            }
            else {
                return res.status(400).json({ error: "Post already reported" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}


exports.unlikePost = function (req, res) {

    const likeDoc = db.collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId).limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData = {};
    postDoc.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            postData = doc.data();
            postData.postId = doc.id;
            return likeDoc.get();
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: "Post already unliked" });
            }
            else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        postData.likeCount--;
                        return postDoc.update({ likeCount: postData.likeCount });
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}
