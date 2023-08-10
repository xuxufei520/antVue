// JS获取图片和视频的宽高
export const getVideoMsg = (file) => {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file)
    videoElement.onloadedmetadata = () => {
      resolve({
        duration: videoElement.duration,
        height: videoElement.videoHeight,
        width: videoElement.videoWidth
      })
    }
  })
}
export const getImgInfo = (files) => {
  return new Promise((resolve) => {
    const url = window.URL || window.webkitURL
    const img = new Image()
    img.src = url.createObjectURL(files.raw)
    img.onload = () => {
      resolve({
        height: img.width,
        width: img.height
      })
    }
  })
}
