// import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from "vuefire"
import { initializeApp } from "firebase/app"

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, { firebaseApp })

app.mount('#app')
