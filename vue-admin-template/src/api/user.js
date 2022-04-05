import request from '@/utils/request'

export default{
  
  getList(current,limit,searchObj) {
    return request({
      url: `admin/user/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  deleteById(id){
    return request({
      url: `admin/user/${id}`,
      method: 'delete',
    })
  },

  updateById(userInfo) {
    return request({
      url: "admin/user",
      method: 'put',
      data: userInfo
    })
  },

  batchDelete(idList) {
    return request({
      url: "admin/user/batch",
      method: 'delete',
      data: idList
    })
  },

  insert(userInfo){
    return request({
      url: "admin/user",
      method: "post",
      data: userInfo
    })
  },
  getById(id){
    return request({
      url: `admin/user/${id}`,
      method: "get",
    })
  }

} 