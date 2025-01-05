<template>
  <q-page class="login-container">
    <q-form @submit="handleRegister" class="form-container">
      <q-toolbar-title class="q-mb-md">Register</q-toolbar-title>
      <q-input
        outlined
        v-model="credentials.name"
        label="Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type name']"
      />
      <q-input
        outlined
        v-model="credentials.email"
        label="Email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type email']"
      />

      <q-input
        outlined
        v-model="credentials.password"
        label="password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please enter password',
        ]"
      />

      <div class="register-footer">
        <q-btn label="Register" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { useRouter } from "vue-router";

const router = useRouter();

const { registerUser } = useAuthStore();
const { loading } = useQuasar();

const credentials = reactive({
  email: "",
  password: "",
  name: "",
});

async function handleRegister() {
  try {
    loading.show();
    await registerUser(credentials);
    router.push({ path: "/" });
  } catch (e) {
    console.log(e);
  } finally {
    loading.hide();
  }
}
</script>
