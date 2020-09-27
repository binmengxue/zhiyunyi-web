<template>
  <div class="app-container">
     <el-row>
      <!--用户数据-->
      <el-col style="padding:20px 0px 0px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
        <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="130px">
          
              <el-form-item label="案件编号" prop="caseId" >
                <el-input
                  v-model="queryParams.caseId"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="调解开始时间">
                  <el-form-item prop="distributionStartTime" style="margin-right:0px;">
                    <el-date-picker
                        v-model="queryParams.distributionStartTime"
                        type="date"
                        size="small"
                        style="width:140px"
                        placeholder="开始日期"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd" >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item prop="distributionStartEndTime" style="margin-right:0px;">
                       <el-date-picker
                            v-model="queryParams.distributionEndTime"
                            type="date"
                            size="small"
                            style="width:140px"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期"
                            format="yyyy-MM-dd" >
                        </el-date-picker>
                  </el-form-item>
              </el-form-item>
              <el-form-item label="债权方客户编号" prop="customerId">
                <el-input
                  v-model="queryParams.customerId"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
         
          <span v-show="isMore">
            
                <el-form-item label="实际结束时间">
                    <el-form-item prop="actualStartTime" style="margin-right:0px;">
                      <el-date-picker
                          v-model="queryParams.actualStartTime"
                          type="date"
                          size="small"
                          style="width:140px"
                          value-format="yyyy-MM-dd"
                          placeholder="开始日期"
                          format="yyyy-MM-dd" >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="actualEndTime" style="margin-right:0px;">
                        <el-date-picker
                              v-model="queryParams.actualEndTime"
                              type="date"
                              size="small"
                              style="width:140px"
                              value-format="yyyy-MM-dd"
                              placeholder="结束日期"
                              format="yyyy-MM-dd" >
                          </el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="案件来源" prop="caseSource">
                      <el-select
                        v-model="queryParams.caseSource"
                        placeholder="请选择"
                        clearable
                        size="small"
                        style="width:280px"
                      >
                        <el-option
                          v-for="dict in infoStatus.caseSource"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="customerName" >
                  <el-input
                    v-model="queryParams.customerName"
                    clearable
                    size="small"
                    style="width:280px"
                  />
                </el-form-item>
            
              <el-form-item label="调解人员序号" >
                  <el-input v-model="queryParams.userId" clearable size="small" style="width:280px" />
              </el-form-item>
              <el-form-item label="调解人员昵称" >
                  <el-input v-model="queryParams.userName" clearable size="small" style="width:280px" />
              </el-form-item>
              <el-form-item label="调解员部门">
                <el-popover
                  placement="bottom"
                  width="280"
                  v-model="visible">
                  <div style="text-align: right; margin: 0">
                    <el-tree
                      :data="distributionDept"
                      show-checkbox
                      node-key="id"
                      ref="tree2"
                      :props="defaultProps2"
                      default-expand-all
                      @check-change="handleCheckChange2"

                    />
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button type="primary" size="mini"  @click="distributionSubmitForm2">确 定</el-button>
                    <el-button @click="cancel2" size="mini">取 消</el-button>
                  </div>
                  <el-button slot="reference" style="width:280px">{{distributionName}}</el-button>
                </el-popover>
              </el-form-item>
            
          </span>
          <div class="el-formDiv"  style="display:flex;justify-content: center;">
                <el-button type="primary" icon="el-icon-search" size="mini"  @click="handleSearch('queryRef')" >查询</el-button>
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleReset('queryRef')">重置</el-button>
          </div>
          <div style="text-align: center;background:#efefef;border-top:1px solid #d2d2d2;margin-top:20px;">
              <el-button type="text" @click="handleMore"  style="width:100%" :icon="isMoreIcon">更多筛选条件</el-button>
          </div>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10" style="padding-top:20px;" >
        <el-col :span="1.5" v-show="isString('ajlb_fa')" >
            <el-button type="primary" icon="el-icon-download" size="mini" @click="handledistributionFile">导出</el-button>
        </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table v-loading="loading"  element-loading-text="拼命加载中" stripe :data="userList" >
            <el-table-column label="案件编号"  width="100"  align="left" prop="caseId"  />
            <el-table-column label="债权方客户编号"  width="150"  align="left" prop="customerId"  />
            <el-table-column label="案件来源"  width="80"  align="left" prop="caseSource"  >
              <template slot-scope="scope">
                {{getFileItem(scope.row.caseSource,infoStatus.caseSource)}}
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="150" align="center" prop="customerName" />
            <el-table-column label="身份证" width="150" align="center" prop="identityNo" >
              <template slot-scope="scope">
                {{scope.row.identityNo?plusXing(scope.row.identityNo,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="手机号" width="150" align="center" prop="phone" >
              <template slot-scope="scope">
                {{scope.row.phone?plusXing(scope.row.phone,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="调解开始时间" width="150" align="center" prop="startTime" />
            <el-table-column label="调解收回时间" width="150" align="center" prop="endTime" />
            <el-table-column label="实际调解结束时间" width="150" align="center" prop="actualEndTime" />
            <el-table-column label="调解人员序号" width="120" align="center" prop="userId" />
            <el-table-column label="调解人员" align="center" prop="userName" />
            <el-table-column label="调解员部门" width="100" align="center" prop="deptName" />
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
       </el-col>
    </el-row>

  </div>
</template>
<script>
import {getCaseDistributionLogList,userTreeselect,doDistributionExport} from "@/api/case/index";
import {getcaseSource} from '@/utils/statusInfo'
import  Search1  from "@/views/case/search1.vue";
import pdf from 'vue-pdf';
export default {
  name: "Circulation",
  data() {
    return {
      loading:true,
      userList: null,// 用户表格数据
      total:0,//总页数
      // 查询参数
      queryParams: {
        pageNum:1,
        pageSize:10,
        isAsc:'desc',
        orderByColumn:'create_time',
        caseId:'',//案件ID
        distributionStartTime:'',//调解开始时间
        distributionEndTime:'',//调解结束时间
        customerId:'',//客户编号
        actualStartTime:'',//实际开始时间
        actualEndTime:'',//实际结束时间
        customerName:'',//债务人
        caseSource:'',//案件来源
        userId:'',//调解人ID
        userName:'',//调解人名
        deptId:''//调解人部门
      },
      infoStatus:{
        caseSource:[],//案件来源
      },
      isMore:false,
      isMoreIcon:'el-icon-arrow-down',
      distributionDept: [],//当前持有部门
      defaultProps2: { //默认选中
        children: "children",
        label: "label",
        id:'id'
      },
      visible:false,
      distributionName:'请选择'
    };
  },
  components: {},
  watch: {

  },
  async created() {
      this.infoStatus.caseSource= await getcaseSource()
      this.getTreeselect();
      this.getList()
  },
  methods: {
    isString(str){
      var ary=this.$store.getters.permissions;
      for(var i=0,n=ary.length;i<n;i++){
          if(ary[i]==str || ary[i]=="*:*:*"){
                return  true
          }
      }
      return  false
    },
   shijiantime(times){
       var timestr = times.match(/(\S*).000+/)[1]
       return timestr
    },
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
    getFileItem(vaule,arys){
      let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
          if(Number(fileAry[i].dictValue)===vaule){
                return fileAry[i].dictLabel;
            }
        }
    },
    /** 查列表 */
    getList() {
      this.loading = true;
      //let roles=this.$store.state.user.roles;获取角色
      getCaseDistributionLogList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
          }
      );
    },
    handleSearch(formName) {
      this.getList();
    },
    handleReset(formName){
        this.$refs[formName].resetFields();
        this.distributionName='请选择';
        this.$refs.tree2.setCheckedNodes([]);
    },
    handleMore(){
      this.isMore=!this.isMore;
      if(this.isMore){
          this.isMoreIcon="el-icon-arrow-up"
      }else{
        this.isMoreIcon="el-icon-arrow-down"
      }

    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      userTreeselect().then(response => {
        this.distributionDept = response.data;
        this.addDisabledLable2(this.distributionDept)
      });
    },
    //树节点把父亲节点设置不可点击
    addDisabledLable2(data) {
      data.forEach((node) => {
        if (node.children) {
          node.disabled = true;
          return this.addDisabledLable2(node.children)
        }
      })
    },
    handleCheckChange2(data, checked, node) {
      if (checked) {
        this.$refs.tree2.setCheckedNodes([data]);
      }
    },
    //点击确定
    distributionSubmitForm2() {
      this.visible = false;
      let checkedNodes = this.$refs.tree2.getCheckedNodes();
      let halfCheckedNodes = this.$refs.tree2.getHalfCheckedNodes();
      this.queryParams.deptId = checkedNodes[checkedNodes.length - 1].id
      this.distributionName = checkedNodes[checkedNodes.length - 1].label
    },
    cancel2() {
      this.visible = false;
      this.$refs.tree2.setCheckedNodes([]);
      this.distributionName='请选择';
      this.queryParams.distributionDeptId=null;
      this.distributionName=null;
    },
    handledistributionFile(){
      doDistributionExport(this.queryParams).then(response => {
        if(response.code==200){
          this.download(response.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
