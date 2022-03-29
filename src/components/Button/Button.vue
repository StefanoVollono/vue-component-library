<template>
  <button
    @click="increment"
    class="Button"
    :class="classes"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      count: 0,
    };
  },
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    label: {
      type: String,
      default: 'Button Ui'
    }
  },
  computed: {
    times() {
      return this.count > 1 ? 'times' : 'time';
    },
    text() {
      return `${this.label}, I have been clicked ${this.count} ${this.times}!!`;
    },
    classes() {
      return `Button--${this.size}`;
    },
  },
  methods: {
    increment() {
      this.count += 1;
      this.$emit('btnLibClicked', this.count);
    },
  },
};
</script>

<style scoped>
  .Button {
    --color: #fff;
    --color-hover: var(--color);
    --background: #2B3044;
    --background-hover: var(--background);
    --hover-back: #6D58FF;
    --hover-front: #5C86FF;

    padding: 8px 28px;
    border-radius: 20px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: none;
    outline: none;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    color: var(--c, var(--color));
    background: var(--b, var(--background));
    transition: color 0.2s linear var(--c-d, 0.2s), background 0.3s linear var(--b-d, 0.2s);
  }

  .Button--small {padding: 4px 18px; font-size: 9px }
  .Button--medium {padding: 8px 28px; font-size: 14px }
  .Button--large {padding: 12px 32px; font-size: 22px }
</style>
