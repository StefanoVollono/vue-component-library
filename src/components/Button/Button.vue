<template>
  <button @click="increment">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    times() {
      return this.count > 1 ? 'times' : 'time';
    },
    text() {
      return `I have been clicked ${this.count} ${this.times}!!`;
    },
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};
</script>
