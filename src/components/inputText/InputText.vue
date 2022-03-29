<template>
  <div class="InputText" :class="classes">
    <label class="InputText__label">{{ label }}</label>
    <input
      class="InputText__form"
      v-on:input="$emit('inputLibChange', $event.target.value)"
      type="text"
      :placeholder="placeholder" />
  </div>

</template>

<script>
export default {
  name: 'InputText',
  props: {
    placeholder: {
      type: String,
      default: 'Input Placeholder'
    },
    label: {
      type: String,
      default: 'Input Label'
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
  computed: {
    classes() {
      return `InputText--${this.size}`;
    },
  },
};
</script>

<style scoped>

.InputText {
  --input-color: #99A3BA;
  --input-border: #CDD9ED;
  --input-background: #fff;
  --input-placeholder: #CBD1DC;

  --input-border-focus: #275EFE;

  --group-color: var(--input-color);
  --group-border: var(--input-border);
  --group-background: #EEF4FF;

  --group-color-focus: #fff;
  --group-border-focus: var(--input-border-focus);
  --group-background-focus: #678EFE;
}

.InputText__label {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
}

.InputText__form {
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: var(--input-color);
  border: 1px solid var(--input-border);
  background: var(--input-background);
  transition: border .3s ease;
}

.InputText--small .InputText__form {padding: 2px 6px; font-size: 9px; line-height: 15px; }
.InputText--medium .InputText__form {padding: 8px 16px; font-size: 14px; line-height: 25px; }
.InputText--large .InputText__form {padding: 12px 32px; font-size: 22px; line-height: 35px; }
</style>
