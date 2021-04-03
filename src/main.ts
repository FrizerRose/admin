// import '@/assets/scss/main.scss';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { createApp } from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.5,
  });
}

// Initialize Firebase
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_FIREBASE_APIKEY !== undefined) {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: 'admin-dash-8a02c.firebaseapp.com',
    projectId: 'admin-dash-8a02c',
    // storageBucket: 'admin-dash-8a02c.appspot.com',
    // messagingSenderId: '877215444969',
    appId: process.env.VUE_APP_FIREBASE_APPID,
  };
  firebase.initializeApp(firebaseConfig);
}

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app');
