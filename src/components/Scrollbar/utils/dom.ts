import Vue from 'vue'

const isServer = Vue.prototype.$isServer

export const on = (() => {
  if (!isServer && document.addEventListener) {
    return (element: Document, event: string, handler: (e: any) => any) => {
      element.addEventListener(event, handler, false)
    }
  } else {
    return (element: any, event: string, handler: (e: any) => any) => {
      if (element && event && handler) {
        element.attachEvent(`on${event}`, handler)
      }
    }
  }
})()

export const off = (() => {
  if (!isServer && document.removeEventListener) {
    return (element: Document, event: string, handler: (e: any) => any) => {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return (element: any, event: string, handler: (e: any) => any) => {
      if (element && event) {
        element.detachEvent(`on${event}`, handler)
      }
    }
  }
})()
