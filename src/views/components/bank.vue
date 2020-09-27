<template>
<div class="borrowInfo">
  <el-table :data="tableData"  stripe style="width: 100%">
    <el-table-column prop="customerName" label="开户名" width="180" />
    <el-table-column prop="bankName" label="开户银行"  width="160" />
    <el-table-column prop="bankNo" label="银行卡号" >
        <template slot-scope="scope">
            {{plusXing(scope.row.bankNo,3,4)}}
        </template>
    </el-table-column>
    <el-table-column prop="openBankName" label="支行名称" />
    <el-table-column prop="reservedPhone"  label="预留手机号" />
    <el-table-column prop="openBankProvince" label="开户省" />
    <el-table-column prop="openBankCity" label="开户市" />
  </el-table>
</div>
</template>

<script>
import {getCaseBankInfoList} from "@/api/case/index";
export default {
  name: "bank",  
  data() {
       return {
          tableData: [], 
          queryParams: {
                caseId: null
          },
       }
  },
  props:['userDataRow'],
  watch: {

  },
  created() {
     this.getList(); // 请求接口
  },
  methods: {
    plusXing(str,frontLen,endLen) {
      let strNew='';
      if(typeof str==Number){
         strNew=str.toString()
      }else{
        strNew=str
      }

      var len = strNew.length-frontLen-endLen;
      var xing = '';
      for (var i=0;i<len;i++) {
         xing+='*';
      }
      return strNew.substring(0,frontLen)+xing+strNew.substring(strNew.length-endLen);
    },
    getList() {
        this.loading= true;
        this.queryParams.caseId = this.userDataRow.caseId
        getCaseBankInfoList(this.queryParams).then(response => {
          if(response.code == 200) {
            this.tableData = response.data
            this.loading = false
          }
        })
    },
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