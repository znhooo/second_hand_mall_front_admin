import request from '@/utils/request'

export default{
  
  getList(current,limit,searchObj) {
    return request({
      url: `admin/order/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  deleteById(id){
    return request({
      url: `admin/order/${id}`,
      method: 'delete',
    })
  },

  updateById(orderInfo) {
    return request({
      url: "admin/order",
      method: 'put',
      data: orderInfo
    })
  },

  batchDelete(idList) {
    return request({
      url: "admin/order/batch",
      method: 'delete',
      data: idList
    })
  },

  insert(orderInfo){
    return request({
      url: "admin/order",
      method: "post",
      data: orderInfo
    })
  },
  getById(id){
    return request({
      url: `admin/order/${id}`,
      method: "get",
    })
  }

} 