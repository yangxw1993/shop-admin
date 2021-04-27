import request from '@/utils/request'

const createProduct = (data) => {
  return request({
    url: '/product/create_product',
    data,
    method: 'post'
  })
}
const updateProduct = (data) => {
  return request({
    url: '/product/update_product',
    data,
    method: 'post'
  })
}

export {
  createProduct,
  updateProduct,
}
