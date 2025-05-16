<template>
  <component :is="() => formattedContent" />
</template>

<script setup>
import { computed, h, Fragment } from 'vue'
import { useTextFormatter } from '~/composables/useTextFormatter'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  removePrefix: {
    type: Boolean,
    default: false
  }
})

const { formatTextWithCode } = useTextFormatter()

const cleanText = computed(() => {
  if (props.removePrefix) {
    // Remove A), B), C), D) prefixes from the start of the text
    return props.text.replace(/^[A-D]\)\s*/, '')
  }
  return props.text
})

const formattedContent = computed(() => {
  const components = formatTextWithCode(cleanText.value)
  return h(Fragment, {}, components)
})
</script>