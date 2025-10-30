<template>
  <!-- <Navbar v-if="authStore.user" :user-email="authStore.user?.email" /> -->
  <v-app>

    <v-app-bar absolute v-if="authStore.user">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      Assistance
      <v-spacer></v-spacer>
      <span class="pr-3">Welcome, {{authStore.user.email}}</span>
      <v-divider vertical></v-divider>
      <v-btn color="primary" append-icon="mdi-logout" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent v-if="authStore.user" width="400">
      <Form/>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

  </v-app>
</template>

<script setup>
// import Navbar from './components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import Form from './components/Form.vue'

const authStore = useAuthStore()

const router = useRouter()

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>

</style>
