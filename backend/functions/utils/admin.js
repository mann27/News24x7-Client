const admin = require('firebase-admin');
admin.initializeApp(); // need to connect to db firestone

const db = admin.firestore();

module.exports = { admin, db };
