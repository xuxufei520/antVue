import moment from 'moment'
const ranges = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨日: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
  本周: [moment().startOf('week').startOf('day'), moment().endOf('day').endOf('day')],
  上周: [
    moment().startOf('week').subtract(1, 'weeks').startOf('day'),
    moment().endOf('week').subtract(1, 'weeks').endOf('day')
  ],
  本月: [moment().startOf('month').startOf('day'), moment().endOf('day').endOf('day')],
  上月: [
    moment().startOf('month').subtract(1, 'months').startOf('day'),
    moment().endOf('month').subtract(1, 'months').endOf('day')
  ],
  本季度: [moment().startOf('quarter').startOf('day'), moment().endOf('day').endOf('day')],
  上季度: [
    moment().startOf('quarter').subtract(1, 'quarters').startOf('day'),
    moment().endOf('quarter').subtract(1, 'quarters').endOf('day')
  ],
  过去3天: [moment().subtract(3, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
  过去7天: [moment().subtract(7, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
  过去15天: [moment().subtract(15, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
  过去30天: [moment().subtract(30, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
  过去60天: [moment().subtract(60, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')]
}
export default { ranges }
