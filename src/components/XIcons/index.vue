<template>
  <icon-font :type="type" v-bind="$props" />
</template>
<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4005471_axm571nkng.js'
})
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    IconFont
  }
}
</script>
<style lang="less" scoped>
.anticon {
  font-size: 20px;
}
</style>
