export default {
  namespaced: true,
  state: {
    categories: []
  },
	mutations: {
		SET_CATEGORIES: (state, categories) => {
			state.categories = categories;
		},
		ADD_SKILLS_CATEGORY: (state, skillCategory) => {
      state.categories.unshift(skillCategory);
    },
		SAVE_CATEGORY: (state, changedCategory) => {
			  state.categories = state.categories.map(category => {
        return category.id === changedCategory.id ? changedCategory : category;
      });
		},
    REMOVE_CATEGORY: (state, removedCategoryId) => {
      state.categories = state.categories.filter(
        category => category.id !== removedCategoryId
      );
    },
	},
  actions: {
    async addNewSkillGroup({commit}, groupTitle) {
      try {
        const response = await this.$axios.post("/categories", {
          title: groupTitle
        });
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
		async fetchCategories({commit}) {
      try {
        const response = await this.$axios.get("/categories");
				commit('SET_CATEGORIES', response.data);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
		async saveSkillGroup({commit}, payload) {
      try {
        const response = await this.$axios.post(`/categories/${payload.id}`, payload);
			commit("SAVE_CATEGORY", response.data.category);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
		async removeSkillsGroup({ commit }, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);
        commit("REMOVE_CATEGORY", categoryId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    }

  }
};
