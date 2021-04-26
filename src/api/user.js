/*
 * @Author: your name
 * @Date: 2021-04-26 21:41:00
 * @LastEditTime: 2021-04-26 23:18:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop-admin/src/api/user.js
 */
import request from '@/utils/request'

export function init() {
  return request({
    url: '/init',
    method: 'post',
    data: { channel: '1' }
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return new Promise((resolve, reject) => {
    const userInfo = localStorage.getItem('userInfo')
    resolve(JSON.parse(userInfo))
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
