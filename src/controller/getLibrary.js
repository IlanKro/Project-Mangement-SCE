module.exports = function(admin,libraries) {
    // send an admin user and the libraries(array) you want to get from the database and get promises for the arrays.
    const database= admin.firestore()
    async function getLibrary(library) {
        /* async function to get complete library, returns promise with the library */
        return database.collection(library).get().then(doc => {
            return doc.docs
        }).catch((error) => {
            console.log(error)
        })
    }
    return libraries.map(library=> getLibrary(library))
}
