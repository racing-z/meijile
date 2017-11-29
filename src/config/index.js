((doc, win) => {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    } else {
      if (clientWidth < 760) {
        docEl.style.fontSize = 16 * (clientWidth / 300) + 'px'
      } else if (clientWidth >= 760 && clientWidth <= 1000) {
        docEl.style.fontSize = 16 * (clientWidth / 633) + 'px'
      } else if (clientWidth > 1000) {
        docEl.style.fontSize = 16 * (clientWidth / 766) + 'px'
      }
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

//  alert 弹窗
let dialogStyle = {
  // 弹窗样式
  boxStyle: {
    width: '300px',
    height: '150px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginLeft: '-150px',
    zIndex: '999',
    textAlign: 'center',
    lineHeight: '150px'
  },
  // 弹窗标题头样式
  boxHeadStyle: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '30px',
    backgroundColor: '#7e57c2',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  // 弹窗按钮框样式
  boxButtonStyle: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    height: '35px'
  },
  // 按钮样式
  buttonStyle: {
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    width: '70px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    outline: 'none',
    float: 'right',
    margin: '0 13%'
  }
}
// tip弹窗
let tipStyle = {
  // 弹窗样式
  boxStyle: {
    width: '10rem',
    height: '1.5rem',
    backgroundColor: '#76B04C',
    color: '#fff',
    borderRadius: '5px',
    position: 'absolute',
    top: '6%',
    left: '50%',
    marginLeft: '-5rem',
    zIndex: '999',
    textAlign: 'center',
    opacity: '0',
    lineHeight: '1.5rem'
  }
}

function fadein (ele, opacity, speed) {
  if (ele) {
    let v = ele.style.opacity * 1
    let count = speed / 1000
    // let avg = count < 2 ? (opacity / count) : (opacity / count - 1)
    let avg = (opacity - v * 100) / speed
    let timer = setInterval(function () {
      if (v < opacity / 100) {
        v += avg
        // setOpacity(ele, v)
        ele.style.opacity = v
      } else {
        clearInterval(timer)
      }
    }, 50)
  }
}
function fadeout (ele, opacity, speed) {
  if (ele) {
    let v = ele.style.opacity * 1
    let avg = (v * 100 - opacity) / speed
    let timer = setInterval(function () {
      if (v - avg > opacity) {
        v -= avg
        // setOpacity(ele, v)
        ele.style.opacity = v
      } else {
        clearInterval(timer)
      }
    }, 50)
  }
}

window.alert = function () {
  // 创建一个大盒子
  let box = document.createElement('div')
  // 创建一个标题头
  let boxHead = document.createElement('div')
  // 创建一个按钮组合框
  let boxButton = document.createElement('div')
  // 创建一个按钮
  let button1 = document.createElement('button')
  let button2 = document.createElement('button')

  // 给弹窗添加元素
  for (let k in dialogStyle.boxStyle) {
    box.style[k] = dialogStyle.boxStyle[k]
  }
  for (let k in dialogStyle.boxHeadStyle) {
    boxHead.style[k] = dialogStyle.boxHeadStyle[k]
  }
  for (let k in dialogStyle.boxButtonStyle) {
    boxButton.style[k] = dialogStyle.boxButtonStyle[k]
  }
  for (let k in dialogStyle.buttonStyle) {
    button1.style[k] = dialogStyle.buttonStyle[k]
  }
  for (let k in dialogStyle.buttonStyle) {
    button2.style[k] = dialogStyle.buttonStyle[k]
  }
  // 把创建的元素添加到body中
  document.body.appendChild(box)
  // 把alert传入的内容添加到box中
  if (arguments[0]) {
    box.innerHTML = arguments[0]
  }
  button1.innerHTML = '关闭'
  boxButton.appendChild(button1)
  // 把按钮盒子添加到box中
  box.appendChild(boxButton)
  // 把boxHead添加到box中
  box.appendChild(boxHead)
  // 给按钮添加单击事件
  button1.addEventListener('click', function () {
    box.style.display = 'none'
  })
}
window.tip = function () {
  // 创建一个大盒子
  let box = document.createElement('div')

  // 给弹窗添加元素
  for (let k in tipStyle.boxStyle) {
    box.style[k] = tipStyle.boxStyle[k]
  }
  // 把创建的元素添加到body中
  document.body.appendChild(box)
  fadein(box, 100, 1000)
  // 把alert传入的内容添加到box中
  if (arguments[0]) {
    box.innerHTML = arguments[0]
  }
  setTimeout(function () {
    fadeout(box, 0, 1000)
  }, 1000)
}
