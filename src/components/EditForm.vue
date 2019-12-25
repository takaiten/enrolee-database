<template>
  <div>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        id="input-group-4"
        label="Изменить направление:"
        label-for="input-4"
      >
        <b-form-select
          id="input-4"
          v-model="user.course"
          :options="courses"
        ></b-form-select>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="user.original" name="checkbox-original">
          Подается оригинал аттестата
        </b-form-checkbox>
      </b-form-group>
      <b-row>
        <b-col lg="5">
          <b-button block type="submit" variant="success">Сохранить</b-button>
        </b-col>
        <b-col lg="5">
          <b-button block type="link" variant="secondary" to="/" exact
            >Отмена</b-button
          >
        </b-col>
        <b-col lg="2">
          <b-button block type="button" variant="danger" @click="handleDelete">
            Удалить
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditForm",
  data() {
    return {
      user: null,
      courses: [
        { text: "Прикладная математика и информатика", value: 1 },
        {
          text:
            "Математическое обеспечение и администрирование информационных систем",
          value: 2
        }
      ]
    };
  },
  methods: {
    ...mapActions(["editApplication", "removeApplication"]),
    handleSubmit() {
      this.editApplication({
        user: this.user
      });
      this.$router.push({ path: "/" });
    },
    handleDelete() {
      this.removeApplication();
      console.log();
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapGetters(["database", "authUserCode"])
  },
  beforeMount() {
    this.user = this.database.find(user => user.code === this.authUserCode);
  }
};
</script>

<style></style>
