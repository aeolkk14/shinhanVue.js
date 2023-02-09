import firebase from 'firebase/app'; // 파이어베이스 기능 불러오기
import 'firebase/firestore'; // 파이어베이스의 파이어스토어 기능 불러오기

const firebaseConfig = {
    apiKey: "AIzaSyAcuS6Ebr4LNt5qkqtGCrf2T9Okbz-iLv4",
    authDomain: "my-todo1-83af4.firebaseapp.com",
    projectId: "my-todo1-83af4",
    storageBucket: "my-todo1-83af4.appspot.com",
    messagingSenderId: "316718611691",
    appId: "1:316718611691:web:ce79397ea70c2bbd63d2ae"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();