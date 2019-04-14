<template lang="pug">
  .reviews-section
    .container
      h1.page-title Блок «Отзывы»
    .reviews-container
      .container.container--mobile-wide
        .reviews__form(v-if="showAddingForm")
          add-new-review(
            :mode="mode"
            :title="formTitle"
            class="edit-form_reviews"
            buttonsPadding="0 20% 0 0"
            @cancel="showAddingForm = false"
          )
        ul.reviews
          li.reviews__item
            add-new-btn(
              @click="addNewReview"
            )          
            
          li.reviews__item(v-for="review in reviews")
            reviews-item(
              :review="review"
              @updateWork="updateWork"
            )
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      mode: "",
      showAddingForm: false
    };
  },
  components: {
    addNewBtn: () => import("components/add-new-btn.vue"),
    addNewReview: () => import("components/review-add-new"),
    reviewsItem: () => import("components/reviews-item.vue")
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    }),
    formTitle() {
      switch (this.mode) {
        case "add":
          return "Добавить отзыв";
        case "edit":
          return "Изменить отзыв";
        default:
          return "";
          console.warn("не верное значение поля mode в reviews");
      }
    }
  },
  methods: {
    ...mapActions("reviews", ["fetchReviews"]),

    updateWork() {
      this.mode = "edit";
      this.showAddingForm = true;
    },
    addNewReview() {
      this.mode = "add";
      this.showAddingForm = true;
    },
    
    async collectReviews() {
      try {
        await this.fetchReviews();
      } catch (error) {
        //error
      }
    }
  },
  created() {
    this.collectReviews();
  }
};
</script>