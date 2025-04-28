<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">{{ title }}</a>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
          <a :href="item.link">{{ item.title }}</a>
        </div>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'dropdown',
  props: ['title', 'items'],
  data: () => {
    return {
      isOpen: false
    }
  },
}
</script>

<style>
nav .sub-menu {
  position: absolute;
  background-color: white;
  /* top: calc(75% +18px); */
  /* left: 50%;*/
  transform: translateX(10%);
  transform: translateY(40px);
  width: max-content;
  /* border-radius: 0px 0px 16px 16px */
}
</style>
