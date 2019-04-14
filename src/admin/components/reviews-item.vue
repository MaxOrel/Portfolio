<template lang="pug">
  .card
    .card__title
      .card__title-text
        user(
          :user="constructUserObj(review)"
        )
    .card__content
      .reviews__content
        .reviews__content-text
          p {{review.text}}
        .reviews__btns
          button(type="button" data-text="Править" @click="updateWork").btn.is-pencil
          button(type="button" data-text="Удалить" @click="removeExistedReview").btn.is-cross
</template>

<script>
import { getAbsoluteImgPath } from "@/helpers/pictures";
import { mapActions, mapMutations } from "vuex";
export default {
  components: {
    user: () => import("components/user-reviews.vue")
  },
  props: {
    review: Object
  },
  methods: {
    ...mapActions("reviews", ["removeReview"]),
    ...mapMutations("reviews", ["SET_CURRENT_REVIEW"]),
    
    updateWork() {
      this.SET_CURRENT_REVIEW(this.review.id); //записываем в state текущую работу
      this.$emit("updateWork");
    },
    async removeExistedReview() {
      if (confirm('Удалить отзыв?') === true)
      try {
        const response = await this.removeReview(this.review.id);
      } catch (error) {
        //error
      }
    },
    constructUserObj(data) {
      return {
        name: data.author,
        occ: data.occ,
        avatar: getAbsoluteImgPath(data.photo)
      };
    }
  }
};
</script>
