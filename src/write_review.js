
db.collection("Units").where('user_id', '==', auth.currentUser.uid).then(snapshot=> {
  if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    }).catch(err => {
    console.log('Error getting documents', err);
  });
})
