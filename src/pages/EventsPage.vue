<template>
  <q-page>
    <div class="container" v-if="eventDetails">
      <!--<pre>{{ eventDetails }}</pre>
      <pre>{{ user }}</pre>-->
      <div class="flex items-center justify-between q-mb-md">
        <q-btn
          class="q-mr-md q-mt-md"
          rounded
          dense
          icon="edit"
          :to="`/add-event/${eventDetails.id}/edit`"
          v-if="eventDetails.author.id === user.id"
        />
        <q-btn
          class="q-mt-md"
          rounded
          dense
          icon="delete"
          v-if="eventDetails.author.id === user.id"
          @click="handleDelete"
        />
      </div>
      <q-img :src="eventDetails.image" height="500px" />
      <div class="Description">
        <div class="app-title text-h6 q-mt-md">{{ eventDetails.name }}</div>
        <div class="q-mt-md">{{ eventDetails.desc }}</div>
        <div class="text-body2 q-mt-md">
          <q-icon name="place" class="q-mr-sm" /> at {{ eventDetails.location }}
        </div>
        <div class="text-body2">
          <q-icon name="event" class="q-mr-sm" />on {{ eventDetails.date }}
        </div>
        <div class="text-body2">
          <q-icon name="schedule" class="q-mr-sm" /> at {{ eventDetails.time }}
        </div>

        <div class="q-mt-md">
          <q-icon name="person" class="q-mr-sm" />
          {{ eventDetails.joinees.length }}
          {{ eventDetails.joinees.length > 1 ? "Joinees" : "Joinee" }}
        </div>
      </div>
      <div class="flex justify-center">
        <q-btn
          color="primary"
          label="Register Me"
          class="q-mt-md q-mb-md"
          rounded
          @click="handleRegistration"
          v-if="user.id"
          :disable="isUserRegistered"
        />
      </div>
      <div>
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title> Joinees </q-toolbar-title>
        </q-toolbar>

        <q-list bordered>
          <q-item
            v-for="item in eventDetails.joinees"
            :key="item.id"
            class="q-my-sm"
            v-ripple
          >
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption lines="1">{{ item.email }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "src/firebase";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth-store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

const { user } = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const eventDetails = ref();
const { loading } = useQuasar();
const $q = useQuasar();

async function getEvent() {
  const docRef = doc(db, "events", route.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    eventDetails.value = { id: docSnap.id, ...docSnap.data() };
    console.log(eventDetails.value);
  } else {
    console.log("No such document!");
  }
}

async function handleRegistration() {
  if (route.params.id) {
    await updateDoc(doc(db, "events", route.params.id), {
      joinees: arrayUnion(user.value),
    });
    $q.notify("User registered!");
    getEvent();
  }
}

const isUserRegistered = computed(() => {
  const rUser = eventDetails.value.joinees.find((j) => {
    return j.id === user.value.id;
  });
  return rUser ? true : false;
});

async function handleDelete() {
  try {
    loading.show();
    console.log("in delete function");
    await deleteDoc(doc(db, "events", route.params.id));
    router.push("/");
    console.log("deleted");
  } catch (error) {
    console.log(error);
  } finally {
    loading.hide();
  }
}

onMounted(getEvent);
</script>
