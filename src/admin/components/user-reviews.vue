<template lang="pug">
  .user
    .user__avatar
      img(:src="user.avatar").user__avatar-pic 
    .user__desc
      .user__name {{user.name}}
      .user__occ {{user.occ}}
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>