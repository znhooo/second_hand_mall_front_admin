import request from '@/utils/request'

export default{
  
  getList(current,limit,searchObj) {
    return request({
      url: `admin/good/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  deleteById(id){
    return request({
      url: `admin/good/${id}`,
      method: 'delete',
    })
  },

  updateById(goodInfo) {
    return request({
      url: "admin/good",
      method: 'put',
      data: goodInfo
    })
  },

  batchDelete(idList) {
    return request({
      url: "admin/good/batch",
      method: 'delete',
      data: idList
    })
  },

  insert(goodInfo){
    return request({
      url: "admin/good",
      method: "post",
      data: goodInfo
    })
  },
  getById(id){
    return request({
      url: `admin/good/${id}`,
      method: "get",
    })
  }

} 