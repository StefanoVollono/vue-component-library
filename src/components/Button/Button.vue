<template>
  <button
    class="Button"
    :class="classes"
    :disabled="disabled"
    @click="onClickBtn"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    theme: {
      type: String,
      default: 'primary',
    },
    label: {
      type: String,
      default: 'Button Ui',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `Button--${this.size}`,
        `Button--${this.theme}`,
      ];
    },
  },
  methods: {
    onClickBtn() {
      this.$emit('btnLibClicked');
    },
  },
};
</script>

<style scoped>
  .Button {
    padding: 8px 28px;
    border-radius: 20px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: none;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    color: #282828;
    background: #bababb;
  }

  /* Theme Modifiers */
  .Button--primary { color: #fff; background: #2b4ac5 }
  .Button--secondary { color: #fff; background: #953084 }

  /* Size Modifiers */
  .Button--small {padding: 4px 18px; font-size: 9px }
  .Button--medium {padding: 8px 28px; font-size: 14px }
  .Button--large {padding: 12px 32px; font-size: 22px }

  .Button:disabled {
    opacity: .5;
    pointer-events: none;
  }
</style>
