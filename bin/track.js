var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }

    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve) {
        resolve(result.value)
      }).then(fulfilled, rejected)
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
var track;
(function(track) {
  function init(pname, sname, pid, cid) {
    track.projectName = pname
    track.skinName = sname
    track.plat_id = pid
    track.channel_id = cid
    // 获取唯一码（设备码）
    track.uuid = window.localStorage.getItem('uuid')
    if (!track.uuid)
      track.uuid = track.generateUUID()
    window.localStorage.setItem('uuid', track.uuid)
    //读取错误列表
    track.dataError = window.localStorage.getItem('dataError')
      ? JSON.parse(window.localStorage.getItem('dataError'))
      : []
    sendError()
    window.onerror = function(messageParam, url, line, col, error) {
      if (messageParam.detail !== undefined) {
        const { message, filename, lineno, colno, error, tagName, src } = messageParam.detail;
        if (tagName === "SCRIPT") {
          pushError({ message: message || "脚本加载错误", src, error }, 1);
        }
        sendError();
      }
    }

    window.addEventListener('error', function(event) {
      if (!event.detail) {
        const { message, filename, lineno, colno, error } = event;
        const detail = { message, filename, lineno, colno, error };
        if (!(message && error)) {
          const { tagName, src } = event.target;
          detail.tagName = tagName
          detail.src = src
          detail.error = new Error("自定义error")
          const errorEvent = new CustomEvent('error', {
            detail
          })
          window.dispatchEvent(errorEvent)
        } else {
            pushError({ message, filename, lineno, colno, error }, 1);
            sendError();
        }
      }
    }, true)
  }

  track.init = init

  /**添加一个错误信息 */
  function pushError(err, type = 2) {
    // console.log('pushErrorSUCCESS')
    if (typeof err === 'object')
      err = JSON.stringify(err)
    const error_data = {
      pn: track.projectName,
      sn: track.skinName,
      path: window.location.pathname,
      pid: track.plat_id,
      cid: track.channel_id,
      ua: navigator.userAgent,
      uuid: track.uuid,
      msg: err,
      type: type,
      t: new Date().getTime()
    }
    track.dataError.push({ error_data: JSON.stringify(error_data) })
  }

  track.pushError = pushError

  /**发送错误 */
  function sendError() {
    // console.log('sendErrorSUCCESS')
    saveToStorage()
    while (track.dataError.length > 0) {
      const err = track.dataError.shift()
      if (err) {
        track.client_log_v1_error_store(err)
          .then(() => saveToStorage())
          .catch(() => track.dataError.push(err))
      }
    }
  }

  track.sendError = sendError

  /**保存到本地 */
  function saveToStorage() {
    window.localStorage.setItem('dataError', JSON.stringify(track.dataError))
  }
})(track || (track = {}))
/**
 * 全局属性和方法
 */
var track
/**
 * 全局属性和方法
 */
(function(track) {
  /**
   * 获取UUID
   */
  function generateUUID() {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
  }

  track.generateUUID = generateUUID

  /**
   * 获取URL参数
   * @param value
   */
  function getQueryVariable(value) {
    // const query = window.location.search.substring(1);
    let query = window.localStorage.getItem('query')
    if (!query)
      query = window.location.search.substring(1)
    const vars = query.split('&')
    for (const item of vars) {
      const idx = item.search('=')
      if (item.substring(0, idx) == value) {
        return item.substr(idx + 1)
      }
    }
    return null
  }

  track.getQueryVariable = getQueryVariable

  /**
   * 是否为移动设备
   */
  function isMobile() {
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag
  }

  track.isMobile = isMobile

  /**是否android */
  function isAndroid() {
    const flag = navigator.userAgent.match(/(Android)/i)
    return flag
  }

  track.isAndroid = isAndroid

  /**是否IOS */
  function isIOS() {
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i)
    return flag
  }

  track.isIOS = isIOS
})(track || (track = {}))
var track;
(function(track) {
  track.version = '1.0.0'
  track.host = 'https://clientlogapi.testjj9.com'
  track.projectName = ''
  track.skinName = ''
  track.uuid = ''
  track.plat_id = 0
  track.channel_id = 0
  /**错误数据列表 */
  track.dataError = []
  /**打点数据列表 */
  track.dataPoint = []
})(track || (track = {}))
var track;
(function(track) {
  function client_log_v1_error_store(data) {
    return __awaiter(this, void 0, void 0, function* () {
      fetch(`${track.host}/client_log/v1/error/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
    })
  }

  track.client_log_v1_error_store = client_log_v1_error_store
})(track || (track = {}))
