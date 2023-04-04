<template>
  <div class="main">
    <WordCloud :wordList="wordList"></WordCloud>
  </div>
</template>

<script>
import WordCloud from '@/components/WordCloud/index.vue'
export default {
  components: { WordCloud },
  props: {},
  data () {
    return {
      wordList: [{ name: '测试1' }, { name: '测试2' }, { name: '测试3' }, { name: '测试4' }, { name: '测试5' }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.main {
}
</style>
