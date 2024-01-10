<template>
  <XPageTab :pageList="pageList" sessionKey="sessionKey">
    <template v-slot:default="{ pageInfo }">
      <page :pageInfo="pageInfo"></page>
    </template>
  </XPageTab>
</template>
<script>
import page from './pageList'
export default {
  components: { page },
  data () {
    return {
      pageList: [
        {
          auth: '',
          title: '',
          path: '',
          name: ''
        }
      ]
    }
  }
}
</script>
