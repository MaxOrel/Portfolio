<template lang="pug">
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
</template>
