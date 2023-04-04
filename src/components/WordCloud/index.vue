<template>
  <div id="world-cloud-3d" class="world-cloud-3d">
    <canvas id="world-cloud-canvas" :width="canvasWidth" :height="canvasHeight"> </canvas>
    <div style="display: none" id="weightTags"></div>
  </div>
</template>
<script>
import './tagCanvas'
export default {
  data () {
    return {
      canvasWidth: 400,
      canvasHeight: 500
    }
  },
  props: {
    /**
     * name:'词云关键字'
     * style:'文字样式'
     */
    wordList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    wordList () {
      this.startWorldCloud(true)
    }
  },
  mounted () {
    this.startWorldCloud()
  },
  methods: {
    // 启动词云
    startWorldCloud (updateFlag) {
      const parentEle = document.getElementById('world-cloud-3d')
      this.canvasWidth = parentEle.clientWidth
      this.canvasHeight = parentEle.clientHeight
      this.createTagListDom()
      //* *https://www.goat1000.com/tagcanvas-examples.php */
      const option = {
        padding: 10,
        maxSpeed: 0.05, // 添加最大的运动速度
        minSpeed: 0.01, // 添加最小的运动速度这样就可以保证一直运动，不会停止
        outlineMethod: 'none', // tag hover 之后的 轮廓效果
        fadeIn: 800,
        depth: 0.97,
        minBrightness: 0.4,
        wheelZoom: false, // 滚轮缩放
        reverse: true, // 运动方向与鼠标移动方向相反
        stretchX: 0.8, // Stretch or compress the cloud horizontally. 水平拉伸词云
        initial: [0.1, 0.1], // 给词云添加一个初始的运动方向
        textFont: null, // 字体设置为 null 就会继承 每个 tag的a 标签的字体
        textColour: null, // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
        weight: true // weight 打开，就可以根据默认的字体的大小作为权重，对tag 的样式进行调整
      }
      try {
        // 如果不是更新，说明是第一次渲染，就启动 tagcanvas, 否则就代表更新
        if (!updateFlag) {
          //  eslint-disable-next-line
          TagCanvas.Start('world-cloud-canvas', 'weightTags', option)
        } else {
          //  eslint-disable-next-line
          TagCanvas.Update('world-cloud-canvas')
        }
      } catch (e) {}
    },
    // 根据父组件传过来的 wordList 创建 TagList Dom列表，放到页面中供，canvas 渲染
    createTagListDom () {
      const wordList = this.wordList.length > 0 ? [...this.wordList] : [{ name: '暂无数据' }]
      const fragment = new DocumentFragment()
      wordList.forEach((item) => {
        const a = document.createElement('a')
        // 字符串长度大于10就要换行
        if (item.name && item.name.length > 10) {
          const charArr = item.name.split('')
          charArr.splice(10, 0, '<br>')
          item.name = charArr.join('')
        }
        a.innerHTML = item.name
        a.href = 'javascript:void(0)'
        if (item.style) {
          let styleStr = ''
          for (const key in item.style) {
            if (Object.hasOwnProperty.call(item.style, key)) {
              const element = item.style[key]
              styleStr += key + ':' + element + ';'
            }
          }
          a.setAttribute('style', styleStr)
        }
        fragment.append(a)
      })
      // 更新 tagContainer中的 tag元素
      const tagsContainer = document.querySelector('#weightTags')
      tagsContainer.innerHTML = ''
      tagsContainer.append(fragment)
    }
  }
}
</script>
<style lang="less">
.world-cloud-3d {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #weightTags {
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 12px;
  }
}
</style>
