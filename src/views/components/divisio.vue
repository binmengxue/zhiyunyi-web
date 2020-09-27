<template>
<div class="borrowInfo">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="createTime"
      label="分案时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="机构"
      width="160">
    </el-table-column>
    <el-table-column
      prop="userName"
       width="160"
      label="分案坐席">
    </el-table-column>
    <el-table-column
      prop="distributionType"
      label="类型">

        <template slot-scope="scope">
                  {{getDictName(scope.row.distributionType)}}
         </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注">
    </el-table-column>
  </el-table>
  

</div>
</template>

<script>
import {getCaseDistributionLogList} from "@/api/case/index";
import {getdDistributionLogType} from "@/utils/statusInfo";
import {getDictLabelByValue} from '@/utils/ruoyi'

export default {
  name: "divisio",  
  data() {
       return {
          tableData: [], 
          total: 0,
          distributionLogTypeList: [],
           queryParams: {
                pageNum: 1,
                pageSize: 10,
                caseId: null
            },
       }
  },
  props:['userDataRow'],
  watch: {
      // userDataRow: function(newVal,oldVal){
      //     this.userDataRow = newVal;
      //     newVal && this.getList(); 
      // }
  },
  async created() {
     this.distributionLogTypeList = await getdDistributionLogType()
     this.getList(); 
     
  },
  methods: {
     getList() {
        this.loading= true;
        this.queryParams.caseId = this.userDataRow.caseId
        getCaseDistributionLogList(this.queryParams).then(response => {
          if(response.code == 200) {
            this.tableData = response.rows
            this.total = response.total
            this.loading = false
          }
        })
    },
    getDictName(value) {
      return getDictLabelByValue(value, this.distributionLogTypeList);
    }
  }

}
</script>

<style lang="scss" scoped>
.borrowInfo{
   margin:10px 0px;
  border:1px solid #dfe6ec;
  border-bottom:0;
  padding:0 0 0 0;

}
</style>