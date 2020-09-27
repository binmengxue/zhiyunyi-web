<template>
  <div style="padding:0 10px;">
      <el-card class="box-card" style="margin-top:20px;" shadow="never">
        <div slot="header" class="clearfix">
          <el-button style=" float:left" type="text"  @click="addTag"><span style="float:left;margin-right:15px;color:black">客户标签</span>添加标签</el-button>
          <el-button style=" float:left" type="text" disabled>调解员：{{userObj&&userObj.distributionUserName?userObj.distributionUserName:''}}</el-button>
          <el-button style=" float:left" type="text" disabled>部门：{{userObj&&userObj.distributionDeptName?userObj.distributionDeptName:''}}</el-button>
          <el-button style=" float:left" type="text" disabled>数据更新时间：{{userObj&&userObj.lastUpdateTime?userObj.lastUpdateTime:''}}</el-button>
          <el-button style=" float:right" type="text"  @click="nextCase">下一个</el-button>
          <el-button style=" float:right" type="text"  @click="preCase">上一个</el-button>
          <el-button style=" float:right" type="text"  @click="AddRemark">添加调解记录</el-button>
        </div>
        <div  class="text item">
         <span style="margin-right:20px;color:black" v-for="(caseUserLabel,index) in caseUserLabelsList" :key="index"><el-tag>{{getDictLabelByValue(caseUserLabel.label, caseUserSelectLables)}}</el-tag></span>
        </div>
      </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="userInfo">
          <UserInfo  :userData="userObj" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName2" @tab-click="handleClick2">
        <el-tab-pane label="借款记录" name="borrowInfo">
          <BorrowInfo  :userDataRow="caseIdObj"/>
        </el-tab-pane>
        <el-tab-pane label="调解记录" name="caseOperation">
          <CaseOperation :userDataRow="caseIdObj" :userObj="userObj"/>
        </el-tab-pane>
        <el-tab-pane label="常用联系人" name="usecontacts">
          <Usecontacts  :userDataRow="caseIdObj"/>
        </el-tab-pane>
        <el-tab-pane label="分案历史" name="divisio">
         <Divisio :userDataRow="caseIdObj"/>
        </el-tab-pane>
        <el-tab-pane label="还款记录" name="repay">
         <Repay :userDataRow="caseIdObj"/>
        </el-tab-pane>
        <el-tab-pane label="银行卡" name="bank">
         <Bank :userDataRow="caseIdObj"/>
        </el-tab-pane>
        <el-tab-pane label="附件信息" name="attachment">
           <el-container style="flex-direction: column;">

             <el-header v-if="customerPhotoList.length>0" height="10px">客户照片</el-header>
              <el-main v-if="customerPhotoList.length>0">
                 <div class="block">
                  <span class="demonstration" v-for="(item,index) in customerPhotoList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

              <el-header v-if="identityAttachmentList.length>0" height="10px">身份证</el-header>
              <el-main v-if="identityAttachmentList.length>0">
                 <div class="block">
                  <span class="demonstration" v-for="(identity,index) in identityAttachmentList" :key="index" >
                       <pdf  v-if="identity.downloadUrl && identity.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="identity.downloadUrl" ></pdf>
                       <el-image v-else-if="identity.downloadUrl && identity.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9" :src="identity.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="bankAttachmentList.length>0" height="10px">银行卡</el-header>
              <el-main v-if="bankAttachmentList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(bank,index) in bankAttachmentList" :key="index" >
                       <pdf  v-if="bank.downloadUrl && bank.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="bank.downloadUrl" ></pdf>
                       <el-image v-else-if="bank.downloadUrl && bank.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="bank.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="businessLincensList.length>0" height="10px">营业执照——债务人</el-header>
              <el-main v-if="businessLincensList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in businessLincensList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="workList.length>0" height="10px">工作证明</el-header>
              <el-main v-if="workList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in workList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="creditReportList.length>0" height="10px">征信报告</el-header>
              <el-main v-if="creditReportList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditReportList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="borrowApplyList.length>0" height="10px">出借申请表</el-header>
              <el-main v-if="borrowApplyList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in borrowApplyList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header  v-if="loadApplyAttachmentList.length>0" height="10px">出借申请表</el-header>
              <el-main  v-if="loadApplyAttachmentList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(loadApply,index) in loadApplyAttachmentList" :key="index" >
                       <pdf  v-if="loadApply.downloadUrl && loadApply.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="loadApply.downloadUrl" ></pdf>
                       <el-image  v-else-if="loadApply.downloadUrl && loadApply.downloadUrl.indexOf('pdf')==-1"   style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="loadApply.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header  v-if="otherAttachmentList.length>0" height="10px">其它</el-header>
              <el-main  v-if="otherAttachmentList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(other,index) in otherAttachmentList" :key="index" >
                       <pdf  v-if="other.downloadUrl && other.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="other.downloadUrl" ></pdf>
                       <el-image  v-else-if="other.downloadUrl && other.downloadUrl.indexOf('pdf')==-1"   style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="other.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="borrowContractAttachmentList.length>0" height="10px">借款协议</el-header>
              <el-main v-if="borrowContractAttachmentList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(borrowContract,index) in borrowContractAttachmentList" :key="index" >
                       <pdf  v-if="borrowContract.downloadUrl && borrowContract.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="borrowContract.downloadUrl" @click="scaleD"></pdf>
                       <el-image v-else-if="borrowContract.downloadUrl && borrowContract.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="borrowContract.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="borrowContractApplyList.length>0" height="10px">借款咨询服务协议</el-header>
              <el-main v-if="borrowContractApplyList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in borrowContractApplyList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="loadCreditList.length>0" height="10px">放款凭证</el-header>
              <el-main v-if="loadCreditList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in loadCreditList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="withHoldList.length>0" height="10px">代扣协议</el-header>
              <el-main v-if="withHoldList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in withHoldList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="creditChangeList.length>0" height="10px">债权转让协议</el-header>
              <el-main v-if="creditChangeList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditChangeList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="creditChangeNoticeList.length>0" height="10px">债权转让通知书</el-header>
              <el-main v-if="creditChangeNoticeList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditChangeNoticeList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="receiveBorrowList.length>0" height="10px">收款确认函</el-header>
              <el-main v-if="receiveBorrowList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in receiveBorrowList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

            <el-header v-if="compensatoryList.length>0" height="10px">代偿确认函</el-header>
              <el-main v-if="compensatoryList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in compensatoryList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="lenderFlowList.length>0" height="10px">出借人上存流水</el-header>
              <el-main v-if="lenderFlowList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in lenderFlowList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

             <el-header v-if="creditorLincesList.length>0" height="10px">债权方营业执照</el-header>
              <el-main v-if="creditorLincesList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditorLincesList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>

              <el-header v-if="businessLincesList.length>0" height="10px">债权方营业执照</el-header>
              <el-main v-if="businessLincesList.length>0">
                 <div class="block">
                   <span class="demonstration" v-for="(item,index) in businessLincesList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
                </div>
            </el-main>
          </el-container>

        </el-tab-pane>
        <el-tab-pane label="历史委托记录" name="entrust">
         <Entrust :userDataRow="userObj"/>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加标签弹出层 -->
    <el-dialog title="添加标签" :visible.sync="tagOpen" width="600px" append-to-body>
      <el-form ref="tagRef"   :model="tagForm" :rules="rules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="标签" prop='label'>
                  <el-select
                    v-model="tagForm.label"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:250px"
                  >
                    <el-option
                      v-for="dict in caseUserSelectLables"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
            </el-form-item>
            <el-form-item label="添加标签原因" prop="labelRemark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:250px;"
                    v-model="tagForm.labelRemark">
                  </el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTagsubmit('tagRef')">确 定</el-button>
        <el-button @click="addTagcancel('tagRef')">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加调解记录" :visible.sync="appointOpen" width="600px" append-to-body>
        <el-form ref="appointRef" :model="appoint"   :rules="rules" label-width="120px">
            <div style="font-size:16px;padding:0px 0 20px 20px;">
                <i class="el-icon-warning" style="color:#FFBA00;margin-right:5x;"></i> 注：此按键只适用于电话无法接通的欠款人，若家人告知此人失联等可接通的情况请勿点击
            </div>
            <el-form-item label="调解方式" prop="adjustType">
                <el-select
                    v-model="appoint.adjustType"
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeAdjustType"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in adjustTypeList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="dialName">
              <el-select
                    v-model="appoint.dialName"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                     @change="changeEvent"
                >
                    <el-option
                        v-for="(dict, index) in dialNameList"
                        :key="index"
                        :label="dict.dictLabel"
                        :value="dict"
                    />
              </el-select>
            </el-form-item>
            <el-form-item label="被联电话" prop="dialPhone">
                <el-input v-model="dialPhone1" clearable   :disabled="true" size="small" style="width:160px" />
             </el-form-item>
            <el-form-item label="关系" prop="dialRelation">
              <el-select
                    v-model="appoint.dialRelation"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in dialRelationList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
              </el-select>
            </el-form-item>
            <el-form-item label="债务人跟进状态" prop="currentCustomerState">
              <el-select
                v-model="appoint.currentCustomerState"
                placeholder="请选择"
                clearable
                size="small"
                style="width:150px"
              >
                <el-option
                  v-for="dict in currentCustomerStateList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="承诺还款时间"  label-width="120px">
                <el-date-picker
                :picker-options="pickerOptions"
                    v-model="appoint.promiseTime"
                    type="datetime"
                    style="width:200px"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="下次预约时间"  label-width="120px">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="appoint.nextAdjustTime"
                type="datetime"
                style="width:200px"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="调解结果" prop="adjustResult">
                <el-select
                    v-model="appoint.adjustResult"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in adjustResultList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="拨号结果">
                <el-select
                    v-model="appoint.dialResult"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in dialResultList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="沟通时长" v-show="isAdjustTime"  prop="adjustTime">
                <el-input v-model="appoint.adjustTime" clearable  size="small" style="width:160px" />
            </el-form-item>
            <el-form-item label="添加备注"  prop="remark">
               <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="appoint.remark">
                </el-input>
            </el-form-item>
            <el-form-item label="上传凭证" >
              <el-input type="hidden" v-model="appoint.adjustCertificate"/>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('appointRef')">确 定</el-button>
            <el-button @click="cancel('appointRef')">取 消</el-button>
        </div>
        <el-button  size="mini"   v-show="isString('ajxq_tjjl_yjsl')" @click="keyFill" style="position: absolute;top: 130px;right: 30px;" >一键填充（失联）</el-button>
    </el-dialog>
  </div>
