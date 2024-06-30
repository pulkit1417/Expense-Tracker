import { env } from "process";

export const firebaseConfig = {
    apiKey: env["API_KEY"],
    authDomain: env["AUTH_DOMAIN"],
    databaseURL: env["DATABASE_URL"],
    projectId: env["PROJECT_ID"],
    storageBucket: env["STORAGE_ID"],
    messagingSenderId: env["MESSAGING_SENDER_ID"],
    appId: env["APP_ID"],
};
