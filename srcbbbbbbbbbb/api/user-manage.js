import axios from '@/utils/request.js'

// 获取用户列表数据 post --> data:{} get --->params:{}
export const getUser = (data) => {
  return axios.request({
    url: '/user-manage/list',
    method: 'GET',
    params: data
  })
}
