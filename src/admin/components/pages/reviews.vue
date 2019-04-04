<template lang="pug">
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
                      img(src="images/content/user.jpg").user__avatar-pic 
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
