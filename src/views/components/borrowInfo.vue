<template>
  <div>
    <div style="padding-bottom:10px;">
      <el-button
        type="success"
        size="mini"
        :disabled="multiple"
        v-show="isString('ajxq_jkjl_ss')"
        @click="handleLawsuit"
        >诉讼</el-button
      >
      <el-button
        type="danger"
        size="mini"
         :disabled="multiple"
        v-show="isString('ajxq_jkjl_cs')"
        @click="handleRemoveLawsuit"
        >撤诉</el-button
      >
    </div>
    <div class="borrowInfo">
      <el-table :data="borrowDataList" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" prop="id" align="center" />
        <el-table-column prop="id" label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-s-operation"
              v-show="scope.row.loadStatus == 0 && isString('ajxq_jkjl_hksq')"
              @click="handleRepayDialog(scope.row)"
              >还款申请</el-button
            >
            <el-button
              type="text"
              size="small"
              icon="el-icon-s-operation"
              v-show="scope.row.loadStatus == 0 && isString('ajxq_jkjl_jmsq')"
              @click="handleReductionDialog(scope.row)"
              >减免申请</el-button
            >
            <el-button
              v-if="scope.row.loadStatus == 0 && isString('ajxq_jkjl_dj')"
              type="text"
              size="small"
              icon="el-icon-lock"
              @click="handleCongelation(scope.row)"
              >冻结</el-button
            >
            <el-button
              v-if="scope.row.loadStatus == 1 && isString('ajxq_jkjl_hf')"
              type="text"
              icon="el-icon-unlock"
              size="small"
              @click="unhandleCongelation(scope.row)"
              >恢复</el-button
            >
            <el-button
              v-if="scope.row.loadStatus == 0 && isString('ajxq_jkjl_sc')"
              type="text"
              icon="el-icon-check"
              size="small"
              @click="handleClearLoan(scope.row)"
              >结清</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="loadId" label="借款编号" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleborrowNum(scope.row)"
              >{{ scope.row.loadId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="noRepayPrincipal" label="应还本金" />
        <el-table-column prop="noRepayInterest" label="应还利息" />
        <el-table-column prop="noRepayOutContractAmount" label="应还违约金" />
        <el-table-column prop="noRepayTotalAmount" label="应还总额" />
        <el-table-column prop="payDate" label="应还日期" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="fundName" label="资金方" />
        <el-table-column prop="loadStatus" label="状态">
          <template slot-scope="scope">
            {{ getFileItem(scope.row.loadStatus, caseBorrowList) }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 还款申请弹出层 -->
      <el-dialog
        title="还款申请"
        :visible.sync="repayOpen"
        width="600px"
        append-to-body
      >
        <el-form
          ref="repayFormDialog"
          :model="repayForm"
          :rules="repayRules"
          label-width="100px"
        >
          <div class="el-formDiv">
            <el-form-item label="贷款编号">
              <div>{{ repayForm.loadId }}</div>
            </el-form-item>
            <el-form-item label="还款本金" prop="repayPrincipal">
              <el-input
                v-model="repayForm.repayPrincipal"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="还款利息" prop="repayInterest">
              <el-input
                v-model="repayForm.repayInterest"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="还款违约金" prop="repayOutContract">
              <el-input
                v-model="repayForm.repayOutContract"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="还款时间" prop="repayTime">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="repayForm.repayTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:250px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="还款方式" prop="repayType">
              <el-select
                v-model="repayForm.repayType"
                placeholder="请选择"
                clearable
                size="small"
                style="width:250px"
              >
                <el-option
                  v-for="dict in repayTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="还款人姓名" prop="repayAccountName">
              <el-input
                v-model="repayForm.repayAccountName"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="流水号" prop="serialNumber">
              <el-input
                v-model="repayForm.serialNumber"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="打款账号" prop="repayAccount">
              <el-input
                v-model="repayForm.repayAccount"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="上传凭证" prop="repayCertificate">
              <el-input type="hidden" v-model="repayForm.repayCertificate" />
              <el-upload
                class="upload-demo"
                accept=".jpg, .jpeg, .png, .bmp"
                :headers="upload.headers"
                :action="upload.url"
                :limit="1"
                :on-remove="handleRepayRemove"
                :on-success="handleRepaySuccess"
                :file-list="fileList"
                list-type="picture-card"
              >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/jpeg/png/bmp文件，且最多一张
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入备注"
                style="width:250px;"
                v-model="repayForm.applyRemark"
              >
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="repaySubmit('repayFormDialog')"
            >确 定</el-button
          >
          <el-button @click="repayCancel('repayFormDialog')">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 还款减免弹出层 -->
      <el-dialog
        title="减免申请"
        :visible.sync="reductionOpen"
        width="600px"
        append-to-body
      >
        <el-form
          ref="reductionFormDialog"
          :model="reductionForm"
          :rules="reductionRules"
          label-width="100px"
        >
          <div class="el-formDiv">
            <el-form-item label="贷款编号">
              <div>{{ reductionForm.loadId }}</div>
            </el-form-item>
            <el-form-item label="减免本金" prop="reductionPrincipal">
              <el-input
                v-model="reductionForm.reductionPrincipal"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="减免利息" prop="reductionInterest">
              <el-input
                v-model="reductionForm.reductionInterest"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="减免违约金" prop="reductionContract">
              <el-input
                v-model="reductionForm.reductionContract"
                clearable
                size="small"
                style="width:250px"
              />
            </el-form-item>
            <el-form-item label="上传凭证" prop="reductionPic">
              <el-input type="hidden" v-model="reductionForm.reductionPic" />
              <el-upload
                class="upload-demo"
                accept=".jpg, .jpeg, .png, .bmp"
                :headers="upload.headers"
                :action="upload.url"
                :limit="1"
                :on-remove="handleReductionRemove"
                :on-success="handleReductionSuccess"
                :file-list="fileList2"
                list-type="picture-card"
              >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/jpeg/png/bmp文件，且最多一张
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                style="width:250px;"
                v-model="reductionForm.applyRemark"
              >
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="reductionSubmit('reductionFormDialog')"
            >确 定</el-button
          >
          <el-button @click="reductionCancel('reductionFormDialog')"
            >取 消</el-button
          >
        </div>
      </el-dialog>
      <!-- 冻结申请弹出层 -->
      <el-dialog
        title="冻结"
        :visible.sync="congelationOpen"
        width="600px"
        append-to-body
      >
        <el-form
          ref="congelationRef"
          :model="congelationForm"
          label-width="100px"
        >
          <div class="el-formDiv">
            <div style="font-size:18px;padding:10px 0 20px 20px;">
                <i class="el-icon-warning" style="color:#FFBA00;margin-right:5x;"></i>操作冻结后案件将不可操作，是否确认？
            </div>
            <el-form-item label="冻结原因" prop="frozenReason">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                style="width:300px;"
                v-model="congelationForm.frozenReason"
              >
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="congelationsubmit('congelationRef')"
            >确 定</el-button
          >
          <el-button @click="congelationcancel('congelationRef')"
            >取 消</el-button
          >
        </div>
      </el-dialog>
      <!-- 恢复申请弹出层 -->
      <el-dialog
        title="恢复"
        :visible.sync="uncongelationOpen"
        width="600px"
        append-to-body
      >
        <el-form
          ref="uncongelationRef"
          :model="uncongelationForm"
          label-width="100px"
        >
          <div class="el-formDiv">
          <div style="font-size:18px;padding:10px 0 20px 20px;">
                  <i class="el-icon-warning" style="color:#FFBA00;margin-right:5x;"></i> 操作恢复后案件可操作，是否确认？
          </div>
          </div>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="uncongelationsubmit('uncongelationRef')"
              >确 定</el-button
            >
            <el-button @click="uncongelationcancel('uncongelationRef')"
              >取 消</el-button
            >
          </div>
      </el-dialog>
      <!-- 结清弹出层 -->
      <el-dialog
        title="结清"
        :visible.sync="clearLoanOpen"
        width="600px"
        append-to-body
      >
        <el-form
          ref="clearLoanRef"
          :model="clearLoanForm"
          :rules="clearLoanRules"
          label-width="100px"
        >
          <div class="el-formDiv">
            <div style="font-size:18px;padding:10px 0 20px 20px;">
                <i class="el-icon-warning" style="color:#FFBA00;margin-right:5x;"></i> 操作结清后案件将不可操作，是否确认？
            </div>
            <el-form-item label="还款方式" prop="repayType">
              <el-select
                v-model="clearLoanForm.repayType"
                placeholder="请选择"
                clearable
                size="small"
                style="width:250px"
              >
                <el-option
                  v-for="dict in repayTypeList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clearLoansubmit('clearLoanRef')"
            >确 定</el-button
          >
          <el-button @click="clearLoancancel('clearLoanRef')">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 借款编号弹出层 -->
      <el-dialog
        title="详细信息"
        :visible.sync="borrowingBaseOpen"
        width="800px"
        append-to-body
      >
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="营业部名称："
              :info="userData.businessDeptName"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="放款日期："
              :info="userData.loadDate"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="营业部城市："
              :info="userData.businessDeptCity"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="放款金额："
              :info="userData.loadPrincipal"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="债务委托开始时间："
              :info="userData.livingAddress"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="已还金额："
              :info="userData.paidTotalAmount"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="债务委托结束时间："
              :info="userData.livingAddress"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="已还本金："
              :info="userData.paidPrincipal"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="借款用途："
              :info="userData.loadPurpose"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="放款总期数："
              :info="userData.loadPeroid"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="客户经理姓名："
              :info="userData.customerManager"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="已还期数："
              :info="userData.paidPeroid"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="客户经理电话："
              :info="userData.customerManagerPhone"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="每期应还："
              :info="userData.perPeroidPay"
              spanCol="10"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <UserElRow
              label="数据更新时间："
              :info="userData.livingAddress"
              spanCol="10"
            />
          </el-col>
          <el-col :span="12">
            <UserElRow
              label="借款编号："
              :info="userData.loadId"
              spanCol="10"
            />
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getBorrowInfoByCaseId,
  addCaseReduction,
  addCaseRepay,
  addCaseFrozen,
  addCaseEnd,
  addLawsuit,
  delLawsuit
} from "@/api/case/index";
import { getToken } from "@/utils/auth";
import { getRepayType, getCaseBorrowStatus } from "@/utils/statusInfo";
import UserElRow from "@/components/UserElRow";
export default {
  name: "borrowInfo",
  data() {
    return {
      ids:[],
      borrowDataList: [],
      queryParams: {
        caseId: null
      },
      upload: {
        headers: { Authorization: "Bearer " + getToken() },
        url: process.env.VUE_APP_BASE_API + "/common/uploadToQny"
      },
      repayOpen: false,
      repayForm: {
        loadId: "",
        caseId: "",
        borrowId: "",
        serialNumber: "",
        repayPrincipal: "",
        repayInterest: "",
        repayOutContract: "",
        repayTime: "",
        repayType: "",
        repayAccountName: "",
        repayAccount: "",
        repayCertificate: "",
        applyRemark: "",
        caseSource: ""
      },
      repayRules: {
        repayPrincipal: [{ required: true, message: "请输入还款本金" }],
        repayInterest: [{ required: true, message: "请输入还款利息" }],
        repayOutContract: [{ required: true, message: "请输入还款违约金" }],
        repayTime: [{ required: true, message: "请选择还款时间" }],
        repayType: [{ required: true, message: "请选择还款方式" }],
        repayAccountName: [{ required: true, message: "请输入还款人姓名" }],
        repayAccount: [{ required: true, message: "请输入还款账号" }],
        serialNumber: [{ required: true, message: "请输入交易流水号" }],
        repayCertificate: [{ required: true, message: "请上传凭证" }]
      },
      fileList: [],
      reductionOpen: false,
      reductionForm: {
        loadId: "",
        caseId: "",
        borrowId: "",
        reductionPrincipal: "",
        reductionInterest: "",
        reductionContract: "",
        reductionPic: "",
        applyRemark: "",
        caseSource: ""
      },
      reductionRules: {
        reductionPrincipal: [{ required: true, message: "请输入减免本金" }],
        reductionInterest: [{ required: true, message: "请输入减免利息" }],
        reductionContract: [{ required: true, message: "请输入减免违约金" }],
        reductionPic: [{ required: true, message: "请上传凭证" }]
      },
      fileList2: [],
      //状态匹配
      infoStatus: {
        lawsuitStatus: [], //案件状态
        caseSource: [] //案件来源
      },
      repayTypeList: [],
      caseBorrowList: [],
      congelationOpen: false,
      congelationForm: {
        id: "",
        frozenReason: ""
      },
      uncongelationOpen: false,
      uncongelationForm: {
        id: "",
        frozenReason: ""
      },
      clearLoanOpen: false,
      clearLoanForm: {
        id: "",
        repayType: ""
      },
      clearLoanRules: {
        repayType: [{ required: true, message: "请选择还款方式" }]
      },
      borrowingBaseOpen: false, //是否显示借款编号详情信息
      userData: {
        businessDeptName: "",
        businessDeptCity: "",
        loadPurpose: "",
        customerManager: "",
        customerManagerPhone: "",
        loadDate: "",
        loadPrincipal: "",
        paidTotalAmount: "",
        paidPrincipal: "",
        loadPeroid: "",
        paidPeroid: "",
        perPeroidPay: "",
        loadId:''
      },
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
    };
  },
  props: ["userDataRow"],
  components: { UserElRow },
  async created() {
    this.repayTypeList = await getRepayType();
    this.caseBorrowList = await getCaseBorrowStatus();
    this.getList();
  },

  watch: {
    // userDataRow: function(newVal,oldVal){
    //      this.userDataRow = newVal;
    //      newVal && this.getList();
    // }
  },
  methods: {
    isString(str) {
      var ary = this.$store.getters.permissions;
      for (var i = 0, n = ary.length; i < n; i++) {
        if (ary[i] == str || ary[i] == "*:*:*") {
          return true;
        }
      }
      return false;
    },
    getFileItem(vaule, arys) {
      let fileAry = arys;
      for (var i = 0, n = fileAry.length; i < n; i++) {
        if (Number(fileAry[i].dictValue) === vaule) {
          return fileAry[i].dictLabel;
        }
      }
    },
    // 一排按钮是否亮起
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getList() {
      this.queryParams.caseId = this.userDataRow.caseId;
      getBorrowInfoByCaseId(this.queryParams).then(reseponse => {
        if (reseponse.code == 200) {
          this.borrowDataList = reseponse.data;
        }
      });
    },
    handleRepayDialog(data) {
      this.repayForm.caseId = data.caseId;
      this.repayForm.borrowId = data.id;
      this.repayForm.loadId = data.loadId;
      this.repayForm.caseSource = data.caseSource;
      this.repayForm.repayPrincipal = "";
      this.repayForm.repayInterest = 0;
      this.repayForm.repayOutContract = 0;
      this.repayForm.repayType = "";
      this.repayForm.serialNumber = "";
      this.repayForm.applyUserRemark = "";
      this.repayForm.repayAccount = "";
      this.repayForm.repayAccountName = "";
      this.repayForm.repayCertificate = "";
      this.repayForm.repayTime = "";
      this.repayForm.applyRemark = "";
      this.fileList = [];
      this.resetForm("repayFormDialog");
      this.repayOpen = true;
    },
    repaySubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseRepay(this.repayForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.repayOpen = false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    repayCancel(formName) {
      this.$refs[formName].resetFields();
      this.repayOpen = false;
    },
    handleRepaySuccess(data) {
      this.fileList.push({ name: data.name, url: data.url });
      if (this.fileList.length != 0) {
        this.repayForm.repayCertificate = this.fileList[0].url;
      }
    },
    handleRepayRemove(file, fileList) {
      this.fileList = fileList;
      if (this.fileList.length != 0) {
        this.repayForm.repayCertificate = this.fileList[0].url;
      }
    },
    handleReductionDialog(data) {
      this.reductionForm.caseId = data.caseId;
      this.reductionForm.borrowId = data.id;
      this.reductionForm.loadId = data.loadId;
      this.reductionForm.caseSource = data.caseSource;
      this.reductionForm.reductionPrincipal = "";
      this.reductionForm.reductionInterest = 0;
      this.reductionForm.reductionContract = 0;
      this.reductionForm.applyRemark = "";
      this.reductionForm.reductionPic = "";
      this.fileList2 = [];
      this.resetForm("reductionFormDialog");
      this.reductionOpen = true;
    },
    reductionSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseReduction(this.reductionForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.reductionOpen = false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    reductionCancel(formName) {
      this.$refs[formName].resetFields();
      this.reductionOpen = false;
    },
    handleReductionSuccess(data) {
      this.fileList2.push({ name: data.name, url: data.url });
      if (this.fileList2.length != 0) {
        this.reductionForm.reductionPic = this.fileList2[0].url;
      }
    },
    handleReductionRemove(file, fileList) {
      this.fileList2 = fileList;
      if (this.fileList2.length != 0) {
        this.reductionForm.reductionPic = this.fileList2[0].url;
      }
    },
    handleCongelation(data) {
      this.congelationForm.id = data.id;
      this.congelationForm.frozenReason = "";
      this.congelationOpen = true;
    },
    congelationsubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseFrozen(this.congelationForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.getList();
              this.congelationOpen = false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    congelationcancel(formName) {
      this.$refs[formName].resetFields();
      this.congelationOpen = false;
    },
    unhandleCongelation(data) {
      this.uncongelationForm.id = data.id;
      this.uncongelationForm.frozenReason = "";
      this.uncongelationOpen = true;
    },
    uncongelationsubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseFrozen(this.uncongelationForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.getList();
              this.uncongelationOpen = false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    uncongelationcancel(formName) {
      this.$refs[formName].resetFields();
      this.uncongelationOpen = false;
    },
    handleClearLoan(data) {
      this.clearLoanForm.id = data.id;
      this.clearLoanForm.repayType = "";
      this.resetForm("clearLoanRef");
      this.clearLoanOpen = true;
    },
    clearLoansubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseEnd(this.clearLoanForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.getList();
              this.clearLoanOpen = false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    clearLoancancel(formName) {
      this.$refs[formName].resetFields();
      this.clearLoanOpen = false;
    },
    handleborrowNum(data) {
      console.log(data)
      this.userData.businessDeptName = data.businessDeptName;
      this.userData.businessDeptCity = data.businessDeptCity;
      this.userData.loadPurpose = data.loadPurpose;
      this.userData.customerManager = data.customerManager;
      this.userData.customerManagerPhone = data.customerManagerPhone;
      this.userData.loadDate = data.loadDate;
      this.userData.loadPrincipal = data.loadPrincipal;
      this.userData.paidTotalAmount = data.paidTotalAmount;
      this.userData.paidPrincipal = data.paidPrincipal;
      this.userData.loadPeroid = data.loadPeroid;
      this.userData.paidPeroid = data.paidPeroid;
      this.userData.perPeroidPay = data.perPeroidPay;
      this.userData.loadId = data.loadId;
      this.borrowingBaseOpen = true;
    },
    handleLawsuit() {
      if(this.ids.length===0){
        this.$message({
          message: '请选择至少一条数据进行诉讼',
          type: 'warning'
        });
        return
      }
      this.$confirm("此操作会将案件提交至诉讼流程，是否确定？", "诉讼操作", {
        cancelButtonText: "取消",
        customClass: 'messageBox-jk',
        confirmButtonText: "确定",

        type: "warning"
      }).then(() => {
        addLawsuit(this.ids.join(",")).then(response => {
          if (response.code === 200) {
            this.getList();
            this.msgSuccess("诉讼成功");
          } else {
            this.msgError(response.msg);
            return false;
          }
        });
      });
    },
    handleRemoveLawsuit() {
      if(this.ids.length===0){
        this.$message({
          message: '请选择至少一条数据进行撤诉',
          customClass: 'messageBox-jk',
          type: 'warning'
        });
        return
      }
      this.$confirm("此操作会将案件撤诉（已立案无法撤诉），是否确定？", "撤诉操作", {
          confirmButtonText: "确定",
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        delLawsuit(this.ids.join(",")).then(response => {
          if (response.code === 200) {
            this.getList();
            this.msgSuccess("撤诉成功");
          } else {
            this.msgError(response.msg);
            return false;
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.borrowInfo {
  margin: 10px 0px;
  border: 1px solid #dfe6ec;
  border-bottom: 0;
  padding: 0 0 0 0;
}
.borrowInfo>>> .btn-custom-cancel {
   float: right;
  margin-left: 10px;
}
</style>
