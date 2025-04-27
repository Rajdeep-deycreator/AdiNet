// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfmEroSvsD_jtwuAzfSNtFqkhQFjlRP50",
  authDomain: "bhakti-marg-75dfa.firebaseapp.com",
  projectId: "bhakti-marg-75dfa",
  storageBucket: "bhakti-marg-75dfa.appspot.com",
  messagingSenderId: "487992755160",
  appId: "1:487992755160:web:4c4667bb0aafa45ce928ad",
  measurementId: "G-9EMTXEK03B"
};

firebase.initializeApp(firebaseConfig);
const fs=firebase.firestore();
const auth=firebase.auth();
const stor=firebase.storage();
const analytics=firebase.analytics();

function newuser() {
  const email = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      const userId = cred.user.uid;

      const userData = {
        n: document.getElementById('n').value,
        ph: document.getElementById('nnu').value
      };

     return fs.collection('users').doc(email).set(userData).then(()=>{
         fs.collection(email).doc('personal_data').set(userData)
       }).catch((error)=>{
         alert(error.message)
       });
       
    })
    .then(() => {
      alert("User account successfully created!");
      window.location.href="signin.html"
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
function sub() {
  const email = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  auth.signInWithEmailAndPassword(email, pass)
    .then((creden) => {
      alert('Logged in');
      const uid = creden.user.uid;
      id=uid;
      if(id){
        localStorage.setItem('i',id);
      }
      console.log('User ID after login:', uid);
      window.location.href='index.html'

    })
    .catch((error) => {
      alert('Authentication Error: check weather your password or email is correct', error.message);
    });
}


