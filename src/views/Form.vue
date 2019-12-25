<template>
  <div>
    <b-jumbotron fluid class="pt-4 mb-0" v-if="!isAuth">
      <h2 class="text-center">Заявление</h2>
      <EnroleeForm />
    </b-jumbotron>
    <b-jumbotron fluid class="pt-4 mb-0" v-if="isAuth">
      <h2 class="text-center">
        Выйдите из аккаунта, чтобы подать ещё одно заявление
      </h2>
    </b-jumbotron>
  </div>
</template>

<script>
import EnroleeForm from "../components/EnroleeForm";
import { mapGetters } from "vuex";

export default {
  components: {
    EnroleeForm
  },
  computed: {
    ...mapGetters(["isAuth"])
  }
};
</script>

<style></style>
