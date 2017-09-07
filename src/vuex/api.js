import axios from 'axios'

let url = process.env.NODE_ENV !== 'production' ? '/api/' : 'http://47.94.136.171:8080/api/'

const funcAxios = (api, cb) => {
  axios.get(api).then(function (res) {
    if (res.status >= 200 && res.status < 300) {
      cb(res.data)
    }
  }).catch((error) => {
        // new Error('desc');
    return Promise.reject(error)
  })
}
export default {
  getBannerList: (cb) => funcAxios(url + 'billboard/home?t=' + new Date() * 1, cb),
  toLogin: (mobile, password, cb) => {
    // axios({
    //   method: 'post',
    //   url: url + 'login',
    //   data: {
    //     mobile: parseInt(mobile),
    //     password: parseInt(password)
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Length': 34
    //   }
    // })
    axios.post(url + 'login', {
      mobile: parseInt(mobile),
      password: parseInt(password)
    })
  }
}
