<template>
  <div>
    <a-tabs
      :activeKey="activeKey"
      @change="callback"
      :animated="false"
      size="large"
      type="card"
      :tabBarGutter="10"
      class="page_tab"
    >
      <a-tab-pane :key="page.key" :tab="page.title" v-for="page in authPageList">
        <slot :pageInfo="page"></slot>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  props: {
    sessionKey: {
      // 需要缓存的 sessionStorage key
      type: String,
      default: ''
    },
    /**
   *  pageList 配置的页面信息
   * [
   *  {
    *   auth: ’权限标识‘,
        title: '页面标题',
        path: '路由地址 非必填 一般用于嵌套外部页面使用',
        name: '路由名称 唯一值'
   *  }
   * ]

   */
    pageList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeKey: JSON.parse(sessionStorage.getItem(this.sessionKey) || 0)
    }
  },
  computed: {
    authPageList () {
      // $auth
      const list = this.pageList.filter((page) => this.$auth(page.auth))
      list.forEach((item, index) => {
        item.key = index
      })
      return list
    }
  },
  mounted () {
    if (!this.authPageList[this.activeKey]) {
      this.activeKey = 0
    }
    if (this.authPageList.length === 0) {
      console.log('没有tab按钮权限')
    } else {
      this.callback(this.activeKey)
    }
  },
  methods: {
    callback (key) {
      this.activeKey = key
      sessionStorage.setItem(this.sessionKey, key)
    }
  }
}
</script>
<style lang="less" scoped>
.page_tab {
  :deep(.ant-tabs-bar) {
    .ant-tabs-tab-active {
      background-color: @main-color;
      color: #fff;
    }
  }
}
</style>
