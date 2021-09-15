<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import '@/assets/app.scss';

@Options({
  name: 'app-site'
})
export default class App extends Vue {}
</script>
