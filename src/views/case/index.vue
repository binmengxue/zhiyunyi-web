<template>
  <div class="app-container">
    <Search @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></Search>
    <el-row :gutter="10" style="padding-top:20px;padding-bottom:20px;" >
          <el-col :span="1.5" v-show="isString('ajlb_fa')" style="padding-bottom:10px;">
            <el-button type="primary"  icon="el-icon-stopwatch" size="mini" @click="handleLawsuitAppoint">分案</el-button>
          </el-col>
          <el-col :span="1.5" v-show="isString('ajlb_plfa')"  style="padding-bottom:10px;">
            <el-button size="mini"  type="primary"  icon="el-icon-s-grid" @click="handleLawsuitSmart">批量分案</el-button>
          </el-col>
          <el-col :span="1.5" v-show="isString('ajlb_ajdr')" style="padding-bottom:10px;">
            <el-button size="mini" type="primary"   icon="el-icon-download" @click="handlecaseFile">案件导入</el-button>
            <el-button size="mini" type="primary"   icon="el-icon-download" @click="handlecaseAttachment">案件附件导入</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_lasq')"  style="padding-bottom:10px;" >
            <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="handleLeave">留案申请</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_dj')"  style="padding-bottom:10px;">
            <el-button size="mini"  type="primary"  icon="el-icon-lock" @click="handlCongelation(3)">冻结</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_jd')"  style="padding-bottom:10px;">
            <el-button size="mini"  type="primary"  icon="el-icon-unlock" @click="handlCongelation(4)">解冻</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_ja')"  style="padding-bottom:10px;">
            <el-button size="mini"  type="primary"  icon="el-icon-finished" @click="">结案</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_hk')"  style="padding-bottom:10px;" >
            <el-button size="mini" type="primary"   icon="el-icon-sort" @click="handlCongelation">划扣</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_plfsdx')"  style="padding-bottom:10px;">
            <el-button size="mini" type="primary"   icon="el-icon-s-grid" @click="handlBatchTexting">批量发短信</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_ck')"  style="padding-bottom:10px;">
            <el-button size="mini" type="primary"   icon="el-icon-s-grid" @click="handleCaseOut">出库</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_dc')"  style="padding-bottom:10px;">
            <el-button size="mini" type="primary" icon="el-icon-download" @click="exportCaseInfoExcel">导出债务人</el-button>
          </el-col>
          <el-col :span="1.5"  v-show="isString('ajlb_dc')"  style="padding-bottom:10px;">
            <el-button size="mini" type="primary" icon="el-icon-download" @click="exportCaseBorrowExcel">导出债务</el-button>
          </el-col>
           <el-col :span="1.5"  v-show="isString('ajlb_fadr')"  style="padding-bottom:10px;">
            <el-button size="mini" type="primary"  icon="el-icon-download" @click="handleDivisionimport">分案导入</el-button>
          </el-col>
           <el-col :span="1.5"  v-show="isString('ajlb_czdr')"  style="padding-bottom:10px;" >
            <el-button size="mini"  type="primary" icon="el-icon-download" @click="">操作导入</el-button>
          </el-col>

    </el-row>
    <div style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
    <el-table v-loading="loading" :data="userList"  :row-class-name="tableRowClassName"  stripe  element-loading-text="拼命加载中" @selection-change="handleSelectionChange" @sort-change="sortChange"  :default-sort = "{prop: 'distributionStartTime', order: 'descending'}">
      <el-table-column type="selection" width="60" prop="caseId" align="center" />
      <el-table-column align="center" label="操作" width="100" style="position:relative;" fixed="left">
        <template slot-scope="scope">
          <router-link class="link-type" v-show="scope.row.caseStatus!=3 && scope.row.caseStatus!=4" :to="'/casedetail/' + scope.row.caseId + scope.row.customerName" replace>
            <el-button  type="text" size="small" icon="el-icon-view">查看详情</el-button>
          </router-link>
          <el-button  v-show="scope.row.caseStatus==3 || scope.row.caseStatus==4" type="text" icon="el-icon-view" disabled size="small">查看详情</el-button>
        </template>
      </el-table-column>
       <el-table-column label="债务人" align="center" prop="customerName" fixed="left" />
      <el-table-column label="案件编号"  width="100"  align="center" prop="caseId"  />
      <el-table-column label="债权方客户编号"  width="120"  align="center" prop="customerId"  />
      <el-table-column label="手机号" width="110" align="center" prop="phone" >
        <template slot-scope="scope">
            {{scope.row.phone?plusXing(scope.row.phone,3,4):''}}
        </template>
      </el-table-column>
      <el-table-column label="最近调解时间" sortable='custom' width="150" align="center" prop="adjustTime" >
          <template slot-scope="scope">
            {{scope.row.adjustTime?scope.row.adjustTime:''}}
        </template>
      </el-table-column>
      <el-table-column label="调解分案日期" sortable='custom' width="140" align="center"  prop="distributionStartTime" >
        <template slot-scope="scope">
            {{scope.row.distributionStartTime?scope.row.distributionStartTime.substr(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column label="调解收回日期" sortable='custom' width="140" align="center" prop="distributionEndTime" >
        <template slot-scope="scope">
          {{scope.row.distributionEndTime?scope.row.distributionEndTime.substr(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column label="甲方委托开始日期" sortable='custom' width="160" align="center"  prop="entrustStartTime" >
        <template slot-scope="scope">
            {{scope.row.entrustStartTime?scope.row.entrustStartTime.substr(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column label="甲方委托结束日期" sortable='custom' width="160" align="center" prop="entrustEndTime" >
        <template slot-scope="scope">
          {{scope.row.entrustEndTime?scope.row.entrustEndTime.substr(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column label="预约跟进日期" width="160" align="center" prop="nextAdjustTime" >
        <template slot-scope="scope">
          {{scope.row.nextAdjustTime?scope.row.nextAdjustTime.substr(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column label="逾期天数" sortable='custom'  width="100" align="center" prop="overdueDays" />
      <el-table-column label="入库待还总金额" sortable='custom' width="160" align="center" prop="payTotalAmount" >
         <template slot-scope="scope">
          {{scope.row.payTotalAmount?formatNumber(scope.row.payTotalAmount):''}}
        </template>
      </el-table-column>
      <el-table-column label="入库待还本金" sortable='custom' width="160" align="center" prop="payPrincipalAmount" >
        <template slot-scope="scope">
          {{scope.row.payPrincipalAmount?formatNumber(scope.row.payPrincipalAmount):''}}
        </template>
      </el-table-column>
      <el-table-column label="平台减免金额" sortable='custom' width="140" align="center" prop="reduceTotalAmount" />
      <el-table-column label="已还款金额" sortable='custom' width="150" align="center" prop="platPayTotalAmount" />
      <el-table-column label="当前待还本金" sortable='custom' width="150" align="center" prop="noRepayPrincipal" />
      <el-table-column label="当前待还利息"  sortable='custom' width="150" align="center" prop="noRepayInterest" />
      <el-table-column label="当前待还违约金" sortable='custom'  width="150" align="center" prop="noOutContractAmount" />
      <el-table-column label="当前待还总额" sortable='custom'  width="150" align="center" prop="noRepayTotalAmount" />
      <el-table-column label="案件来源" width="100" align="center" prop="caseSource">
          <template slot-scope="scope">
            {{getFileItem(scope.row.caseSource,infoStatus.caseSource)}}
        </template>
      </el-table-column>
      <el-table-column label="最近操作时间" width="150" align="center" prop="updateTime" >
          <template slot-scope="scope">
            {{scope.row.updateTime?scope.row.updateTime:''}}
        </template>
      </el-table-column>
      <el-table-column label="最近划扣时间" width="100" align="center" prop="" >
      </el-table-column>
      <el-table-column label="最近划扣结果" width="100" align="center" prop="" >
      </el-table-column>

      <el-table-column label="最近调解方式" width="100" align="center" prop="adjustType" >
         <template slot-scope="scope">
            {{getFileItem(scope.row.adjustType,infoStatus.adjustType)}}
        </template>
      </el-table-column>
      <el-table-column label="最近调解结果" width="130" align="center" prop="adjustResult" >
        <template slot-scope="scope">
            {{getFileItem(scope.row.adjustResult,infoStatus.adjustResult)}}
        </template>
      </el-table-column>
      <el-table-column label="分案状态" width="100" align="center" prop="caseStatus" v-if="isShow">
        <template slot-scope="scope">
            {{scope.row.caseStatus==0?'未分案':'已分案'}}
        </template>
      </el-table-column>
      <el-table-column label="当前调解部门" width="100" align="center" prop="distributionDeptName" >
      </el-table-column>
      <el-table-column label="当前调解人员" width="100" align="center" prop="distributionUserName" >
      </el-table-column>
      <el-table-column label="债务人状态" width="100" align="center" prop="caseStatus" >
        <template slot-scope="scope">
            {{scope.row.caseStatus==3?'已冻结':'未冻结'}}
        </template>
      </el-table-column>
      <el-table-column label="是否支持划扣" width="100" align="center" prop="supportDeduction" >
        <template slot-scope="scope">
            {{scope.row.supportDeduction==0?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column label="承诺还款时间" width="150" align="center" prop="promiseTime" >
          <template slot-scope="scope">
            {{scope.row.promiseTime?scope.row.promiseTime:''}}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[10,50,100, 200, 300, 400]"
      @pagination="getList"
    />
    </div>
    <!-- 分派弹出层 -->
    <el-dialog title="案件委派" :visible.sync="appointOpen" width="600px" append-to-body>
      <el-form ref="appointform" label-width="120px">
        <div class="el-formDiv">
          <el-form-item label="调解回收日期" prop="distributionEndTime">
            <el-date-picker :picker-options="pickerOptions" type="datetime" placeholder="选择日期"
                            v-model="distributionEndTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width:250px"></el-date-picker>
          </el-form-item>
        </div>
        <div class="el-formDiv">
            <el-tree
              :data="deptOptions"
              show-checkbox
              node-key="uniqueId"
              ref="tree"
              :props="defaultProps"
              default-expand-all
              @check="hanleCheckOnly"


            />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="distributionSubmitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 批量分派弹出层 -->
    <el-dialog title="批量案件委派" :visible.sync="smartOpen" width="600px" append-to-body>
      <el-form ref="smartform" label-width="120px">
        <div class="el-formDiv">
          <el-form-item label="调解回收日期" prop="distributionEndTime">
            <el-date-picker :picker-options="pickerOptions" type="datetime" placeholder="选择日期"
                            v-model="distributionEndTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width:250px"></el-date-picker>
          </el-form-item>
        </div>
        <div class="el-formDiv">
          <el-form-item label="分配规则" prop="smartType">
            <el-select
              v-model="smartType"
              placeholder="请选择"
              clearable
              size="small"
              style="width:250px"
            >
              <el-option key="0" label="数量平均" value="0"/>
              <el-option key="1" label="金额平均" value="1"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-formDiv">
          <el-tree
            :data="deptOptions"
            show-checkbox
            node-key="uniqueId"
            ref="tree"
            :props="defaultProps"
            default-expand-all
            @check="hanleCheckMany"
            @check-change="handleCheckChange"

          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="smartSubmitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 出库弹出层 -->
    <el-dialog title="案件出库(债务)" :visible.sync="caseOutOpen" width="600px" append-to-body >
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
          模板下载：
        </el-col>
        <el-col :span="18" >
          <el-button size="medium" type="primary" icon="el-icon-upload" @click="downloadOutTemp" >案件出库模板下载</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle" >
        <el-col :span="4">
          出库类型：
        </el-col>
        <el-col :span="18">
          <el-select
            v-model="fileOutSource"
            placeholder="请选择"
            clearable
            size="small"
            style="width:150px"
          >
            <el-option
              key="0"
              label="债务"
              value="0"
            />
            <el-option
              key="1"
              label="债务人"
              value="1"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
          附件上传：
        </el-col>
        <el-col :span="18" >
          <el-upload
            ref="upload"
            :limit="1"
            action=""
            :with-credentials="true"
            :http-request="httpOutRequest"
            :before-upload="beforeAvatarUpload"
            :file-list="fileOutList"
            :auto-upload="false"
          >
            <el-button size="medium" type="primary" icon="el-icon-upload">批量文件附件上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseOutSubmit">确 定</el-button>
        <el-button @click="caseOutCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 案件导入弹出层 -->
    <el-dialog title="案件上传" :visible.sync="caseFileOpen" width="600px" append-to-body >
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
          <el-col :span="4">
            模板下载：
          </el-col>
          <el-col :span="18" >
            <el-button size="medium" type="primary" icon="el-icon-upload" @click="downloadTemp" >案件附件模板下载</el-button>
          </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle" >
         <el-col :span="4">
           案件来源：
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="filecaseSource"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                  >
                    <el-option
                      v-for="dict in infoStatus.caseSource"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
            </el-select>
          </el-col>
      </el-row>
     <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
           附件上传：
        </el-col>
        <el-col :span="18" >
            <el-upload
                ref="upload"
                :limit="1"
                action=""
                :with-credentials="true"
                :http-request="httpRequest"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :auto-upload="false"
             >
                  <el-button size="medium" type="primary" icon="el-icon-upload">批量文件附件上传</el-button>
            </el-upload>
          </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseFilesubmitForm">确 定</el-button>
        <el-button @click="caseFilecancel">取 消</el-button>
      </div>
    </el-dialog>

     <!-- 案件附件导入弹出层 -->
    <el-dialog title="案件附件上传" :visible.sync="caseAttachementOpen" width="600px" append-to-body >
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
          <el-col :span="4">
            模板下载：
          </el-col>
          <el-col :span="18" >
            <el-button size="medium" type="primary" icon="el-icon-upload" @click="downloadCaseAttachementTemplate" >案件附件模板下载</el-button>
          </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle" >
         <el-col :span="4">
           案件来源：
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="filecaseSource"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                  >
                    <el-option
                      v-for="dict in infoStatus.caseSource"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
            </el-select>
          </el-col>
      </el-row>
     <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
           附件上传：
        </el-col>
        <el-col :span="18" >
            <el-upload
                ref="upload"
                action=""
                :with-credentials="true"
                :http-request="httpRequestCaseAttachement"
                :before-upload="beforeCaseAttachementUpload"
                :file-list="caseAttachementFileList"
                :on-change="handlecaseAttachmentChange"
                :auto-upload="false"
             >
                  <el-button size="medium" type="primary" icon="el-icon-upload">批量文件附件上传</el-button>
            </el-upload>
          </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseFilesubmitForm">确 定</el-button>
        <el-button @click="caseFilecancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 留案申请弹出层 -->
    <el-dialog title="留案申请" :visible.sync="leaveCaseOpen" width="600px" append-to-body>
      <el-form ref="leaveFormDialog"   :model="leaveForm" :rules="leaveRules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="案件编号">
                <div>{{leaveForm.caseId}}</div>
            </el-form-item>
            <el-form-item label="姓名" >
                <div>{{leaveForm.customerName}}</div>
            </el-form-item>
            <el-form-item label="手机号">
                <div>{{leaveForm.phone}}</div>
            </el-form-item>
            <el-form-item label="委托到期日">
                <div>{{leaveForm.distributionEndTime}}</div>
            </el-form-item>
            <el-form-item label="申请到期日" prop="stayEndTime">
                 <el-date-picker :picker-options="pickerOptions" type="datetime" placeholder="选择日期"
                                 v-model="leaveForm.stayEndTime"
                                 format="yyyy-MM-dd HH:mm:ss"
                                 value-format="yyyy-MM-dd HH:mm:ss"
                                 style="width:250px"></el-date-picker>
            </el-form-item>
            <el-form-item label="上传凭证" prop="stayPic">
              <el-input type="hidden" v-model="leaveForm.stayPic"/>
              <el-upload
                class="upload-demo"
                accept=".jpg, .jpeg, .png, .bmp"
                :headers="upload.headers"
                :action="upload.url"
                :limit="1"
                :on-remove="handleRemove"
                :on-success="handleFileSuccess"
                :file-list="fileList2"
                list-type="picture-card">
                <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/bmp文件，且最多一张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注" prop="stayRemark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:250px;"
                    v-model="leaveForm.stayRemark">
                  </el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="leaveSubmit('leaveFormDialog')">确 定</el-button>
        <el-button @click="leaveCancel('leaveFormDialog')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 冻结申请弹出层 -->
    <el-dialog title="冻结申请" :visible.sync="congelationOpen" width="600px" append-to-body>
      <el-form ref="congelationRef"   :model="congelationForm" :rules="congelationRules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="备注" prop="remark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:250px;"
                    v-model="congelationForm.remark">
                  </el-input>
            </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="congelationsubmit('congelationRef')">确 定</el-button>
        <el-button @click="congelationcancel('congelationRef')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 批量发短信弹出层 -->
    <el-dialog title="批量发短信" :visible.sync="batchTextingOpen" width="600px" append-to-body>
      <el-form ref="batchTextingRef"   :model="batchTextingForm"  label-width="100px">
            <el-form-item label="模板名称">
                <el-select
                    v-model="batchTextingForm.noteModle"
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeEvent"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in noteModle"
                        :key="dict.title"
                        :label="dict.title"
                        :value="dict.dec"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="模板内容">
               <div>{{noteValue}}</div>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchTextingsubmit('batchTextingRef')">确 定</el-button>
        <el-button @click="batchTextingcancel('batchTextingRef')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 分案导入弹出层 -->
    <el-dialog title="案件上传" :visible.sync="divisionImportOpen" width="600px" append-to-body >
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
          <el-col :span="4">
            模板下载：
          </el-col>
          <el-col :span="18" >
            <el-button size="medium" type="primary" icon="el-icon-upload" @click="divisionDownloadTemp" >案件附件模板下载</el-button>
          </el-col>
     </el-row>
     <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
           附件上传：
        </el-col>
        <el-col :span="18" >
            <el-upload
                ref="upload"
                :limit="1"
                action=""
                :with-credentials="true"
                :http-request="divisionHttpRequest"
                :before-upload="divisionBeforeAvatarUpload"
                :file-list="divisionFileList"
                :auto-upload="false"
             >
                  <el-button size="medium" type="primary" icon="el-icon-upload">批量文件附件上传</el-button>
            </el-upload>
          </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="divisionsubmitForm">确 定</el-button>
        <el-button @click="divisioncancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {treeselect,caseManagerList,uploadAttachmentFile,uploadCaseAttachmentFile,uploadOutFile,caseInfoCaseDistribution,caseEmployeeList ,updateCaseStatus,addCaseLeave,frozenOrUnfrozenCase,caseManagerExport,caseBorrowExport,batchCaseDistribution,caseInfoSmartDistribution} from "@/api/case/index";
import { getToken } from "@/utils/auth";
import  Search  from "@/views/case/search.vue";
import {getcasestatus,getconfig,getcaseSource,getadjustResult,getadjustType} from '@/utils/statusInfo'
import {setStore,getStore}from '@/utils/mUtils.js'
export default {
  name: "Case",
  data() {
    return {
      userList: null,// 用户表格数据
      // 查询参数
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }, // 限制留案时间不能不让选择今天以前的
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        identityNo:null,//身份证号
        customerName:null,//客户姓名
        phone:null,//手机号
        overdueDaysStart:null,//逾期天数开始
        overdueDaysEnd:null,//逾期天数结束
        caseSource:null,//案件来源
        adjustType:null,//调解方式
        caseStatus:null,//分配状态
        distributionDeptId:null,//当前部门
        repayResult:null,//还款结果
        adjustResult:null,//调解结果
        dialResult:null,//拨号结果
        distributionStartTime:null,//分配开始时间
        distributionStartEndTime:null,//分配开始结束时间
        distributionEndStartTime:null,//分配结束开始时间
        distributionEndTime:null,//分配结束结束时间
        entrustStartTime:null,//委托开始时间
        entrustEndTime:null,//委托结束时间
        customerId:null,//客户编号
        label:null,//客户标签
        currentCustomerState:null,//债务人跟进状态
        nextAdjustStartTime:null,//预约跟进开始时间
        nextAdjustEndTime:null,//预约跟进结束时间
        relationPhone:null,//联系人手机号
        noPayTotalStartAmount:null,//当前待还总金额最小
        noPayTotalEndAmount:null,//当前待还总金额最大
        noPayInterestStart:null,//当前待还利息最小
        noPayInterestEnd:null,//当前待还利息最大
        noPayPrincipalStart:null,//当前待还本金最小
        noPayPrincipalEnd:null,//当前待还本金最大
        supportDeduction:null,//是否支持划扣
        distributionUserName:null,//当前催收员
        adjustLastStartTime:null,//调解开始时间
        adjustLastEndTime:null,//调解结束时间
        platPayTotalStartAmount:null,//已经还款总额最小
        platPayTotalEndAmount:null,//已经还款总额最大
        platReduceStartAmount:null,//平台减免总额
        platReduceEndAmount:null,//平台减免总额
        promiseStartTime:null,//承若还款时间
        promiseEndTime:null,//承若还款时间
        loadId:null,//借款编号
        orderField:null,//排序的字段名称
        order:null,//倒叙还是正序
      },
      fileOutSource:'',//出库附件来源
      filecaseSource:'',//附件里面案件来源
      caseSourceSearch:[],
      //状态匹配
      infoStatus:{
          lawsuitStatus:[],//案件状态
          caseSource:[],//案件来源
          adjustResult:[],//调解结果
          adjustType:[],//调解方式

      },
      isShow:false,//是否显示分派按钮和案件状态
      loading:true,
      deptOptions: undefined,// 部门树选项
      appointOpen:false,//是否打开分派弹出层
      smartOpen:false,//
      defaultProps: { //默认选中
        children: "children",
        label: "label",
        id:'id',
        uniqueId:'uniqueId'
      },
      caseIds: [], // 选中数组
      multipleTable: [], //选中行所有数据数组
      distributionEndTime:'',
      smartType:'',//批量分案规则
      distributionList:[],
      distributionUserId:'',//树形中选中的ID
      distributionUserName:"",//树形选中的人的名称
      deptId:'',//树形父节点Id
      deptName:"",//树形父节点名称
      caseOutOpen:false,//出库弹框
      caseFileOpen:false,//是否显示案件上传弹出层
      fileOutList:[],
      caseAttachementOpen:false,
      fileList:[],
      fileList2:[],
      caseAttachementFileList:[],
      mitigateOpen:false,
      leaveCaseOpen:false,//留案申请弹出层是否展示
      leaveForm:{
        caseId:'',
        customerName:'',
        customerId:'',
        phone:'',
        identityNo:'',
        distributionEndTime:'',
        stayEndTime:'',
        stayRemark:'',
        stayPic:'',
        caseSource:''
      },
      leaveRules: {
        stayEndTime: [
          { required: true, message: '请选择日期'}
        ],
        stayRemark: [
          { required: false, message: '请输入备注'}
        ],
        stayPic: [
          { required: true, message: '请上传凭证'}
        ]
      },
      upload: {
        headers: { Authorization: "Bearer " + getToken() },
        url: process.env.VUE_APP_BASE_API + "/common/uploadToQny"
      },
      congelationOpen:false,//冻结申请是否展示
      congelationForm:{
          remark: '',
      },
      congelationRules: {
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
      },
      freezeType:3,
      batchTextingOpen:false,//批量发短信弹出层是否显示
      batchTextingForm:{
          noteModle:''
      },
      noteModle:[
        {title:'催收1',dec:'各位借款人，“XXX”网贷平台涉嫌非法吸收公众存款已于2020年1月1日由杭州市公安局西湖区分局立案侦查，你通过“达飞云贷”办理的借款资金来自“玛瑙湾”平台，现还款通道已变更，请及时添加XX市公安局西湖区分局的微信小程序“智云易投信通”还款。如果对“智云易投信通”有任何疑问，可在工作时间拨打XX公安电话XXXXX咨询。公安机关将依法打击恶意逃废债行为，必要时将采取冻结查封借款人银行账户、支付宝账户及名下其它资产等措施。请各位借款人慎重考虑逃废债成本，依法依约进行还款'},
        {title:'催收2',dec:'智云易投信通”还款流程如下：1、登录微信搜索“智云易投信通”；2、进入小程序首页，点击画面中间的“还款通道”；3、进入登录页面，输入身份证+手机号码+短信验证码登录；4、进入“我的借款页面”，选择要还款的案件，点击立即还款；5、在“收银台”界面选择还款期数，点击“前往转账”6、自行复制还款专户信息，打开网银或支付宝完成转账操作；7、转账完成后点击“我已完成打款”，上传还款凭证，等待审核通过后入账。咨询还款问题可关注公众号“XXXX”或致电XXXX'},
        {title:'催收3',dec:'严正提醒各位借款人，你在达飞云贷借款已严重逾期将被列入上报征信名单，请立即添加XXX公安局西湖区分局的微信小程序“智云易投信通”首页“还款通道”还款。公安机关将依法打击恶意逃废债行为，必要时将采取冻结查封借款人银行账户、支付宝账户及名下其它资产等措施。请各位借款人慎重考虑逃废债成本，依法依约进行还款。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
        {title:'催收4',dec:'严正提醒各位借款人，你在达飞云贷的借款已严重逾期将被列入上报征信和冻结名单，请立即添加杭州市公安局西湖区分局的微信小程序“智云易投信通”首页“还款通道”还款。任何妄图逃避债务的侥幸心理都是不可取的，公安机关将依法打击恶意逃废债行为。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
        {title:'逃废债短信1',dec:'借款人你好，“玛瑙湾”网贷平台涉嫌非法吸收公众存款已于2020年1月1日由XX市公安局西湖区分局立案侦查，你通过“达飞云贷”APP办理的借款资金均来自“XXX”平台，现还款通道已变更，请及时添加XX市公安局西湖区分局的微信小程序“智云易投信通”还款。公、检、法机关将依法严厉打击恶意逃废债行为'},
        {title:'逃废债短信2',dec:'借款人，你在达飞云贷平台申请的贷款严重逾期，现已纳入西湖公安数据库，请登录西湖公安微信小程序“西湖投信通”查询逾期信息并还款。具有还款能力而拒不还款的恶意逃废债行为将被列入失信联合惩戒对象名单，信用管理部门将失信信息纳入人行征信系统，同时不排除采取冻结支付宝以及银行账户等措施。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
        {title:'逃废债金额短信',dec:'借款人，你在达飞云贷平台的待还款金额为，目前已严重逾期，现已纳入西湖公安数据库，请登录西湖公安微信小程序“智云易投信通”-“还款通道”查询逾期信息并还款。具有还款能力而拒不还款的恶意逃废债行为将被列入失信联合惩戒对象名单，信用管理部门将失信信息纳入人行征信系统，同时不排除采取冻结支付宝以及银行账户等措施。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'}
      ],
      noteValue:'',//选中的模板
      divisionImportOpen:false,//是否显示批量分案弹出层
      divisionFileList:[],//分案文件

    };
  },
  components: {Search},
  watch: {

  },
  async created() {
      this.infoStatus.lawsuitStatus= await getcasestatus()
      this.infoStatus.caseSource= await getcaseSource()
      this.infoStatus.adjustResult=await getadjustResult()
      this.infoStatus.adjustType = await getadjustType()
      this.getList();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (row.caseStatus == '3') {
          return 'warning-row';
        }
        return '';
    },
    isString(str){
      var ary=this.$store.getters.permissions;
      for(var i=0,n=ary.length;i<n;i++){
          if(ary[i]==str || ary[i]=="*:*:*"){
                return  true
          }
      }
      return  false
    },
    formatNumber(n){
      var b=parseInt(n).toString();
      var c=n.toString().replace(/\d+\.(\d*)/,"$1")
      var len=b.length;
      if(len<=3){return b+"."+c;}
      var r=len%3;
      return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",")+"."+c:b.slice(r,len).match(/\d{3}/g).join(",")+"."+c;
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
          if(Number(fileAry[i].dictValue)===Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    /** 查列表 */
    getList() {
      this.loading = true;
     // let roles=this.$store.state.user.roles;

      caseManagerList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.storeCache(response.rows);
            this.total = response.total;
          }
        );
    },
    storeCache(rows) {
      const newRow = new Array();
        for (let index = 0; index < rows.length; index++) {
          if(rows[index].caseStatus == 3 || rows[index].caseStatus == 4) {
            continue;
          }
          newRow.push(rows[index]);
        }
        setStore(this.$store.getters.name, newRow);
    },
    sortChange(column, prop, order){
      this.queryParams.orderField=column.prop;
      this.queryParams.order=column.order
      this.getList()

    },
    handlePreview() {

    },
    clearQueryParams() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        identityNo:null,//身份证号
        customerName:null,//客户姓名
        phone:null,//手机号
        overdueDaysStart:null,//逾期天数开始
        overdueDaysEnd:null,//逾期天数结束
        caseSource:null,//案件来源
        adjustType:null,//调解方式
        caseStatus:null,//分配状态
        distributionDeptId:null,//当前部门
        repayResult:null,//还款结果
        adjustResult:null,//调解结果
        dialResult:null,//拨号结果
        distributionStartTime:null,//分配开始时间
        distributionStartEndTime:null,//分配开始结束时间
        distributionEndStartTime:null,//分配结束开始时间
        distributionEndTime:null,//分配结束结束时间
        entrustStartTime:null,//委托开始时间
        entrustEndTime:null,//委托结束时间
        customerId:null,//客户编号
        label:null,//客户标签
        currentCustomerState:null,//债务人跟进状态
        nextAdjustStartTime:null,//预约跟进开始时间
        nextAdjustEndTime:null,//预约跟进结束时间
        relationPhone:null,//联系人手机号
        noPayTotalStartAmount:null,//当前待还总金额最小
        noPayTotalEndAmount:null,//当前待还总金额最大
        noPayInterestStart:null,//当前待还利息最小
        noPayInterestEnd:null,//当前待还利息最大
        noPayPrincipalStart:null,//当前待还本金最小
        noPayPrincipalEnd:null,//当前待还本金最大
        supportDeduction:null,//是否支持划扣
        distributionUserName:null,//当前催收员
        adjustLastStartTime:null,//调解开始时间
        adjustLastEndTime:null,//调解结束时间
        platPayTotalStartAmount:null,//已经还款总额最小
        platPayTotalEndAmount:null,//已经还款总额最大
        platReduceStartAmount:null,//平台减免总额
        platReduceEndAmount:null,//平台减免总额
        promiseStartTime:null,//承若还款时间
        promiseEndTime:null,//承若还款时间
        loadId:null,//借款编号
        orderField:null,//排序的字段名称
        order:null,//倒叙还是正序
      };
      this.resetForm("queryParams");
    },
    seach() {
      this.getList();
    },
    rest(){
     this.clearQueryParams()
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
          this.deptOptions = response.data;
          this.addDisabledLable(this.deptOptions)
      });
    },
    //树节点把父亲节点设置不可点击
    addDisabledLable(data){
      data.forEach((node)=>{
        if(node.children){
          node.disabled=true;
          return this.addDisabledLable(node.children)
        } else {
          if(node.type == 5){//5是催收员
             node.label = node.label + "——" + node.phone;
          }else{
              node.disabled=true;
          }
        }
      })
    },
    // 一排按钮是否亮起
    handleSelectionChange(selection) {
      this.caseIds = selection.map(item => item.caseId);
      this.multipleTable = selection;
    },
    //分派弹出层树的选中
    handleCheckChange(data, checked, node){
      /*if(checked){
        this.$refs.tree.setCheckedNodes([data]);
      }*/
    },
    hanleCheckOnly(node, checked) {
      console.log(node)
          this.$refs.tree.setCheckedNodes([node]);
              this.distributionList = [];
              if (node['type'] == 5) {//催收员
                this.distributionList.push(node['id']);
              }
              console.log(this.distributionList);
    },
     hanleCheckMany(node, checked){
          this.distributionList = [];
          for(var i=0;i<checked.checkedNodes.length;i++){
            if(checked.checkedNodes[i]['type'] == 5){//催收员
              this.distributionList.push(checked.checkedNodes[i]['id']);
            }
          }
         
     },
    //点击分派显示弹出层
    handleLawsuitAppoint(){
      if(this.caseIds.length===0){
            this.$message({
                message: '请选择至少一条数据进行分派',
                type: 'success'
              });
              return
      }
      this.distributionUserId = ''
      this.distributionUserName = ''
      this.deptId = ''
      this.deptName = ''
      this.distributionList = [];
      this.distributionEndTime = '';
      this.getTreeselect();//获取部门树
      this.appointOpen=true;
    },
    //点击批量分派显示弹出层
    handleLawsuitSmart(){
      if(this.caseIds.length===0){
        this.$message({
          message: '请选择至少一条数据进行分派',
          type: 'success'
        });
        return
      }
      this.distributionUserId = ''
      this.distributionUserName = ''
      this.deptId = ''
      this.deptName = ''
      this.distributionList = [];
      this.distributionEndTime = '';
      this.smartType = '';
      this.getTreeselect();//获取部门树
      this.smartOpen=true;
    },
    //点击确定
    distributionSubmitForm(){
          /*let checkedNodes=this.$refs.tree.getCheckedNodes();
          let  halfCheckedNodes=this.$refs.tree.getHalfCheckedNodes();
          this.deptId=halfCheckedNodes[halfCheckedNodes.length-1].id//获取选中的子节点
          this.deptName=halfCheckedNodes[halfCheckedNodes.length-1].label//获取选中的子节点
          this.distributionUserId=checkedNodes[checkedNodes.length-1].id//获取选中的父节点
          this.distributionUserName=checkedNodes[checkedNodes.length-1].label//获取选中的父节点
          console.log(this.deptId+"---"+this.deptName+"---"+this.distributionUserId+"---"+this.distributionUserName)
          console.log(this.$refs.tree.getHalfCheckedKeys()[this.$refs.tree.getHalfCheckedKeys().length - 1]+"---"+this.$refs.tree.getCurrentNode().label+"---"+this.distributionUserId+"---"+this.distributionUserName)*/
          if(this.distributionEndTime == ''){
            this.$message({
              message: '请选择调解回收日期',
              type: 'warning'
            });
            return;
          }
          if(this.distributionList.length == 0){
            this.$message({
              message: '请选择调解催收员',
              type: 'warning'
            });
            return;
          }
          this.getcaseInfoCaseDistribution()

    },
    smartSubmitForm(){
      if(this.distributionEndTime == ''){
        this.$message({
          message: '请选择调解回收日期',
          type: 'warning'
        });
        return;
      }
      if(this.smartType == ''){
        this.$message({
          message: '请选择分案规则',
          type: 'warning'
        });
        return;
      }
      if(this.distributionList.length == 0){
        this.$message({
          message: '请选择调解催收员',
          type: 'warning'
        });
        return;
      }
      this.getcaseInfoCaseSmart();
    },
    async getcaseInfoCaseDistribution(){//分派派接口调用
         let formData = new FormData();
            formData.append("caseIds",this.caseIds);
            formData.append("distributionUserId",this.distributionList[0]);
            formData.append("distributionEndTime",this.distributionEndTime);
        let reault=await caseInfoCaseDistribution(formData);
           if(reault.code==200){
              this.$message({
                message: '分派成功',
                type: 'success'
              });
            }
            this.appointOpen=false;
            this.$refs.tree.setCheckedNodes([]);
            this.buttonType=-1;
            this.getList();
    },
    async getcaseInfoCaseSmart(){//批量分派派接口调用
      let formData = new FormData();
      formData.append("caseIds",this.caseIds);
      formData.append("distributionUserIds",this.distributionList.join(","));
      formData.append("distributionEndTime",this.distributionEndTime);
      formData.append("smartType",this.smartType);
      let reault=await caseInfoSmartDistribution(formData);
      if(reault.code==200){
        this.$message({
          message: '分派成功',
          type: 'success'
        });
      }
      this.smartOpen=false;
      this.$refs.tree.setCheckedNodes([]);
      this.buttonType=-1;
      this.getList();
    },
    //点击取消
    cancel(){
      this.$refs.tree.setCheckedNodes([]);
      this.appointOpen=false;
      this.smartOpen=false;
      this.buttonType=-1;
    },
    handleCaseOut(){
      this.caseOutOpen = true;
    },
    async downloadOutTemp(){
      let url=await getconfig('sys.caseOut.template')
      let a = document.createElement('a')
      a.href =url

      a.click();
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpOutRequest(param) {
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("outSource", this.fileOutSource);
      if(this.fileOutSource == ''){
        this.$message({
          message: '选择出库方式',
          type: 'warning'
        });
        return;
      }
      uploadOutFile(formData).then(res => {
        this.clearCaseOutFile()
        if (res.code == 200){//成功
          this.$message({
            message: '正在出库，请耐心等待',
            type: 'success'
          });
          this.getList()
        }
      });
    },
    clearCaseOutFile(){//清除更新诉讼状态表单
      this.fileOutList=[]
      this.fileOutSource=''
      this.caseOutOpen=false;
    },
    caseOutSubmit(){
      this.$refs.upload.submit()
    },
    caseOutCancel(){
      this.clearCaseOutFile()
    },
    handlecaseFile(){
         this.caseFileOpen=true;
    },
    handlecaseAttachment(){
         this.caseAttachementOpen=true;
    },
    async downloadTemp(){
      let url=await getconfig('sys.caseInfo.template')
      let a = document.createElement('a')
          a.href =url

          a.click();
    },
    async downloadCaseAttachementTemplate(){
      let url=await getconfig('sys.caseAttachement.template')
      let a = document.createElement('a')
          a.href =url
          a.click();
    },
    beforeAvatarUpload(file){//上传文件之前

        const isXML= file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXML) {
          this.$message.error('上传xlsx 格式的文件!');
        }
        return isXML ;
    },
    beforeCaseAttachementUpload(file){
       const fileExt=file.name.substring(file.name.lastIndexOf('.')+1)
        if (fileExt != "zip") {
          this.$message.error('只能上传.zip格式的文件!');
        }
        return true;
    },
    handlecaseAttachmentChange(file, fileList) {
        if(fileList.length > 1) {
          fileList.splice(0,1);
        }
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    httpRequest(param) {
      let formData = new FormData();
          formData.append("file", param.file);
          formData.append("caseSource", this.filecaseSource);
          uploadAttachmentFile(formData).then(res => {
            this.clearCaseFile()
           if (res.code == 200){//成功
              this.$message({
                message: '正在导入，请耐心等待',
                type: 'success'
              });
                this.getList()
           }
      });
    },
     httpRequestCaseAttachement(param) {
      let formData = new FormData();
          formData.append("file", param.file);
          formData.append("caseSource", this.filecaseSource);
          uploadCaseAttachmentFile(formData).then(res => {
            this.clearCaseFile()
           if (res.code == 200){
              this.$message({
                message: '正在导入附件，请耐心等待',
                type: 'success'
              });
           }
      });
    },
    clearCaseFile(){//清除更新诉讼状态表单
      this.fileList=[]
      this.caseAttachementFileList=[]
      this.filecaseSource=''
      this.caseFileOpen=false;
      this.caseAttachementOpen=false;
    },
    caseFilesubmitForm(){
      this.$refs.upload.submit()
    },
    caseFilecancel(){
       this.clearCaseFile()
    },
    handleUpdate(obj){
      const data={
         id:obj.caseId,
         caseStatus:2
      }
     this.getupdateCaseStatus(data);
    },
    async getupdateCaseStatus(data){
        let reault=await updateCaseStatus(data);
        if(reault.code==200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getList()
        }
    },

    toBorrowsubmit(){

    },
    toBorrowcancel(){

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = false;
    },
    handleLeave(){
      if(this.caseIds.length!=1){
        this.$message({
          message: '一次仅限留案一条',
          type: 'warning'
        });
        return
      }
      this.leaveForm.caseId = this.multipleTable[0].caseId;
      this.leaveForm.customerName = this.multipleTable[0].customerName;
      this.leaveForm.customerId = this.multipleTable[0].customerId;
      this.leaveForm.phone = this.multipleTable[0].phone;
      this.leaveForm.identityNo = this.multipleTable[0].identityNo;
      this.leaveForm.distributionEndTime = this.multipleTable[0].entrustEndTime?
        this.multipleTable[0].entrustEndTime : null;
      this.leaveForm.caseSource = this.multipleTable[0].caseSource;
      this.leaveForm.stayEndTime = "";
      this.leaveForm.stayRemark = "";
      this.leaveForm.stayPic = "";
      this.fileList2 = [];
      this.resetForm("leaveFormDialog");
      this.leaveCaseOpen=true
    },
    leaveSubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCaseLeave(this.leaveForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.leaveCaseOpen=false;
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
    leaveCancel(formName){
      this.$refs[formName].resetFields();
      this.leaveCaseOpen=false
    },
    handleRemove(file, fileList) {
      this.fileList2 = fileList;
      if(this.fileList2.length != 0){
        this.leaveForm.stayPic = this.fileList2[0].url;
      }
    },
    handleFileSuccess(data) {
      this.fileList2.push({name:data.name, url:data.url});
      if(this.fileList2.length != 0){
        this.leaveForm.stayPic = this.fileList2[0].url;
      }
    },
    handlCongelation(num){
      this.congelationOpen=true
      this.freezeType=num
    },
    congelationsubmit(formName){
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const caseIds=this.caseIds.toString()
            const data={
                    caseIds:caseIds,
                    remark:this.congelationForm.remark,
                    caseStatus:this.freezeType
            }
            let result=await frozenOrUnfrozenCase(data);
            if(result.code==200){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.getList()
            }
            this.$refs[formName].resetFields();
            this.congelationOpen=false
          } else {
            return false;
          }
      });
    },
    congelationcancel(formName){
      this.$refs[formName].resetFields();
      this.congelationOpen=false
    },
    handlBatchTexting(){
      this.batchTextingOpen=true
    },
    changeEvent(val){
      this.noteValue=val;
    },
    batchTextingsubmit(formName){
        this.batchTextingOpen=false
    },
    batchTextingCancel(formName){
      this.$refs[formName].resetFields();
      this.batchTextingOpen=false

    },
    exportCaseInfoExcel(){
      caseManagerExport(this.queryParams).then(response => {
        if(response.code==200){
          this.download(response.msg);
        }
      });
    },
    exportCaseBorrowExcel(){
      this.$confirm('确定导出所有查询的数据？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                 caseBorrowExport(this.queryParams).then(response => {
                  if(response.code==200){
                    this.$message({message: '正在处理，请到数据管理-数据导出中下载',type:'success', duration:'4000'});
              }});
              }).catch(action => {
                console.log("cancle");
            })

    },
    //分案导入
    handleDivisionimport(){
      this.divisionImportOpen=true

    },
    async divisionDownloadTemp(){
      let url=await getconfig('sys.distribution.template')
      let a = document.createElement('a')
          a.href =url
          a.click();
    },
    divisionBeforeAvatarUpload(file){//上传文件之前
        const isXML= file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXML) {
          this.$message.error('上传xlsx 格式的文件!');
        }
        return isXML ;
    },
    // param是自带参数。 this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    divisionHttpRequest(param) {
      let formData = new FormData();
          formData.append("file", param.file);
          batchCaseDistribution(formData).then(res => {
           this.divisionFileList=[]
            this.divisionImportOpen=false;
           if (res.code == 200){//成功
                this.$message({
                  message: '正在导入，请耐心等待',
                  type: 'success'
                });

                this.getList()
           }
      });
    },
    divisionsubmitForm(){
      this.$refs.upload.submit();
      this.divisionImportOpen=false;
    },
    divisioncancel(){
      this.divisionFileList=[]
      this.divisionImportOpen=false;
    }
  }
};
</script>
<style lang="scss" scoped>
 >>> .warning-row{
    background: oldlace;
  }
</style>
