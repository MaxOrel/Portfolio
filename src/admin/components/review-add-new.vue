<template lang="pug">
    form.edit-form(
      @submit.prevent="mode === 'add' ? addNewReview() : editCurrentReview()"
      )
      .card
        .card__title
          .card__title-text {{title}}
        .card__content
          .edit-form__container
            .edit-form__col.edit-form__col_max-content
              label.edit-form__form-avatar-upload(
                :class="{ 'error' :  validation.hasError('review.photo') }"
              )
                input(
                  type="file"
                  @change="handlePhotoUpload"
                ).edit-form__form-file-input
                .edit-form__form-pic
                  .edit-form__form-avatar-empty(
                    :class="{'filled' : renderedAvatar.length}"
                    :style="{'backgroundImage' : userAvatarUrl}"
                  )
                .edit-form__form-addphoto Добавить фото
                .edit-form__avatar-error
                  errors-tooltip(
                    :errorText="validation.firstError('review.photo')"
                  )
            .edit-form__col
              .edit-form__row
                .edit-form__form-block
                  app-input(
                    title="Имя автора"
                    v-model="review.author"
                    :errorText="validation.firstError('review.author')"
                  )
                .edit-form__form-block
                  app-input(
                    title="Титул автора"
                    v-model="review.occ"
                    :errorText="validation.firstError('review.occ')"
                  )
              .edit-form__row
                .edit-form__form-block
                  app-input(
                    title="Отзыв"
                    field-type="textarea"
                    v-model="review.text"
                    :errorText="validation.firstError('review.text')"
                  )
          .edit-form__buttons(
           :style="{'padding' : buttonsPadding}"
          )
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
    "review.author": value => {
      return Validator.value(value).required("Заполните автора");
    },
    "review.occ": value => {
      return Validator.value(value).required("Укажите роль автора");
    },
    "review.text": value => {
      return Validator.value(value).required("Введите текст отзыва");
    },
    "review.photo": value => {
      return Validator.value(value).required("Вставьте аватар");
    }
  },

  components: {
    appInput: () => import("components/input.vue"),
    appButton: () => import("components/button.vue"),
    errorsTooltip: () => import("components/errors-tooltip.vue")
  },
  data() {
    return {
      renderedAvatar: "",
      disableForm: false,
      review: {
        id: 0,
        author: "",
        occ: "",
        text: "",
        photo: ""
      }
    };
  },
  props: {
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonsPadding: {
      type: String,
      default: "0"
    },
    title: {
      type: String,
      default: "Форма добавления элемента"
    },
    formType:{ //свойство не используется, можно использоваться для рефакторинга кода и объединении двух форм добавления отзывов и работ
      type: String
    }
  },
  computed: {
    ...mapState("reviews", {
      currentReview: state => state.currentReview //берем текущую работу из state используется в fillFormWithCurrentReviewData
    }),
    userAvatarUrl() {
      return `url(${this.renderedAvatar})`;
    }
  },
  watch: {
    currentReview(value) {
      if (this.mode === "edit") this.fillFormWithCurrentReviewData();
    }
  },
  created() { //передаем текущий отзыв на стадии создания компонента формы
    if (this.mode === "edit") this.fillFormWithCurrentReviewData();
  },
    methods: {
    ...mapActions("reviews", ["addReview", "updateReview"]),
    async editCurrentReview() {
      if (this.$validate() === false) return;
      this.disableForm = true;
      try {
        const response = await this.updateReview(this.review);
        this.$emit("cancel");
        this.disableForm = false;
      } catch (error) {
        //error
      }
    },
    async addNewReview() {
      if ((await this.$validate()) === false) return;
      this.disableForm = true;
      try {
        const response = await this.addReview(this.review);
        this.clearFormFields();
        this.disableForm = false;
        
      } catch (error) {
        //error
      } finally {
        
      }
    },
    clearFormFields() {
      this.review = {};
      this.renderedAvatar = "";
    },
    fillFormWithCurrentReviewData() { //функция заполнения полей формы данными из текущего объекта
      this.review = { ...this.currentReview }; // в review копируем текущий объект из state и благодаря v-model заполняются поля формы
      this.renderedAvatar = getAbsoluteImgPath(this.currentReview.photo); // отображам картинку с сервера
    },
    async handlePhotoUpload(e) {
      const file = e.target.files[0];
      this.review.photo = file;

      try {
        const renderedResult = await renderer(file);
        this.renderedAvatar = renderedResult;
      } catch (error) {
        //error
      }
    }
  }
}
</script>