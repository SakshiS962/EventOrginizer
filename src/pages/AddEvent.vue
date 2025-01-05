<template>
  <q-page>
    <!--<pre>{{ user }}</pre>-->
    <!--<pre>{{ event }}</pre>-->
    <div class="addPage-container">
      <div class="q-gutter-md q-mt-md q-mb-md innerAddPage-container">
        <q-toolbar-title>
          {{ route.params.id ? "Edit" : "Add" }} an Event here
        </q-toolbar-title>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            outlined
            v-model="event.name"
            label="Event Name"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please enter event']"
          />

          <q-input
            outlined
            v-model="event.desc"
            label="Event Description"
            type="textarea"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please enter event description',
            ]"
          />
          <q-input
            outlined
            v-model="event.location"
            label="Event Location"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please enter event location',
            ]"
          />

          <q-input outlined label="Event date" v-model="event.date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="event.date" mask="MM-DD-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input label="Event time" outlined v-model="event.time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="event.time"
                    with-seconds
                    format24h
                    mask="hh:mm:ss"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-file outlined v-model="image" label="Image" />

          <div>
            <q-btn
              :label="route.params.id ? 'Save event' : 'Add Event'"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { db } from "src/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import {
  getStorage,
  ref as fRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const storeAuth = useAuthStore();
const { user } = storeToRefs(useAuthStore());
const router = useRouter();
const route = useRoute();
const { loading } = useQuasar();
const event = reactive({
  name: "",
  desc: "",
  location: "",
  date: "",
  time: "",
  image: "",
  author: {
    id: user.value.id,
    name: user.value.name,
  },
  joinees: [],
});
const image = ref();
const storage = getStorage();

async function handleSubmit() {
  try {
    loading.show();
    console.log(event);

    if (image.value) {
      console.log(image.value);
      const storageRef = fRef(storage, `event/image-${Date.now()}`);
      const imageSnap = await uploadBytes(storageRef, image.value);
      const downloadURL = await getDownloadURL(imageSnap.ref);
      event.image = downloadURL;
    }

    if (route.params.id) {
      event.author = user.value.id;
      await updateDoc(doc(db, "events", route.params.id), {
        name: event.name,
        desc: event.desc,
        location: event.location,
        date: event.date,
        time: event.time,
        image: event.image,
      });
      router.push("/");
    } else {
      event.author = user.value.id;
      await addDoc(collection(db, "events"), event);
      router.push("/");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.hide();
  }
}

onMounted(async () => {
  if (route.params.id) {
    const docRef = doc(db, "events", route.params.id);
    const docSnap = await getDoc(docRef);
    console.log("docSnap", docSnap);

    event.name = docSnap.data().name;
    event.desc = docSnap.data().desc;
    event.location = docSnap.data().location;
    event.date = docSnap.data().date;
    event.time = docSnap.data().time;
    event.image = docSnap.data().image;
    //event.author = docSnap.data().author.id; // added now
  }
});
</script>
