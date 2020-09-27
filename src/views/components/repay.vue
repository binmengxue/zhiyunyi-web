<template>
<div class="borrowInfo">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="repayTime"
      label="贷款编号"
      width="160">
    </el-table-column>
    <el-table-column
      prop="repayAmount"
      label="还款本金"
      width="180">
    </el-table-column>
    <el-table-column
      prop="repayAmount"
      label="还款利息"
      width="180">
    </el-table-column>
     <el-table-column
      prop="repayTime"
      label="还款时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="repayType"
       width="160"
      label="还款方式">
      <template slot-scope="scope">
          {{getDictName(scope.row.repayType)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="customerName"
      label="还款人">
    </el-table-column>
    <el-table-column
      prop="serialNumber"
      label="流水号">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="上传凭证">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注">
    </el-table-column>
  </el-table>
   <!-- 还款申请弹出层 -->
    <el-dialog title="申请详情" :visible.sync="repayOpen" width="600px" append-to-body>
        <el-row :gutter="10">
          <el-col>
             <UserElRow  label="还款金额："  :info="repayInfo.repayAmount" spanCol="8" />
          </el-col>
          <el-col>
             <UserElRow  label="还款时间："  :info="repayInfo.repayTime" spanCol="8" />
          </el-col>
          <el-col>
             <UserElRow  label="还款方式："  :info="repayInfo.repayType" spanCol="8" />
          </el-col>
          <el-col>
             <UserElRow  label="还款人姓名："  :info="repayInfo.customerName" spanCol="8" />
          </el-col>
          <el-col>
             <UserElRow  label="流水号："  :info="repayInfo.serialNumber" spanCol="8" />
          </el-col>
          <el-col>
            <el-row type="flex" style="padding:15px 0">
              <el-col  style="color: #222;" :span="8">上传凭证：</el-col>
              <el-col >
                 <el-image
                  style="width: 100px; height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="contain"></el-image>
                  <pdf src="./static/relativity.pdf"></pdf>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
             <UserElRow  label="备注："  :info="repayInfo.remark" spanCol="8" />
          </el-col>
        </el-row>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applicationsubmit">确 定</el-button>
        <el-button @click="applicationcancel">取 消</el-button>
      </div>
    </el-dialog>
  

</div>
</template>

<script>
import {getCaseRepayByCaseId} from "@/api/case/index";
import {getRepayType} from "@/utils/statusInfo";
import UserElRow from "@/components/UserElRow";
import {getDictLabelByValue} from '@/utils/ruoyi';
import pdf from 'vue-pdf';

export default {
  name: "usecontacts",  
  data() {
       return {
          tableData: [], 
          repayOpen:false,
          queryParams:{
            caseId:null
          },
          repayInfo:{
            repayAmount:null,
            repayTime: null,
            repayType: null,
            customerName: null,
            serialNumber: null,
            remark: null
          },
          repayTypeList: [],
       }
  },
  async created() {
     this.repayTypeList = await getRepayType()
     this.getList(); 
  },
   watch: {
      // userDataRow: function(newVal,oldVal){
      //     this.userDataRow = newVal;
      //     newVal && this.getList(); 
      // }
  },
  props: ["userDataRow"],
  components: {UserElRow,pdf}, 
  methods: {
    getList() {
      this.queryParams.caseId = this.userDataRow.caseId
      getCaseRepayByCaseId(this.queryParams).then(response => {
        if(response.code == 200) {
          this.tableData = response.data
        }
      })
    },
    getDictName(value) {
      return getDictLabelByValue(value, this.repayTypeList);
    },
    handleClick(){

    },
    applicationsubmit(){

    },
    applicationcancel(){

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