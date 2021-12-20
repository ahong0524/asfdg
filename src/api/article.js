import axios from '@/utils/request.js'

// 获取所有文章列表
export const getArticleList = (data) => {
  return axios.request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}
