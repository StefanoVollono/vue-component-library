<template>
  <div
    class="InputText"
    :class="{ 'InputText--small': smallSize }"
  >
    <label class="InputText__label">{{ label }}</label>
    <input
      class="InputText__form"
      v-on:input="$emit('inputLibChange', $event.target.value)"
      type="text"
      :placeholder="placeholder"
    />
  </div>

</template>

<script>
export default {
  name: 'InputText',
  props: {
    placeholder: {
      type: String,
      default: 'Input Placeholder',
    },
    label: {
      type: String,
      default: 'Input Label',
    },
    smallSize: {
      type: Boolean,
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

.InputText__label {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  display: block;
  line-height: 1;
  margin-bottom: 3px;
}

.InputText__form {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 25px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: #99A3BA;
  border: 1px solid #CDD9ED;
  background: #f5f5f5;
  transition: border .3s ease;
}

.InputText--small .InputText__form {padding: 4px; font-size: 9px; line-height: 15px; }
.InputText--small .InputText__label { font-size: 10px }
</style>
