<template lang="pug">
    form.edit-form(
      @submit.prevent="mode === 'add' ? addNewWork() : editWork()"
      )
      .card
        .card__title
          .card__title-text {{title}}
        .card__content
          .edit-form__container
            .edit-form__col
              .edit-form__btn(
                v-if="renderedPhoto.length"
                )
                .edit-form__pic(
                  :style="{'backgroundImage' : workPhotoUrl}"
                  )
                label.edit-form__change-preview
                  a.edit-form__change-pic Изменить превью
                  input(type="file" @change="handlePhotoUpload").edit-form__preview-input

              label.edit-form__picture(
                v-else
                :class="{'error' : validation.hasError('work.photo')}"
                )
                .edit-form__picture-text
                  | Перетащите либо загрузите изображения
                app-button(
                  elem="file"
                  text="Загрузить"
                  @change="handlePhotoUpload"
                  )
                .edit-form__file-error

            .edit-form__col
              .edit-form__row
                app-input(
                  title="Название"
                  v-model="work.title"
                  :errorText="validation.firstError('work.title')"
                )
              .edit-form__row
                app-input(
                  title="Ссылка"
                  v-model="work.link"
                  :errorText="validation.firstError('work.link')"
                )
              .edit-form__row
                app-input(
                  title="Описание"
                  fieldType="textarea"
                  v-model="work.description"
                  :errorText="validation.firstError('work.description')"
                )
              .edit-form__row
                add-tags(
                  v-model="work.techs"
                  @removeTag="value => this.work.techs = value"
                  :errorText="validation.firstError('work.techs')"
                )
          .edit-form__buttons
            .edit-form__buttons-item
              app-button(
                text="Отмена"
                class="plain"
                @click="$emit('cancel')"
              )
            .edit-form__buttons-item
              app-button(
                text="Загрузить"
                :disabled="disableForm"
              )
</template>

<script>
import { mapActions, mapState } from "vuex";
import { renderer, getAbsoluteImgPath } from "@/helpers/pictures";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "work.title": value => {
      return Validator.value(value).required("Заполните название");
    },
    "work.techs": value => {
      return Validator.value(value).required("Заполните технологии");
    },
    "work.link": value => {
      return Validator.value(value).required("Заполните ссылку");
    },
    "work.description": value => {
      return Validator.value(value).required("Заполните описание");
    },
    "work.photo": value => {
      return Validator.value(value).required("Вставьте файл");
    }
  },
  props: {
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    title: {
      type: String,
      default: "Форма добавления элемента"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    addTags: () => import("components/add-tags.vue"),
    appInput: () => import("components/input.vue"),
    appButton: () => import("components/button.vue"),
    errorsTooltip: () => import("components/errors-tooltip.vue")
  },
  data() {
    return {
      disableForm: false,
      renderedPhoto: "",
      work: {
        id: 0,
        title: "",
        techs: "",
        link: "",
        photo: "",
        description: ""
      }
    };
  },
  computed: {
    ...mapState("works", {
      currentWork: state => state.currentWork
    }),
    workPhotoUrl() {
      return `url(${this.renderedPhoto})`;
    } 
  },
  created() {
    if (this.mode === "edit") {
      this.fillFormWithCurrentWorkData();
    }
  },
  watch: {
    currentWork(value) {
      if (this.mode === "edit") {
        this.fillFormWithCurrentWorkData();
      }
    },
    mode(value) {
      if (value === "add") {
        this.clearFormFields();
      }
    }
  },
  methods: {
    ...mapActions("works", ["storeWork", "updateWork"]),
    async editWork() {
      if ((await this.$validate()) === false) return;

      this.disableForm = true;
      try {
        const response = await this.updateWork(this.work);
        this.$emit("closeForm");
      } catch (error) {
        //error
      } finally {
        this.disableForm = false;
        this.validation.reset();
      }
    },
    async addNewWork() {
      if ((await this.$validate()) === false) return;
      this.disableForm = true;
      try {
        const response = await this.storeWork(this.work);

        this.clearFormFields();

        
      } catch (error) {
        //errror
      } finally {
        this.disableForm = false;
        this.validation.reset();
      }
    },
    cancelAdding() {
      this.clearFormFields();
      this.$emit("closeForm");
    },
    clearFormFields() {
      this.work = {};
      this.renderedPhoto = "";
    },
    fillFormWithCurrentWorkData() {
      this.work = { ...this.currentWork };
      this.renderedPhoto = getAbsoluteImgPath(this.currentWork.photo);
    },
    async handlePhotoUpload(e) {
      const file = e.target.files[0];
      this.work.photo = file;

      try {
        const rendererResult = await renderer(file);
        this.renderedPhoto = rendererResult;
      } catch (error) {
        //error
      }
    }
  }
};
</script>