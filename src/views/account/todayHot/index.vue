<template>
  <div class="main">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="news"> <news></news> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import news from './news.vue'
export default {
  components: { news },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
}
</style>
