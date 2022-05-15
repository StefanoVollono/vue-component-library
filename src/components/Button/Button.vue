<template>
  <button
    class="Button"
    :class="sizeClasses"
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
    sizeClasses() {
      return `Button--${this.size}`;
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
    color: #fff;
    background: #304495;
  }

  .Button--small {padding: 4px 18px; font-size: 9px }
  .Button--medium {padding: 8px 28px; font-size: 14px }
  .Button--large {padding: 12px 32px; font-size: 22px }

  .Button:disabled {
    opacity: .7;
    pointer-events: none;
  }
</style>
