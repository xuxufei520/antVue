<template>
  <a-card :bordered="false" id="query_bar_card" class="query_bar_card">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <slot name="extendRow"></slot>
        <a-row :gutter="24">
          <a-col
            style="padding-left: 0; padding-right: 0"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            :xxl="6"
            v-for="(item, index) in labelList"
            :key="index"
          >
            <a-form-item :label="item.includes('hide') ? null : item" style="margin-bottom: 32px">
              <slot :name="item"></slot>
            </a-form-item>
          </a-col>
          <slot name="extendCol"></slot>
          <a-col
            v-if="showBtn"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            :xxl="6"
            class="float"
            style="padding-left: 0; padding-right: 0"
          >
            <a-form-item>
              <span class="querybar_submit_buttons">
                <slot name="buttons">
                  <a-button @click="refreshQuery">{{ refreshQueryBtnText }}</a-button>
                  <a-button type="primary" @click="query" :loading="loading">{{ queryBtnText }}</a-button>
                </slot>
              </span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    // label名称集合
    labelList: {
      type: Array,
      default: () => []
    },
    // 默认label样式支持5个字的宽度  如果超出则传入label宽度
    labelMinWidth: {
      type: [Number, String],
      default: 85
    },
    // 支持权限控制按钮是否显示
    showBtn: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    queryBtnText: {
      type: String,
      default: '查询'
    },
    refreshQueryBtnText: {
      type: String,
      default: '重置'
    }
  },
  mounted () {
    this.setLabelWidth()
    window.addEventListener('resize', this.setLabelWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setLabelWidth)
  },
  methods: {
    setLabelWidth () {
      const barList = document.getElementsByClassName('query_bar_card') || []
      Array.from(barList).forEach((eachBar) => {
        const target = eachBar.getElementsByTagName('label')
        Array.from(target).forEach((item) => {
          item.style.display = 'block'
          item.style.minWidth = this.labelMinWidth + 'px'
        })
      })
    },
    query () {
      this.$emit('query')
    },
    refreshQuery () {
      this.$emit('refreshQuery')
    }
  },
  watch: {
    // 切换labelList重置label
    labelList: {
      deep: true,
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          this.setLabelWidth()
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
#query_bar_card {
  :deep(.ant-card-body) {
    padding: 24px 36px;
    padding-bottom: 0;
  }
  .table-page-search-wrapper {
    .ant-form-inline {
      .ant-form-item {
        display: flex;
        margin-bottom: 24px;
        margin-right: 0;

        > :deep(.ant-form-item-label) {
          line-height: 32px;
          padding-right: 8px;
          width: auto;
        }
        :deep(.ant-form-item-control-wrapper) {
          flex: 1 1;
          display: inline-block;
          vertical-align: middle;
          // overflow: hidden;
          .ant-form-item-control {
            height: 32px;
            line-height: 32px;
          }
        }
      }
    }
  }

  .float {
    float: right;
    .querybar_submit_buttons {
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      :deep(button) {
        &:first-child {
          margin-left: 0;
        }
        margin-left: 16px;
      }
    }
  }
}
</style>
