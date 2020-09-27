<template>
  <div>
    <div class="borrowInfo">
      <el-table
        :data="dataList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="entrustStartTime"
          label="历史委托开始时间"
          width="200">
        </el-table-column>

        <el-table-column
          prop="entrustEndTime"
          label="历史委托结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="entrustTotalAmount"
          label="历史委托总额">
        </el-table-column>
        <el-table-column
          prop="entrustPrincipal"
          label="历史委托本金">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="导入时间">
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
  import {entrustHistoryList} from "@/api/case/index";
  export default {
    name: 'borrowInfo',
    data() {
      return {
        dataList: [],
        total:0,
        pageNum:0,
        pageSize:10,
        userObj:{}
      }
    },
    props: ['userDataRow'],
    created() {
     
    },
    watch: {
        userDataRow(newVal,oldVal){
            this.userObj = newVal; 
            newVal &&  this.getList();
        }
    },
    methods: {
      getList() {
        const data={
          identityNo:this.userObj.identityNo
        }
        entrustHistoryList(data).then(reseponse => {
          if (reseponse.code == 200) {
            this.dataList = reseponse.rows
            this.total= reseponse.total
          }
        })
      },
    }

  }
</script>

<style lang="scss" scoped>
  .borrowInfo {
    margin: 10px 0px;
    border: 1px solid #dfe6ec;
    border-bottom: 0;
    padding: 0 0 0 0;

  }
</style>
