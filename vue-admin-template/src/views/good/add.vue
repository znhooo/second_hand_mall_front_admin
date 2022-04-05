<template>
<div class="app-container">
    <el-form ref="form" :model="goodInfo" label-width="80px">
    <el-form-item label="商品名">
      <el-input v-model="goodInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="商品描述">
      <el-input v-model="goodInfo.description"></el-input>
    </el-form-item>
    <el-form-item label="发布地点">
        <el-input v-model="goodInfo.site"></el-input>
    </el-form-item>
    <el-form-item label="发布者">
        <el-input v-model="goodInfo.userId"></el-input>
    </el-form-item>
    <el-form-item label="购买者">
        <el-input v-model="goodInfo.buyUserId"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="goodInfo.status" placeholder="请选择当前商品状态">
        <el-option label="已下架" value="0"></el-option>
        <el-option label="已上架" value="1"></el-option>
        <el-option label="已下单" value="2"></el-option>
        <el-option label="已发货" value="3"></el-option>
        <el-option label="已签收" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="update()">
        <span>立即修改</span>
    </el-button>

    </el-form-item>
  </el-form>
</div>
  
</template>

<script>
import good from "@/api/good";

export default {
    data(){
        return{
            goodInfo : {}
        }
    },
    created(){
        const id = this.$route.params.id
        this.getById(id)
      
    },
    methods: {
        update(){
            good.updateById(this.goodInfo).then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: '修改成功!'
               })
               //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/good/list'})
            })
        },
        getById(id){
            good.getById(id).then(response => {
               this.goodInfo = response.data
               console.log(this.goodInfo)
            })
        },
        
      
    }
}
</script>

<style>
</style>