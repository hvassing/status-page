const fba = require('firebase-admin');
fba.initializeApp({
  credential: fba.credential.applicationDefault()
});

exports.getStatusInfo = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://storage.googleapis.com');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else if (req.method === 'GET') {
    res.set('Access-Control-Allow-Origin', 'https://storage.googleapis.com');
    
    if ( req.query.uid ) {
      var uid = req.query.uid;        
      
      var rollRef = fba.firestore().collection('eos_status').doc( 'latest' );
      var getDoc = rollRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            res.status(404).send('Not found');
          } else {
            console.log('Document data:', doc.data());
            res.status(200).send( doc.data());
          }
	    })
        .catch(err => {
          console.log('Error getting document', err);
          res.status(500).send('Something went wrong');
        });
      
    } else {
      res.status(404).send('Not found');
    }
  } else {
    res.status(403).send('Forbidden!');
  }
};
