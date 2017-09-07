((doc, win) => {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    } else {
      if (clientWidth < 760) {
        docEl.style.fontSize = 16 * (clientWidth / 1000) + 'px'
      } else if (clientWidth >= 760 && clientWidth <= 1000) {
        docEl.style.fontSize = 16 * (clientWidth / 1900) + 'px'
      } else if (clientWidth > 1000) {
        docEl.style.fontSize = 16 * (clientWidth / 2300) + 'px'
      }
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
