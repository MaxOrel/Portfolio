<template lang="pug">
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
									img(src="images/admin/dark.jpg").works__image
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
</template>
