<template>
  <div class="app-container">

      <el-form :inline="true" class="demo-form-inline">
          
         <el-form-item>
            <el-input  v-model="searchObj.id" placeholder="id"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.orderId" placeholder="订单号"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.buyUserId" placeholder="购买人id"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.sellUserId" placeholder="发布人id"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.goodId" placeholder="商品id"/>
         </el-form-item>
         <el-form-item>
            <el-select v-model="searchObj.status" value-key="searchObj.status" placeholder="请选择订单状态">
              <el-option label="未支付" value="0"></el-option>
              <el-option label="已支付未发货" value="1"></el-option>
              <el-option label="已发货" value="1"></el-option>
              <el-option label="已签收" value="1"></el-option>
            </el-select>
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
      <el-table-column prop="id" label="id" width="80" align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单号" width="140" align="center"></el-table-column>
      <el-table-column prop="sellUserId" label="发布者" width="120" align="center"></el-table-column>
      <el-table-column prop="buyUserId" label="购买者" width="180" align="center"></el-table-column>
      <el-table-column prop="goodId" label="商品" width="110" align="center"></el-table-column>
      <el-table-column label="当前状态" width="80" align="center">
          <template slot-scope="scope" align="center">
            <span v-if="scope.row.status==0">未支付</span>
            <span v-if="scope.row.status==1">已支付未发货</span>
            <span v-if="scope.row.status==2">已发货</span>
            <span v-if="scope.row.status==3">已签收</span>
           </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle disabled></el-button>
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
import order from "@/api/order";

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
      order
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
        this.$confirm('此操作将永久删除该订单信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         })
         .then(() => {
            order.deleteById(id).then(response => {
                this.$message({
                     type: 'success',
                     message: '删除成功!'
                })
                  //刷新页面
                this.getList(this.current, this.limit, this.searchObj)
            })
         })
    },
    change(orderInfo){
        order.updateById(orderInfo).then(response => {
            this.$message({
                type: 'success',
                message: '设置成功!'
            })
        })
    },
    batchDelete(){
        this.$confirm('此操作将永久删除该订单信息, 是否继续?', '提示', {
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
            order.batchDelete(idList).then(response => {
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
