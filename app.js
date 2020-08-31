//Initialize Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC0PHO2aRCVYYH28mEk7VZE6RzOXeOWDs4",
    authDomain: "contact-form-87.firebaseapp.com",
    databaseURL: "https://contact-form-87.firebaseio.com",
    projectId: "contact-form-87",
    storageBucket: "contact-form-87.appspot.com",
    messagingSenderId: "739286873296",
    appId: "1:739286873296:web:2f414ca64b633b943d5ad5",
    measurementId: "G-S6NYZ8N7Q9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Reference messages collection

var messagesRef = firebase.database().ref("messages");

document.getElementById("contact-form").addEventListener("submit", submitForm);

//submit form
function submitForm(e) {
    e.preventDefault();

    //Get Values

    var name = getInputValue("name");
    var email = getInputValue("email");
    var message = getInputValue("message");

    const ref = firebase.storage().ref();
    const refUrl = firebase
        .storage()
        .refFromURL(
            "https://firebasestorage.googleapis.com/v0/b/contact-form-87.appspot.com/o/Real%20Madrid%20Wallpaper.jpg?alt=media&token=3c76f929-8b8a-4408-b270-7780d24bed61"
        );

    refUrl
        .delete()
        .then(function () {
            console.log("File deleted!");
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
    const file = document.querySelector("#fileUpload").files[0];

    const fileName = file.name;

    const metadata = {
        contentType: file.type,
    };
    const task = ref.child(fileName).put(file, metadata);
    task.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) => {
        console.log(url);
        alert("Image Upload Successful");
        saveMessage(name, email, message, url);
    });

    //Message received notification
    document.querySelector(".alert").style.display = "block";

    //Hide Alert after 2 sec
    setTimeout(function () {
        document.querySelector(".alert").style.display = "none";
    }, 2000);

    //clear form
    document.getElementById("contact-form").reset();
}

//Function to get form values

function getInputValue(id) {
    return document.getElementById(id).value;
}

// save messages to firebase

function saveMessage(name, email, message, imageURL) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        imageURL: imageURL,
    });
}
