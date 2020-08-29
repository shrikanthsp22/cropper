import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDjK-P7c7__8cgkxK1sZP-EeXAjqTnIUAs",
    authDomain: "fir-sps-9fb58.firebaseapp.com",
    databaseURL: "https://fir-sps-9fb58.firebaseio.com",
    projectId: "fir-sps-9fb58",
    storageBucket: "fir-sps-9fb58.appspot.com",
    messagingSenderId: "740630642445",
    appId: "1:740630642445:web:06f492ef50c74289a6fa44",
    measurementId: "G-R1XZ1LSM4R"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}