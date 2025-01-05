import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";

import { db, auth } from "src/firebase/index";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authStore: "",
    user: {},
  }),
  getters: {},
  actions: {
    init() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;

          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.user = {
              id: user.uid,
              email: user.email,
              name: docSnap.data().name,
            };
          } else {
            console.log("No such document!");
          }
        } else {
          this.user = {};
          this.router.replace("/");
        }
      });
    },
    async registerUser(credentials) {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name: credentials.name,
      });
    },
    async loginUser(credentials) {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log("user logged out");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});
