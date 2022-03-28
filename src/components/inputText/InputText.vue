<template>
  <input
    class="InputText"
    v-on:input="$emit('inputLibChange', $event.target.value)"
    type="text"
    placeholder="Placeholder" />
</template>

<script>
export default {
  name: 'InputText',
  methods: {

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

  display: block;
  width: 100%;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: var(--input-color);
  border: 1px solid var(--input-border);
  background: var(--input-background);
  transition: border .3s ease;
}
</style>
