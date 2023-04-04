import request from '@/utils/request'
const GDKey = '3af4f0cc0a04a7dc4b0e642a06670718'
const Api = {
  getWeather: 'https://restapi.amap.com/v3/weather/weatherInfo?key=' + GDKey
}

/** https://lbs.amap.com/api/webservice/guide/api/weatherinfo  */
export function getWeather (params) {
  return request({
    url: Api.getWeather,
    method: 'get',
    params
  })
}
