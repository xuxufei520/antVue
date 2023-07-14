<template>
  <div class="resize_container">
    <div class="resize_ele" id="target" :style="{ width: initWidth + 'px' }">
      <slot name="resize"></slot>
      <div class="cover" v-if="isMoving"></div>
    </div>
    <div class="resize_line" @mousedown="mouseDown"></div>
    <div class="other_ele">
      <slot></slot>
      <div class="cover" v-if="isMoving"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResizeWidth',
  props: {
    width: {
      type: [Number, String],
      default: 240,
    },
    minWidth: {
      type: [Number, String],
      default: 150,
    },
    maxWidth: {
      type: [Number, String],
      default: 700,
    },
  },
  data() {
    return {
      lastX: '',
      initWidth: '',
      isMoving: false,
    }
  },
  created() {},
  mounted() {
    this.initWidth = this.width
    document.addEventListener('mouseup', this.mouseUp)
    const element = document.getElementById('target').firstElementChild
    element.style.width = '100%'
  },
  destroyed() {
    document.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    mouseDown(event) {
      this.isMoving = true
      document.addEventListener('mousemove', this.mouseMove)
      this.lastX = event.screenX
    },
    mouseMove(event) {
      this.isMoving = true
      this.widthChange(this.lastX - event.screenX)
      this.lastX = event.screenX
    },
    mouseUp() {
      this.lastX = ''
      this.isMoving = false
      document.removeEventListener('mousemove', this.mouseMove)
    },
    widthChange(movement) {
      this.initWidth -= movement
      if (this.initWidth < this.minWidth) {
        this.initWidth = this.minWidth
      }
      if (this.initWidth > this.maxWidth) {
        this.initWidth = this.maxWidth
      }
    },
  },
}
</script>
<style lang="less" scoped>
.resize_container {
  display: flex;
  .resize_ele {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .resize_line {
    width: 5px;
    cursor: ew-resize;
    position: relative;
    z-index: 10;
    background: #e8e8e8;
  }
  .other_ele {
    flex: 1;
    position: relative;
  }
  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #e8e8e8;
    opacity: 0.7;
  }
}
</style>
