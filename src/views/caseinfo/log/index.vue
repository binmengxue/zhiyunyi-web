<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
    <el-form-item label="开始时间" prop="createTime">
       <el-date-picker
                  v-model="queryParams.createTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="updateTime">
       <el-date-picker
                  v-model="queryParams.updateTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="queryParams.status" placeholder="状态" clearable size="small">
          <el-option
            v-for="dict in exportLogStatus"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
    </el-row>

    <el-table v-loading="loading" :data="logList">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="导出内容标识" align="center" prop="name" />-->
      <el-table-column label="文件下载地址" align="center" prop="url" />
      <el-table-column label="状态" align="center" prop="status" >
          <template slot-scope="scope">
            {{getFileItem(scope.row.status,exportLogStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="creatorName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
          v-show="scope.row.status==1"
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="download(scope.row)"
            v-hasPermi="['caseinfo:log:remove']"
          >下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listLog, getLog, delLog, addLog, updateLog, exportLog } from "@/api/caseinfo/log";
import {getExportLogStatus} from "@/utils/statusInfo"
import { download } from "@/utils/download.js";
export default {
  name: "Log",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 数据导出列表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: undefined,
        createTime:undefined,
        updateTime:undefined
      },
      exportLogStatus:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  async created() {
    this.exportLogStatus = await getExportLogStatus()
    this.getList();
  },
  methods: {
    /** 查询数据导出列列表 */
    getList() {
      this.loading = true;
      listLog(this.queryParams).then(response => {
        this.logList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getFileItem(vaule,arys){
      let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
          if(Number(fileAry[i].dictValue)===Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        status: "0",
        createId: undefined,
        createTime: undefined,
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateLog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addLog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 下载 */
    download(row) {
      if(row.url.endsWith(".zip")){
        location.href = row.url;
      } else {
        var xmlHttp = null;
        if (window.ActiveXObject) {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
          xmlHttp = new XMLHttpRequest();
        }
        if (xmlHttp != null) {
          xmlHttp.open("get", row.url, true);
          xmlHttp.send();
          xmlHttp.onreadystatechange = doResult;
        }

        function doResult() {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
              download(xmlHttp.responseText, row.url.substring(row.url.lastIndexOf("/") + 1), "text/plain");
            }
          }
        }
      }
    }
  }
};
</script>
