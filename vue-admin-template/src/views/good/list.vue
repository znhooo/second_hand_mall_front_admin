<template>
  <div class="app-container">

      <el-form :inline="true" class="demo-form-inline">
          
         <el-form-item>
            <el-input  v-model="searchObj.id" placeholder="id"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.keyword" placeholder="昵称"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.status" placeholder="状态(0:封禁,1:正常)"/>
         </el-form-item>
         <el-form-item>
        <div class="block">
            <el-date-picker v-model="value1" type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="创建时间" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="danger" @click="batchDelete()">批量删除</el-button>
      </el-form>
      

    <el-table :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"/>
        <el-table-column prop="id" label="id" width="40" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名" width="100" align="center"></el-table-column>
        <el-table-column prop="img" label="图片" width="80" align="center"></el-table-column>
        <el-table-column prop="description" label="商品描述" width="150" align="center"></el-table-column>
        <el-table-column prop="site" label="发布地点" width="110" align="center"></el-table-column>
        <el-table-column prop="userId" label="发布者" width="70" align="center"></el-table-column>
        <el-table-column prop="buyUserId" label="购买者" width="70" align="center"></el-table-column>
        <el-table-column label="状态" width="70" align="center">
            <template slot-scope="scope" align="center">
                <span v-if="scope.row.status==0">已下架</span>
                <span v-if="scope.row.status==1">已上架</span>
                <span v-if="scope.row.status==2">已下单</span>
                <span v-if="scope.row.status==3">已发货</span>
                <span v-if="scope.row.status==4">已签收</span>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="170" align="center"></el-table-column>
        <el-table-column label="上架/下架" width="80" align="center">
          <template slot-scope="scope" align="center">
                <el-switch class="switch"
                    style="display: block"
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="change(scope.row)"
                    >
                </el-switch>
                
           </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center">
          <template slot-scope="scope">
            <router-link :to="'/good/update/'+scope.row.id">
               <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </router-link>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
          </template>
      </el-table-column>
    </el-table>
    <br><br>
    <el-pagination
    background
    layout="prev, pager, next"
    :current-page="current"
    :page-size="limit"
    :total="total"
    @current-change="getList"
    align="center">
    </el-pagination>

  </div>
</template>

<script>
import good from "@/api/good";

export default {
  data() {
    return {
      current: 1, //当前页
      limit: 8, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      value1: '',
      status: '',
      multipleSelection: [], // 批量选择中选择的记录列表

      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSelectionChange(selection) {
        this.multipleSelection = selection
    },
    getList(page = 1) {
      this.current = page;
      good
        .getList(this.current, this.limit, this.searchObj)
        .then(response => {
            this.list = response.data.records;
            this.total = response.data.total;
          //2022-04-06 00:00:00,2022-05-18 00:00:00
            this.searchObj.createTimeBegin = this.value1.toString().substring(0,10)
            this.searchObj.createTimeEnd = this.value1.toString().substring(11)
            this.status = response.data.records.status
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteById(id){
        this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         })
         .then(() => {
            good.deleteById(id).then(response => {
                this.$message({
                     type: 'success',
                     message: '删除成功!'
                })
                  //刷新页面
                this.getList(this.current, this.limit, this.searchObj)
            })
         })
    },
    change(goodInfo){
        good.updateById(goodInfo).then(response => {
            this.$message({
                type: 'success',
                message: '设置成功!'
            })
        })
    },
    batchDelete(){
        this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            var idList = []
            //遍历数组得到每个id值，设置到idList里面
            for(var i=0;i<this.multipleSelection.length;i++) {
                var obj = this.multipleSelection[i]
                var id = obj.id
                idList.push(id)
                alert(id)
            }
            good.batchDelete(idList).then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  //刷新页面
                  this.getList(1,this.limit)
            })
        })
       

    }
  }
};
</script>

<style>

</style>
