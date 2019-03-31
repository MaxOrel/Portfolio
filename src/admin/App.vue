<template lang="pug">

  div.root-wrapper-container
    div.root-container
      .login
        .login__content
          form.login__form(@submit.prevent="login")
            .login__form-title Авторизация
            button.login__form-close
            .login__row
              app-input(
                title="Логин"
                icon="user"
                v-model="user.name"
                :errorText="validation.firstError('user.name')"
              )
            .login__row
              app-input(
                title="Пароль"
                icon="key"
                type="password"
                v-model="user.password"
                :errorText="validation.firstError('user.password')"
              )
            .login__btn
              button(
                type="submit"
                :disabled="disableSubmit"
              ).login__send-data Отправить
      header.header-container
        .header
          .container
            .header__info
              .user
                .user__pic
                  img(src="../images/content/user.jpg").user__pic-avatar
                .user__name 
                  span Владимир Астаханов
                  a.exit-btn Выйти
              .header__title Панель администрирования
            a.exit-btn Выйти
        
      section.tabs-container
        .container
          ul.tabs
            - 
              var userinfo = ['Обо мне', 'Работы', 'Отзывы'];
            each item in userinfo
              li.tabs__item
                .tabs__link #{item}
        
      main.content-container
        .about-page-container
          .container
            .about-page__title
              h1.page-title Блок «Обо мне»
              button.about-page__add-new Добавить группу

          .about-page__content
            .container.container--mobile-wide
              ul.skill-list
                li.skill-list__item
                  .add-new-skills-group
                    .card
                      .card__title
                        .card__title-text
                        .skills-card-title
                          .skills-card-title__input
                            label.input.no-side-paddings
                              input(placeholder="Название новой группы").input__elem.field__elem
                          .skills-card-title__buttons
                            .skills-card-title__btn
                              button(type="button").btn.is-tick.no-words
                            .skills-card-title__btn
                              button(type="button").btn.is-cross.no-words
                      .card__content
                        .add-new
                          form.add-new-container.is-blocked
                            .add-new__inputs
                              .add-new__col
                                label.input.no-side-paddings
                                  input(placeholder="Новый навык").input__elem.field__elem
                              .add-new__col.add-new__col_small
                                label.input
                                  input(type="number" min="0" max="100" maxlength="3").input__elem.field__elem
                              button(type="submit" data-text="+").add-new__button
                        
                li.skill-list__item(v-for="n in 4")
                  .card
                    .card__title
                      .skills-title-container
                        .skills-card-title
                          .skills-card-title__text Workflow
                          .skills-card-title__icon
                            button(type="button").btn.is-pencil.no-words.grayscale
                    .card__content
                      .skill-list__table
                        .skills-table-container
                          table.skills
                            tr.skills-row-wrapper
                              td.skills__cell
                                .skills__cell-input-wrapper
                                  label.input.no-side-paddings
                                    input.input__elem.field__elem
                              td.skills__cell 
                                .skills__cell-input-wrapper
                                  label.input.no-side-paddings
                                    input(type="number" min="0" max="100" maxlength="3").input__elem.field__elem
                              td.skills__cell
                                button(type="button").btn.is-tick.no-words
                              td.skills__cell
                                button(type="button").btn.is-cross.no-words
                            tr(v-for="n in 3").skills-row-wrapper
                              td.skills__cell Html 5
                              td.skills__cell 
                                .skills__input
                                  .skills__input-text 20
                              td.skills__cell
                                button(type="button").btn.is-pencil.no-words.grayscale
                              td.skills__cell
                                button(type="button").btn.is-trash.no-words.grayscale
                      .add-new
                        form.add-new-container
                          .add-new__inputs
                            .add-new__col
                              label.input
                                input(placeholder="Новый навык").input__elem.field__elem
                            .add-new__col.add-new__col_small
                              label.input
                                input(type="number" min="0" max="100" maxlength="3").input__elem.field__elem
                            button(type="submit" data-text="+").add-new__button
        .works-section
          .container
              h1.page-title Блок «Работы»
          .works-container
            .container.container--mobile-wide
              .edit-form
                .card
                  .card__title
                    .card__title-text Добавление работы
                  .card__content
                    .edit-form__container
                      .edit-form__col
                        .edit-form__btn
                          .edit-form__pic
                          label.edit-form__change-preview
                            a.edit-form__change-pic Изменить превью
                            input(type="file").edit-form__preview-input

                        label.edit-form__picture
                          .edit-form__picture-text
                            | Перетащите либо загрузите изображения
                          .btn-file-container
                            .btn-file-fake.btn-decorator Загрузить
                            input(type="file").btn-file-input
                      .edit-form__col
                        .edit-form__row
                          label.input.input_labeled
                            .input__title Название
                            input.input__elem.field__elem
                        .edit-form__row
                          label.input.input_labeled
                            .input__title Ссылка
                            input.input__elem.field__elem
                        .edit-form__row
                          label.input.input_labeled
                            .input__title Описание
                            textarea.textarea__elem.field__elem
                        .edit-form__row
                          .add-tags
                            .add-tags__wrapper
                              label.input.input_labeled
                                .input__title Добавление тега
                                input.input__elem.field__elem
                            ul.tags
                                li.tags__item.tags__item_interactive(v-for="n in 4")
                                  span html
                                  a.tags__remove
                    .edit-form__buttons
                      .edit-form__buttons-item
                        button(type="button").default-btn-container.btn-decorator.plain Отмена
                      .edit-form__buttons-item
                        button(type="button").default-btn-container.btn-decorator Загрузить

              ul.works
                li.works__item
                  button(type="button").btn-container
                    .btn__text
                      .btn__sign
                      .btn__title Добавить работу
                li.works__item(v-for="n in 3")
                  .card.card_plain
                    .works__wrapper
                      .works__pic
                        img(src="../images/admin/dark.jpg").works__image
                        .works__tag
                          ul.tags
                            li.tags__item(v-for="n in 3") html
                      .works__data
                        .works__title Новая работа
                        .works__text
                          p Описание этой работы
                        a(href="#").works__link http://google.com
                        .works__btns
                          button(type="button" data-text="Править").btn.is-pencil
                          button(type="button" data-text="Удалить").btn.is-cross
        .reviews-section
          .container
            h1.page-title Блок «Отзывы»
          .reviews-container
            .container.container--mobile-wide
              .edit-form
                .card
                  .card__title
                    .card__title-text Добавление отзыва
                  .card__content
                    .edit-form__container.edit-form__container_reviews
                      .edit-form__col.edit-form__col_max-content
                        label.edit-form__form-avatar-upload
                          input(type="file").edit-form__form-file-input
                          .edit-form__form-pic
                            .edit-form__form-avatar-empty.filled(style="background-image: url(https://semantica.in/wp-content/uploads/2018/08/av-427845-1.png);")
                          .edit-form__form-pic
                            .edit-form__form-avatar-empty
                          .edit-form__form-addphoto Добавить фото
                      .edit-form__col
                        .edit-form__row
                          .edit-form__form-block
                            label.input.input_labeled
                              .input__title Имя автора
                              input.input__elem.field__elem
                          .edit-form__form-block
                            .label.input.input_labeled
                              .input__title Титул автора
                              input.input__elem.field__elem
                        .edit-form__row
                          .edit-form__form-block
                            label.input.input_labeled
                              .input__title Отзыв
                              textarea.textarea__elem.field__elem
                    .edit-form__buttons
                      .edit-form__buttons-item
                        button(type="button").default-btn-container.btn-decorator.plain Отмена
                      .edit-form__buttons-item
                        button(type="button").default-btn-container.btn-decorator Загрузить

              ul.reviews
                li.reviews__item
                  button(type="button").btn-container
                    .btn__text
                      .btn__sign
                      .btn__title Добавить отзыв
                li.reviews__item(v-for="n in 3")
                  .card
                    .card__title
                      .card__title-text
                        .user
                          .user__avatar
                            img(src="../images/content/user.jpg").user__avatar-pic 
                          .user__desc
                            .user__name Владимир Сабанцев
                            .user__occ Преподаватель
                    .card__content
                      .reviews__content
                        .reviews__content-text
                          p Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!
                        .reviews__btns
                          button(type="button" data-text="Править").btn.is-pencil
                          button(type="button" data-text="Удалить").btn.is-cross




