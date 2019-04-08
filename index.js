import {BackHandler, Platform} from 'react-native'

/**
 * Android后退事件总监听器，堆栈模式 先入后执行
 */

export default class BackStack {
  static isBind = false

  static events = []

  // 绑定事件
  static bind(event) {
    if (Platform.OS === 'android') {
      BackStack.events.unshift(event)
      if (!BackStack.isBind) BackStack.addEventListener()
    }
  }

  // 解绑事件
  static unbind(event) {
    if (Platform.OS === 'android') {
      const index = BackStack.events.findIndex(func => func === event)
      if (index > -1) BackStack.events.splice(index, 1)
      if (!BackStack.events.length) BackStack.removeEventListener()
    }
  }

  // 退出App
  static exitApp() {
    if (Platform.OS === 'android') {
      BackStack.events = []
      BackStack.removeEventListener()
      BackHandler.exitApp()
    }
  }

  // 事件顺序处理
  static backHandler() {
    const event = BackStack.events[0]
    return event && event()
  }

  static addEventListener() {
    BackHandler.addEventListener('hardwareBackPress', BackStack.backHandler)
    BackStack.isBind = true
  }

  static removeEventListener() {
    BackHandler.removeEventListener('hardwareBackPress', BackStack.backHandler)
    BackStack.isBind = false
  }
}
