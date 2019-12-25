<template>
  <div class="home">
    <b-container fluid class="mt-4">
      <ListOfApplications />
    </b-container>
  </div>
</template>

<script>
import ListOfApplications from "@/components/ListOfApplications";

export default {
  name: "home",
  components: {
    ListOfApplications
  }
};
</script>