</template>
<script>
  import { Validator } from "simple-vue-validator";
  import axios from "axios";
  import appInput from "./components/input";

  export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "user.name": value => {
        return Validator.value(value).required("Введите имя пользователя");
      },
      "user.password": value => {
        return Validator.value(value).required("Введите пароль");
      }
    },
    data() {
      return {
        disableSubmit: false,
        user: {
          name: "",
          password: ""
        }
      };
    },
    components: {
      appInput
    },
    methods: {
      async login() {
        if ((await this.$validate()) === false) return;
        this.disableSubmit = true;
        try {
          axios
            .post("//jsonplaceholder.typicode.com/posts", {
              name: this.user.name,
              password: this.user.password
            })
            .then(response => {
              const report = JSON.stringify(response, null, 2);
              console.log(report);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style lang="pcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/admin/base-admin.pcss"; /*Общие стили для админки*/
@import "../styles/layout/base.pcss";

@import "../styles/admin/header.pcss";  
@import "../styles/admin/tabs.pcss"; 
@import "../styles/admin/card.pcss"; 
@import "../styles/admin/about-page.pcss"; /*Стилизация элементов страницы about*/
@import "../styles/admin/skill-list.pcss"; 
@import "../styles/admin/skill-card.pcss"; 
@import "../styles/admin/btn-icon.pcss";
@import "../styles/admin/skills.pcss";
@import "../styles/admin/add-new-skill.pcss";
@import "../styles/admin/input.pcss";
@import "../styles/admin/tooltip-error.pcss";

@import "../styles/admin/works.pcss";
@import "../styles/admin/btn-container.pcss";
@import "../styles/admin/tags.pcss";
@import "../styles/admin/edit-form.pcss";
@import "../styles/admin/btn.pcss";
@import "../styles/admin/reviews-section.pcss";
@import "../styles/admin/user-reviews.pcss";

@import "../styles/admin/login.pcss";
</style>