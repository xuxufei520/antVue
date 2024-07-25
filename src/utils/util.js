export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
/**
 * description 计算区间总时长 (去除重叠区间)
 * @param intervals : number[][]
 * @returns totalDuration
 */
export const calculateTotalDuration =  (intervals) => {
  // 假设intervals是一个二维数组，其中每个子数组包含两个元素：[startTime, endTime]

  // 按照开始时间排序
  intervals.sort((a, b) => a[0] - b[0]);

  let stack = []; // 用于存储当前活动的区间
  let totalDuration = 0;

  for (let i = 0; i < intervals.length; i++) {
      const [start, end] = intervals[i];

      // 如果栈为空或当前区间与栈顶区间不重叠，推入栈中
      if (stack.length === 0 || stack[stack.length - 1][1] <= start) {
          stack.push([start, end]);
      } else { // 否则，更新栈顶区间的结束时间
          stack[stack.length - 1][1] = Math.max(stack[stack.length - 1][1], end);
      }
  }

  // 累加栈中所有区间的时长
  for (let i = 0; i < stack.length; i++) {
      const [start, end] = stack[i];
      totalDuration += end - start;
  }

  return totalDuration;
}