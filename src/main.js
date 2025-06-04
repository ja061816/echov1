// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from "vuefire"
import { initializeApp } from "firebase/app"

import App from './App.vue'
import router from './router'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAKKynvQwEmDbV7zudKgtiDRHktOuAKG3A",
    authDomain: "echo-9b874.firebaseapp.com",
    projectId: "echo-9b874",
    storageBucket: "echo-9b874.firebasestorage.app",
    messagingSenderId: "247398897532",
    appId: "1:247398897532:web:5237445130b032155a36f9",
    measurementId: "G-5C3Z2CNDQS"
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, { firebaseApp })

app.mount('#app')
