<template>
  <a-range-picker
    format="YYYY-MM-DD HH:mm:ss"
    showTime
    :placeholder="['开始时间', '结束时间']"
    @change="chooseTime"
    :ranges="ranges"
  >
  </a-range-picker>
</template>

<script>
import dataOption from './index'
export default {
  props: {
    rangesKeys: {
      type: Array,
      default: () => Object.keys(dataOption.ranges)
    }
  },
  watch: {
    rangesKeys: {
      handler (value) {
        const ranges = new Map()
        value.forEach((item) => {
          ranges.set(item, dataOption.ranges[item])
        })
        const obj = Array.from(ranges).reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
        this.ranges = obj
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      ranges: {}
    }
  },
  created () {},
  methods: {
    chooseTime (date, dateString) {
      this.$emit('change', dateString)
    }
  }
}
</script>
