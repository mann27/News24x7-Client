const { admin, db } = require('./admin');

module.exports = (req, res, next) => {       //. THIS IS AN MIDDLEWARE 
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
        admin.auth().verifyIdToken(idToken)
            .then((decodedToken) => {
                req.user = decodedToken;
                return db.collection('users')
                    .where('userId', '==', req.user.uid)
                    .limit(1).get()
            })
            .then((data) => {
                req.user.handle = data.docs[0].data().handle;
                req.user.imageUrl = data.docs[0].data().imageUrl;
                return next();
            })
            .catch((err) => {
                console.error('error while verifying token');
                res.status(403).json(err);
            })

    } else {
        console.log('no token passed');
        return res.status(403).json({ error: 'Unauthorized request created' });
    }
}