<template>
  <div>
    <b-jumbotron fluid class="pt-4 mb-0" v-if="isAuth">
      <h2 class="text-center">Редактировать заявление</h2>
      <EditForm />
    </b-jumbotron>
    <b-jumbotron fluid class="pt-4 mb-0" v-if="!isAuth">
      <h2 class="text-center">
        Войдите, чтобы редактировать заявление
      </h2>
    </b-jumbotron>
  </div>
</template>

<script>
import EditForm from "../components/EditForm";
import { mapGetters } from "vuex";

export default {
  components: {
    EditForm
  },
  computed: {
    ...mapGetters(["isAuth"])
  }
};
</script>

<style></style>
