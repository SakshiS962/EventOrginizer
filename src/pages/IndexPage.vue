<template>
  <q-page class="inner-container">
    <div class="q-mb-xl q-mt-xl">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="black"
        navigation
        padding
        arrows
        height="500px"
        class="my-carousel text-black shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ "Global Events for developers" }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ "Global Events for developers" }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
            }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
            }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div>
      <h6>Upcoming Events:</h6>
      <div v-for="event in events" :key="event.id">
        <q-card
          class="q-mb-lg cursor-pointer"
          @click="$router.push(`/event/${event.id}`)"
        >
          <q-card-section horizontal>
            <q-img class="col-5" :src="event.image" height="250px" />

            <q-card-section>
              <div class="text-h6">{{ event.name }}</div>
              <div class="body-2 ellipsis-3-lines text-justify q-mt-md">
                {{ event.desc }}
              </div>
              <div class="body-2 q-mt-md">
                <q-icon name="place" class="q-mr-sm" />{{ event.location }}
              </div>
              <div class="body-2 q-mt-md">
                <q-icon name="event" class="q-mr-sm" />{{ event.date }}
              </div>
              <div class="body-2 q-mt-md">
                <q-icon name="schedule" class="q-mr-sm" />{{ event.time }}
              </div>
              <div class="body-2 q-mt-md">
                <q-icon name="person" class="q-mr-sm" />
                {{ event.joinees.length }}
                {{ event.joinees.length > 1 ? "Joinees" : "Joinee" }}
              </div>
            </q-card-section>
          </q-card-section>
          <q-separator />
        </q-card>
      </div>
    </div>
    <q-footer class="footer">
      <span>Copyright @ 2024 Sakshi Events</span>
    </q-footer>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "src/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const slide = ref("style");
const events = ref([]);

onMounted(() => {
  onSnapshot(collection(db, "events"), (querySnapshot) => {
    const newEvents = [];
    querySnapshot.forEach((doc) => {
      const event = {
        id: doc.id,
        ...doc.data(),
      };
      newEvents.push(event);
    });
    events.value = newEvents;
  });
});
</script>
