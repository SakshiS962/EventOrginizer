<template>
    <q-page class="login-container">
      <q-form @submit="handleLogin" class="form-container">
        <q-toolbar-title class="q-mb-md">Login</q-toolbar-title>
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
  
        <div>
          <q-btn label="Login" type="submit" color="primary" />
          <q-btn
            label="Register"
            color="primary"
            to="register"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-page>
  </template>
  
  <script setup>
  import { useAuthStore } from "src/stores/auth-store";
  import { useRouter } from "vue-router";
  import { reactive } from "vue";
  
  const router = useRouter();
  
  const { loginUser } = useAuthStore();
  
  const credentials = reactive({
    password: "",
    email: "",
  });
  
  async function handleLogin() {
    await loginUser(credentials);
    console.log("User logged in", credentials);
    router.push({ path: "/" });
  }
  </script>
  