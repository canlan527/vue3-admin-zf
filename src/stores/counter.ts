import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // vue3 中的 setup 函数
  const count = ref(0)
  const increment = () => {
    count.value++
  }

  return {
    count,
    increment
  }
})
