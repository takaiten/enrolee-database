<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col lg="4" class="my-1">
        <b-form-group>
          <b-form-select
            v-model="selectedCourse"
            :options="courses"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <!-- </b-row>
    <b-row class="justify-content-md-center"> -->
      <b-col lg="6" class="my-1">
        <b-form-group label-for="search-input">
          <b-input-group prepend="Поиск">
            <b-form-input
              id="search-input"
              type="search"
              placeholder="Введите строку для поиска"
              v-model="filter"
            >
            </b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Очистить
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="2" class="my-1">
        <b-form-group class="mt-lg-2">
          <b-form-checkbox v-model="onlyOriginal">
            Показывать только с подлиниками
          </b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :fields="fields"
      :items="filtered"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      :filter-ignored-fields="filterBy"
      responsive="lg"
      striped
      outlined
    >
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ListOfApplications",
  computed: {
    ...mapGetters(["database"]),
    filtered: function() {
      return this.database
        .filter(item => (this.onlyOriginal ? item.original : true))
        .filter(item => item.course === this.selectedCourse);
    }
  },
  data() {
    return {
      sortBy: "allPts",
      sortDesc: true,
      filter: null,
      filterBy: ["medal", "original", "passportData", "code"],
      onlyOriginal: false,
      fields: [
        { key: "index", label: "#" },
        {
          key: "surname",
          label: "Фамилия",
          formatter: (value, key, item) => {
            return item.fullname.surname;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "name",
          label: "Имя",
          formatter: (value, key, item) => {
            return item.fullname.name;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "middlename",
          label: "Отчество",
          formatter: (value, key, item) => {
            return item.fullname.middlename;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "allPts",
          label: "Сумма баллов",
          sortable: true,
          formatter: (value, key, item) => {
            const { math, russian, cs } = item.points;
            return math + russian + cs + (item.medal ? 3 : 0);
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "mathPts",
          label: "Математика",
          sortable: true,
          formatter: (value, key, item) => {
            return item.points.math;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "russianPts",
          label: "Русский язык",
          sortable: true,
          formatter: (value, key, item) => {
            return item.points.russian;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "csPts",
          label: "Информатика",
          sortable: true,
          formatter: (value, key, item) => {
            return item.points.cs;
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "medal",
          label: "Медаль",
          formatter: (value, key, item) => {
            return item.medal ? "+" : "-";
          }
        },
        {
          key: "original",
          label: "Оригинал",
          formatter: (value, key, item) => {
            return item.original ? "+" : "-";
          }
        }
      ],
      courses: [
        { text: "Прикладная математика и информатика", value: 1 },
        {
          text:
            "Математическое обеспечение и администрирование информационных систем",
          value: 2
        }
      ],
      selectedCourse: 1
    };
  },
  methods: {
    print(data) {
      console.log(data);
    }
  }
};
</script>

<style></style>
