<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="container">
        <q-toolbar-title> DevMeetup </q-toolbar-title>

        <div>
          <q-btn @click="$router.push('/')" flat rounded color="standard"
            >Events</q-btn
          >
          <q-btn
            v-if="storeAuth.user.id"
            @click="$router.push('/form')"
            flat
            rounded
            color="standard"
            >Add Event</q-btn
          >

          <q-btn-dropdown color="standard" icon="person" rounded flat>
            <q-list>
              <q-item
                clickable
                v-close-popup
                v-if="!storeAuth.user.id"
                @click="$router.push('login')"
              >
                <q-item-section>
                  <q-item-label>Login</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                v-if="storeAuth.user.id"
                @click="$router.push('account')"
              >
                <q-item-section>
                  <q-item-label>Accounts Settings</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                v-if="storeAuth.user.id"
                @click="logout"
              >
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { useRouter } from "vue-router";

const storeAuth = useAuthStore();
const router = useRouter();

onMounted(() => {
  storeAuth.init();
});

function logout() {
  storeAuth.logoutUser();
  router.push("login");
}
</script>