</template>

<script>
import UserInfo from "@/views/components/userInfo" //客户信息
import CaseOperation from "@/views/components/caseOperation" //案件信息
import BorrowInfo from "@/views/components/borrowInfo" //调解记录
import Usecontacts from "@/views/components/usecontacts" //常用联系人
import Divisio from "@/views/components/divisio" //分案记录
import Repay from "@/views/components/repay" //还款记录
import Bank from "@/views/components/bank" //银行卡列表
import Entrust from "@/views/components/entrust" //历史委托
import {getStore,setStore} from '@/utils/mUtils.js'
import {getUser,getUserInfoByCaseId,addCaseUserLabel,getcaseUserLablesList,getCaseAttachmentList,getCaseAttachmentListByCaseId,getCaseUserContactsByCaseId,addCaseAdjustRecord} from "@/api/case/index";
import {getcaseUserLabels,getcaseSource,getCaseAttachmentFrontConfig,getdialRelation,getadjustType,getCurrentCustomerState,getadjustResult,getdialResult} from '@/utils/statusInfo'
import {getDictLabelByValue} from '@/utils/ruoyi'
import CallPhone from "@/components/CallPhone"
import { getToken } from "@/utils/auth";
import pdf from 'vue-pdf';
export default {
  name: "Casedetail",
  data() {
    return {
      activeName:'userInfo',
      activeName2:'borrowInfo',
      iponeNuber:-1,
      caseIdObj:{
        caseId:null
      },
      scale: 100,
      userObj: {},
      baseUrl: 'http://record.zhiyunyi.net/',
      tagOpen:false,
      tagForm:{
      },
      customerPhotoList: [],
      identityAttachmentList: [],
      bankAttachmentList: [],
      businessLincensList: [],
      workList: [],
      creditReportList: [],
      borrowApplyList: [],
      loadApplyAttachmentList: [],
      otherAttachmentList: [],
      borrowContractAttachmentList: [],
      borrowContractApplyList: [],
      loadCreditList: [],
      withHoldList: [],
      creditChangeList: [],
      creditChangeNoticeList: [],
      receiveBorrowList: [],
      compensatoryList: [],
      lenderFlowList: [],
      creditorLincesList: [],
      businessLincesList:[],
      caseAttachmentFrontConfigList:[],
      caseUserLabelsList:[],
      caseSourceList:[],
      caseUserSelectLables: [],
      rules:{
        label: [
                { required: true, message: "标签不能为空", trigger: "blur" }
              ]
      },
      appointOpen:false,//是否显示调解记录弹出层
      pickerOptions: {
        disabledDate(time) {
        　　　　return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }, // 限制留案时间不能不让选择今天以前的
      appoint:{
        caseId:'',
        dialResult:'',
        dialRelation:'',
        currentCustomerState:'',
        promiseTime:'',
        nextAdjustTime:'',
        adjustResult:'',
        adjustType: '',
        dialPhone:'',
        dialName:'',
        remark:'',
        adjustTime:'',
        adjustCertificate:'',
      },
      dialPhone1:'',
      isAdjustTime:false,
      rules:{
        adjustType: [
                { required: true, message: '请选择', trigger: 'change' }
        ],
        dialName: [
                { required: true, message: '请选择', trigger: 'change' },
        ],
        dialPhone: [
                { required: true, message: '请输入', trigger: 'blur' },
        ],
        currentCustomerState: [
                { required: true, message: '请选择', trigger: 'change' },
        ],
        adjustResult: [
                { required: true, message: '请选择', trigger: 'change' }
        ],
        adjustTime: [
                { required: false, message: '请输入', trigger: 'blur' },
        ],
        remark: [
                { required: true, message: '请输入', trigger: 'blur' },
        ],

      },
      upload: {
            headers: { Authorization: "Bearer " + getToken() },
            url: process.env.VUE_APP_BASE_API + "/common/uploadToQny"
      },
      fileList2:[],
      dialRelationList:[],
      adjustTypeList: [],
      adjustResultList:[],
      dialNameList:[],
      currentCustomerStateList:[],
      dialResultList:[],

    }
  },
  components: {UserInfo,CaseOperation,BorrowInfo,Usecontacts,Divisio,Repay,pdf,Bank,Entrust},

  watch: {



  },

  async created() {
    this.caseIdObj.caseId=this.$route.params.caseId;
    //字典数据
    this.caseUserSelectLables = await getcaseUserLabels()
    this.caseSourceList = await getcaseSource()
    this.caseAttachmentFrontConfigList = await getCaseAttachmentFrontConfig()
    this.dialRelationList= await getdialRelation()
    this.adjustTypeList = await getadjustType();
    this.adjustResultList= await getadjustResult()
    this.currentCustomerStateList= await getCurrentCustomerState()
    this.dialResultList= await getdialResult()
    this.getUserInfo()
    this.getCaseAttachmentList()
    this.getCaseUserLabels()
    this.$route.meta.title = this.$route.params.customerName
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
    async getCaseUser(){
      const result=await getCaseUserContactsByCaseId(this.caseIdObj);
       this.dialNameList= result.data
     },
    stringToAry(str){
        var ary= str.split(",");
      return  ary
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
    handleClick(){

    },
    handleClick2(){

    },
    addTag(){
      this.tagOpen=true
    },
    scaleD() {
      debugger
      console.log(this.$refs.url);
    },
    nextCase() {
        const pageData = getStore(this.$store.getters.name);
        const caseExist = false;
        for(var i =0; i< pageData.length; i++) {
           if(pageData[i].caseId == this.caseIdObj.caseId) {
             if(i + 1 == pageData.length) {
                this.$message({
                  duration: 5000,
                  message: '案件列表当前页已到底，请翻页',
                  type: 'error'
                });
               return
             }
             this.$router.replace({
              path: '/casedetail/' + pageData[i + 1].caseId + pageData[i + 1].customerName
            })
            this.$route.meta.title =pageData[i + 1].customerName + "案件详情"
            caseExist = true;
           }
        }
        if(!caseExist) {
           this.$router.replace({
              path: '/casedetail/' + pageData[0].caseId + pageData[0].customerName
            })
            this.$route.meta.title = pageData[0].customerName + "案件详情"
        }
    },
    preCase() {
        const pageData = getStore(this.$store.getters.name);
        const caseExist = false;
        for(var i =0; i< pageData.length; i++) {
           if(pageData[i].caseId == this.caseIdObj.caseId) {
             if(i -1  < 0) {
                this.$message({
                  duration: 5000,
                  message: '案件列表当前页已到第一个，请翻页',
                  type: 'error'
                });
               return
             }
             this.$router.replace({
              path: '/casedetail/' + pageData[i - 1].caseId + pageData[i - 1].customerName
            })
            caseExist = true;
           }
        }
        if(!caseExist) {
           this.$router.replace({
              path: '/casedetail/' + pageData[0].caseId + pageData[0].customerName,
            })
        }
    },
    getImgUrl(url){
      const newUrl='http://record.zhiyunyi.net/'+url;
      return newUrl;
    },
    addTagsubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tagForm.caseId = this.caseIdObj.caseId
          addCaseUserLabel(this.tagForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("添加成功")
                 this.$refs[formName].resetFields();
                this.tagOpen = false
                this.getCaseUserLabels()
              } else {
                this.msgError(response.msg);
              }
          });
        } else {
          return false;
        }
      });
    },
    addTagcancel(formName){
       this.$refs[formName].resetFields();
      this.tagOpen = false
    },
    getUserInfo() {
      getUserInfoByCaseId(this.caseIdObj).then(response => {
        this.userObj = response.data;
        console.log(this.userObj)
        this.userObj.caseSource = getDictLabelByValue(this.userObj.caseSource, this.caseSourceList);
      });
    },
    showBigImg(obj) {
        location.href = obj.innerHtml;
    },
    getDictLabelByValue(vaule,arys){
        let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
            if(Number(fileAry[i].dictValue) === Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    getCaseUserLabels() {
      getcaseUserLablesList(this.caseIdObj).then(response => {
        if(response.code == 200) {
          this.caseUserLabelsList = response.data
        }
      })
    },
    getCaseAttachmentList() {
      getCaseAttachmentListByCaseId(this.caseIdObj).then(response => {
        if(response.code == 200) {
          for(var v in response.data) {
            if(v == "1")  {
              this.customerPhotoList = response.data[v]
            } else if(v === "2") {
              this.identityAttachmentList = response.data[v]
            } else if(v == "3") {
              this.bankAttachmentList = response.data[v]
            } else if(v == "4") {
              this.businessLincensList = response.data[v]
            } else if(v == "5") {
              this.workList = response.data[v]
            } else if(v == "6") {
              this.creditReportList = response.data[v]
            } else if(v == "7") {
              this.borrowApplyList = response.data[v]
            } else if(v == "8") {
              this.loadApplyAttachmentList = response.data[v]
            } else if(v == "9") {
              this.otherAttachmentList = response.data[v]
            }else if(v == "10") {
              this.borrowContractAttachmentList = response.data[v]
            }else if(v == "11") {
              this.borrowContractApplyList = response.data[v]
            }else if(v == "12") {
              this.loadCreditList = response.data[v]
            }else if(v == "13") {
              this.withHoldList = response.data[v]
            }else if(v == "14") {
              this.creditChangeList = response.data[v]
            }else if(v == "15") {
              this.creditChangeNoticeList = response.data[v]
            }else if(v == "16") {
              this.receiveBorrowList = response.data[v]
            }else if(v == "17") {
              this.lenderFlowList = response.data[v]
            }else if(v == "18") {
              this.creditorLincesList = response.data[v]
            }else if(v == "19") {
              this.businessLincesList = response.data[v]
            }
          }
        }
      })
    },
    AddRemark(){
        this.appoint.dialResult = '';
        this.appoint.dialRelation = '';
        this.appoint.currentCustomerState = '';
        this.appoint.promiseTime = '';
        this.appoint.nextAdjustTime = '';
        this.appoint.adjustResult = '';
        this.appoint.adjustType = '';
        this.appoint.dialPhone = '';
        this.appoint.dialName = '';
        this.appoint.remark = '';
        this.appoint.adjustTime = '';
        this.appoint.adjustCertificate = '';
        this.resetForm("appointRef");
        this.appointOpen=true;
        this.getCaseUser()
    },
    changeAdjustType(val){
        if(val=="1"){
           this.isAdjustTime=false
        }else{
            this.isAdjustTime=true
        }
    },
    handleRemove(file, fileList) {
      this.fileList2 = fileList;
      if(this.fileList2.length != 0){
        this.appoint.adjustCertificate = this.fileList2[0].url;
      }
    },
    handleFileSuccess(data) {
      this.fileList2.push({name:data.name, url:data.url});
      if(this.fileList2.length != 0){
        this.appoint.adjustCertificate = this.fileList2[0].url;
      }
    },
    submitForm(formName){
      console.log(this.appoint)
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.appoint.caseId=this.caseIdObj.caseId;
             addCaseAdjustRecord(this.appoint).then(response => {
                 if(response.code==200){
                     this.$message({
                         message: '添加调解记录成功',
                         type: 'success'
                     });
                 } else {
                     this.$message({message: response.message});
                 }
                 this.$refs[formName].resetFields();
                 this.appointOpen=false
             });
          } else {
            return false;
          }
        });
    },
    cancel(formName){
       this.$refs[formName].resetFields();
       this.appointOpen=false
    },
    changeEvent(obj){
      this.appoint.dialName=obj.relationName;
      this.appoint.dialPhone=obj.relationPhone;
      this.dialPhone1=this.plusXing(this.appoint.dialPhone,3,4)
    },
    keyFill(){
      this.appoint={
        adjustType:'1',
        adjustResult:'7',
        currentCustomerState:'5',
        dialResult:'2',
        remark:'停机，空号，不接，失联'
      }

    }
  }

}
</script>
<style lang="scss" scoped>
.el-tabs{
  margin-top:15px;
}
 el-header {
    height: 10px;
  }
</style>
