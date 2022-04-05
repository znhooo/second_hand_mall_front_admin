<template>
<div class="app-container">
    <el-form ref="form" :model="userInfo" label-width="80px">
    <el-form-item label="昵称">
      <el-input v-model="userInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userInfo.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
        <el-input v-model="userInfo.phone"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="userInfo.sex" placeholder="请选择性别">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="insertOrUpdate()">
        <span v-if="userInfo.id == null">立即创建</span>
        <span v-if="userInfo.id != null">立即修改</span>
    </el-button>

    </el-form-item>
  </el-form>
</div>
  
</template>

<script>
import user from "@/api/user";

export default {
    data(){
        return{
            userInfo : {}
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id) {
         const id = this.$route.params.id
         this.getById(id)
      } else {
         //表单数据清空
         this.hospitalSet = {}
      }
    },
    methods: {
        insert(){
            user.insert(this.userInfo).then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: '添加成功!'
               })
               //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/user/list'})
            })
        },
        update(){
            user.updateById(this.userInfo).then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: '修改成功!'
               })
               //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/user/list'})
            })
        },
        getById(id){
            user.getById(id).then(response => {
               this.userInfo = response.data
               console.log(this.userInfo)
            })
        },
        insertOrUpdate() {
         //判断添加还是修改
         if(!this.userInfo.id) { //没有id，做添加
            this.insert();
         }else {//修改
            this.update()
         }
      }
    }
}
</script>

<style>
</style>