import axios from '@/libs/api.request'
export const uploadImg = () => {
  return axios.request({
    url: '/upload_file',
    data: { "channel": "1"},
    headers:{

    },
    method: 'post'
  })
}
