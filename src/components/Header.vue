<template>
  <b-navbar toggleable="md" type="dark" variant="info" absolute>
    <b-navbar-brand to="/" exact>
      <h2>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous"
        />
        <i class="fas fa-id-card mr-2" />Абитуриенту ФПМИ
      </h2>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact exact-active-class="active" class="mt-2">
          Посмотреть все заявки
        </b-nav-item>
        <b-nav-item
          v-if="!isAuth"
          to="/form"
          exact
          exact-active-class="active"
          class="mt-2"
        >
          Подать заявление
        </b-nav-item>
        <b-nav-item
          v-if="isAuth"
          to="/edit"
          exact
          exact-active-class="active"
          class="mt-2"
        >
          Редактировать заявление
        </b-nav-item>
        <b-nav-item v-if="!isAuth">
          <b-button v-b-modal.auth ok>Авторизация</b-button>

          <b-modal
            id="auth"
            title="Авторизация"
            ok-title="Войти"
            cancel-title="Отменить"
            ref="modal"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                label="Введите свой уникальный код:"
                label-for="auth-input"
              >
                <b-form-input
                  id="auth-input"
                  v-model="authCode"
                  placeholder="A1B2C3D4"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="validateFormat">
                  Код должен состоять из 8 символов латинского алфавита/цифр
                </b-form-invalid-feedback>
                <b-form-invalid-feedback :state="validateAvailable">
                  Данного кода нет в базе
                </b-form-invalid-feedback>
              </b-form-group>
            </form>
          </b-modal>
        </b-nav-item>
        <b-nav-item v-if="isAuth">
          <b-button @click="handleLogout">Выйти</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const stringRegex = /^\w{8}$/;

export default {
  name: "Header",
  data() {
    return {
      authCode: ""
    };
  },
  methods: {
    ...mapActions(["authUser", "logoutUser"]),
    resetModal() {
      this.authCode = "";
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.validateFormat || !this.validateAvailable) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
      this.authUser({ code: this.authCode });
    },
    handleLogout() {
      this.logoutUser();
    }
  },
  computed: {
    ...mapGetters(["database", "isAuth"]),
    validateFormat() {
      const { authCode } = this;
      return authCode === "" ? null : stringRegex.test(authCode);
    },
    validateAvailable() {
      const { authCode } = this;
      return authCode === ""
        ? null
        : !!this.database.find(user => user.code === authCode);
    }
  }
};
</script>

<style></style>
