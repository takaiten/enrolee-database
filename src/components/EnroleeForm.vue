<template>
  <div>
    <b-form @submit.prevent="handleSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Фамилия" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.surname"
          placeholder="Иванов"
          type="text"
          required
          :state="validateSurname"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateSurname">
          Допустимы только символы кирилицы
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label="Имя" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Иван"
          type="text"
          required
          :state="validateName"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateName">
          Допустимы только символы кирилицы
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Отчество:"
        label-for="input-3"
        description="При наличии"
      >
        <b-form-input
          id="input-3"
          v-model="form.middlename"
          placeholder="Иванович"
          type="text"
          :state="validateMiddlename"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateMiddlename">
          Допустимы только символы кирилицы
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text class="bg-info text-light"
              >Дата рождения</b-input-group-text
            >
          </template>
          <b-form-input
            id="input-5"
            v-model="form.birthdate"
            type="date"
            placeholder="28.02.2000"
            :state="validateBirthdate"
          >
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback :state="validateBirthdate">
          Вам должно быть как минимум 16 лет
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-input-group class="mb-2">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info text-light">
              Серия и номер паспорта
            </b-input-group-text>
          </template>
          <b-form-input
            aria-label="Серия паспорта"
            v-model="form.passportSeries"
            type="text"
            placeholder="1234"
            :state="validatePassportSeries"
            required
          ></b-form-input>
          <b-form-input
            aria-label="Номер паспорта"
            v-model="form.passportNumber"
            type="text"
            placeholder="567890"
            :state="validatePassportNumber"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Укажите баллы ЕГЭ" label-for="input-group-2">
        <b-input-group id="input-group-2" class="mb-3">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info text-light">
              Математика
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="form.math"
            type="text"
            placeholder="100"
            required
            :state="validateMath"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateMath">
            Минимальный балл по предмету Математика: 40. Максимальный: 100
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group class="mb-3">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info text-light"
              >Русский язык</b-input-group-text
            >
          </template>
          <b-form-input
            v-model="form.russian"
            type="text"
            placeholder="100"
            required
            :state="validateRussian"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateRussian">
            Минимальный балл по предмету Русский язык: 39. Максимальный: 100
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text class="bg-info text-light"
              >Информатика</b-input-group-text
            >
          </template>
          <b-form-input
            v-model="form.computerScience"
            type="text"
            placeholder="100"
            required
            :state="validateCS"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateCS">
            Минимальный балл по предмету Информатика: 42. Максимальный: 100
          </b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Выберите направление:"
        label-for="input-4"
      >
        <b-form-select
          id="input-4"
          v-model="form.course"
          :options="course"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-6">
        <b-form-checkbox-group
          v-model="form.checked"
          name="checkboxs"
          :options="options"
          stacked
        >
        </b-form-checkbox-group>
        <b-form-checkbox
          v-model="form.status"
          name="checkbox-acceptance"
          value="accepted"
          unchecked-value="not-accepted"
          required
          :state="validateAcceptance"
        >
          Я согласен на обработку персональных данных
          <b-form-invalid-feedback :state="validateAcceptance">
            Пожалуйста, ознакомьтесь с согласием на обработку персональных
            данных
          </b-form-invalid-feedback>
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="success">Отправить</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const cirillycRegex = /^[А-я]+$/;
const numberRegex = /^\d+$/;
const maxDate = new Date();
const minDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 16);
minDate.setFullYear(maxDate.getFullYear() - 100);

export default {
  name: "EnroleeForm",
  data() {
    return {
      form: {
        surname: "",
        name: "",
        middlename: "",
        birthdate: null,
        passportSeries: null,
        passportNumber: null,
        math: null,
        russian: null,
        computerScience: null,
        course: 1,
        checked: [],
        status: null
      },
      course: [
        { text: "Прикладная математика и информатика", value: 1 },
        {
          text:
            "Математическое обеспечение и администрирование информационных систем",
          value: 2
        }
      ],
      options: [
        { text: "Присутвует золотая медаль", value: "medal" },
        { text: "Подается оригинал аттестата", value: "original" }
      ],
      show: true
    };
  },
  methods: {
    ...mapActions(["addNewForm"]),
    showModalWithCode(authCode) {
      this.$bvModal
        .msgBoxOk(authCode, {
          title: "Запишите код авторизации",
          okVariant: "success",
          headerClass: "border-bottom-0",
          footerClass: "p-2 border-top-0",
          bodyClass: "display-4 text-center",
          centered: true
        })
        .then(() => this.$router.push({ path: "/" }))
        .catch(() => this.$router.push({ path: "/" }));
    },
    handleSubmit() {
      const authCode = Math.random()
        .toString(36)
        .substring(2, 10);
      this.showModalWithCode(authCode);
      this.addNewForm({
        formData: {
          fullname: {
            name: this.form.name,
            surname: this.form.surname,
            middlename: this.form.middlename
          },
          birthdate: this.form.birthdate,
          passportData: {
            series: this.form.passportSeries,
            number: this.form.passportNumber
          },
          points: {
            math: +this.form.math,
            russian: +this.form.russian,
            cs: +this.form.computerScience
          },
          medal: !!this.form.checked.find(item => item === "medal"),
          original: !!this.form.checked.find(item => item === "original"),
          course: this.form.course,
          code: authCode
        }
      });
    }
  },
  computed: {
    validateName() {
      const { name } = this.form;
      return name === "" ? null : cirillycRegex.test(name);
    },
    validateSurname() {
      const { surname } = this.form;
      return surname === "" ? null : cirillycRegex.test(surname);
    },
    validateMiddlename() {
      const { middlename } = this.form;
      return middlename === "" ? null : cirillycRegex.test(middlename);
    },
    validateAcceptance() {
      const { status } = this.form;
      return status ? status === "accepted" : status;
    },
    validateBirthdate() {
      const { birthdate } = this.form;
      const dateObj = new Date(birthdate);
      return birthdate
        ? dateObj < maxDate
          ? dateObj > minDate
            ? true
            : false
          : false
        : null;
    },
    validatePassportSeries() {
      const { passportSeries } = this.form;
      return passportSeries
        ? passportSeries.length === 4
          ? numberRegex.test(passportSeries)
          : false
        : null;
    },
    validatePassportNumber() {
      const { passportNumber } = this.form;
      return passportNumber
        ? passportNumber.length === 6
          ? numberRegex.test(passportNumber)
          : false
        : null;
    },
    validateMath() {
      const { math } = this.form;
      return math
        ? +math >= 40 && +math <= 100
          ? numberRegex.test(math)
          : false
        : null;
    },
    validateRussian() {
      const { russian } = this.form;
      return russian
        ? +russian >= 39 && +russian <= 100
          ? numberRegex.test(russian)
          : false
        : null;
    },
    validateCS() {
      const { computerScience } = this.form;
      return computerScience
        ? +computerScience >= 42 && +computerScience <= 100
          ? numberRegex.test(computerScience)
          : false
        : null;
    }
  }
};
</script>
