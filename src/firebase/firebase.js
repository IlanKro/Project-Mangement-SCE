/* import for firebase client side module*/
var firebaseConfig = {
    apiKey: "AIzaSyCuqm7lR0YYnF8IiarnGQMEfRM-Fs5QpP4",
    authDomain: "sce-room.firebaseapp.com",
    databaseURL: "https://sce-room.firebaseio.com",
    projectId: "sce-room",
    storageBucket: "sce-room.appspot.com",
    messagingSenderId: "289292987021",
    appId: "1:289292987021:web:eb1bcaeef9af28611f50c4",
    measurementId: "G-MT3MN5L1S3"
}
// Initialize Firebase
if (firebase.apps.length == 0)
    firebase.initializeApp(firebaseConfig)
var auth=firebase.auth()
var db=firebase.firestore()
var storage = firebase.storage()
