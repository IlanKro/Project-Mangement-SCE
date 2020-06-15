module.exports = function(admin,library) {
    const database= admin.firestore()
    async function getLibrary(library) {
        /* async function to get complete library, returns promise with the library */
        return database.collection(library).get().then(doc => {
            return doc.docs
        }).catch((error) => {
            console.log(error)
        })
    }
}
