<template>
  <a-spin :spinning="loading">
    <div class="main">
      <a-space>
        <span v-if="province"><XIcons type="icon-location" /> {{ province }}</span>
        <span v-if="city !== province">-{{ city }}</span>
        <span>{{ weather.weather }}</span>
        <span v-if="weather.humidity_float">{{ weather.humidity_float }}℃</span>
      </a-space>
    </div>
  </a-spin>
</template>

<script>
import XIcons from '@/components/XIcons/index.vue'
export default {
  components: { XIcons },
  props: {},
  data () {
    return {
      GDKey: '3af4f0cc0a04a7dc4b0e642a06670718',
      province: '',
      city: '',
      weather: {},
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getLocationInfo()
  },
  methods: {
    async getLocationInfo (params) {
      try {
        const { status, info, province, city, adcode } = await this.getLocation(params)
        if (status === '1') {
          console.log(province, city, adcode)
          this.province = province
          this.city = city
          this.getWeatherInfo({ city: adcode })
        } else {
          this.$message.error(info)
        }
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    async getLocation () {
      try {
        this.loading = true
        const url = `https://restapi.amap.com/v3/ip?key=${this.GDKey}`
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async getWeatherInfo (params) {
      try {
        const { status, info, lives } = await this.getWeather(params)
        if (status === '1') {
          this.weather = lives[0]
        } else {
          this.$message.error(info)
        }
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    // 可选值：base/all base:返回实况天气 all:返回预报天气
    async getWeather ({ city = '310000', extensions = 'base' }) {
      try {
        this.loading = true
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${this.GDKey}&city=${city}&extensions=${extensions}`
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 可选值：base/all base:返回实况天气 all:返回预报天气
    async getMap ({ city = '310000', extensions = 'base' }) {
      try {
        this.loading = true
        const url = `https://restapi.amap.com/v3/staticmap?key=${this.GDKey}&location=${city}&extensions=${extensions}`
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
}
</style>
