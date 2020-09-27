<template>
  <div class="app-container">
    <el-row>
      <el-col :span="span2">
         <el-button type="primary"  @click="backClick" >返回中国</el-button>
         <el-button type="primary"  @click="handleFullScreen" @keyup.esc="exitFull">{{fullscreen?'退出全屏':'全屏展示'}}</el-button>
           <ve-map 
           :legend-visible="true"
           :data="dataMap" 
           :events="chartEvents"
           :settings="settingsMap"
           :colors="colors3"
            width="auto"
           :height="mapHeight"
           ></ve-map>
      </el-col>
      <el-col :span="6" v-show="pingtuIsShow">
        <el-card class="box-card" shadow="hover" >
          <div slot="header" class="clearfix">
            <span style="border-left: 6px solid rgb(5, 156, 214);padding-left: 10px;">调解成功率省市排名</span>
          </div>
           <ve-pie 
            :series="series1" 
            :tooltip="tooltip1"
            :colors="colors1"
            width="100%"
          ></ve-pie>
          <ve-pie 
            :series="series1" 
            :tooltip="tooltip1"
            :colors="colors1"
            width="100%"
          ></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="hover" >
          <div slot="header" class="clearfix">
            <span style="border-left: 6px solid rgb(5, 156, 214);padding-left: 10px;">调解成功率省市排名</span>
          </div>
           <ve-histogram
            :data="dataHistogram"
            :settings="settingsHistogram"
            :yAxis="yAxisHistogram"
          :backgroundColor="backgroundColorHistogram"
       
   
           ></ve-histogram>
        </el-card> 
      </el-col>
    </el-row>
  </div>
</template>
<script>
import china from "echarts/map/json/china.json";
import echarts from 'echarts/lib/echarts'
export default {
  name: 'Index',
  components: {},
  data() {
     var self = this
      this.chartEvents = {
        click: function (e) {
          let ary=self.nameMap
           for (var i = 0; i < ary.length; i++) {
            if (e.name === ary[i].name) {
              //显示对应省份的方法
              self.settingsMap.position=ary[i].value
              return false
            }
          }
        },
        dblclick:function(e){
          self.settingsMap.position="china"
        }
      }
    return {
      
      fullscreen: false,
      pingtuIsShow:true,
      span2:18,
      mapHeight:'800px',
      series1:[
        {
            name:'司法资源覆盖率（全国）',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
                {value:  24, name: '已覆盖'},
                {value:  10, name: '未覆盖'},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
      ],
      tooltip1: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      colors1:[  '#0378ca','#0096ff'],
      nameMap:[
        {name:'上海',value:'province/shanghai'},
        {name:'河北',value:'province/hebei'},
        {name:'山西',value:'province/shanxi'},
        {name:'内蒙古',value:'province/neimenggu'},
        {name:'辽宁',value:'province/liaoning'},
        {name:'吉林',value:'province/jilin'},
        {name:'黑龙江',value:'province/heilongjiang'},
        {name:'江苏',value:'province/jiangsu'},
        {name:'浙江',value:'province/zhejiang'},
        {name:'安徽',value:'province/anhui'},
        {name:'福建',value:'province/fujian'},
        {name:'江西',value:'province/jiangxi'},
        {name:'山东',value:'province/shandong'},
        {name:'河南',value:'province/henan'},
        {name:'湖北',value:'province/hubei'},
        {name:'湖南',value:'province/hunan'},
        {name:'广东',value:'province/guangdong'},
        {name:'广西',value:'province/guangxi'},
        {name:'海南',value:'province/hainan'},
        {name:'四川',value:'province/sichuan'},
        {name:'贵州',value:'province/guizhou'},
        {name:'云南',value:'province/yunnan'},
        {name:'西藏',value:'province/xizang'},
        {name:'陕西',value:'province/shanxi'},
        {name:'甘肃',value:'province/gansu'},
        {name:'青海',value:'province/qinghai'},
        {name:'宁夏',value:'province/ningxia'},
        {name:'新疆',value:'province/xinjiang'},
        {name:'北京',value:'province/beijing'},
        {name:'天津',value:'province/tianjin'},
        {name:'重庆',value:'province/chongqing'},
        {name:'香港',value:'province/xianggang'},
        {name:'澳门',value:'province/aomen'},
      ],
      dataMap: {
          columns: ['位置'],
          rows: [
             { '位置': '吉林','人口':123,'税收':2222},
             { '位置': '朝阳区','人口':123,'税收':2222},
             { '位置':"新疆"},
          ]
      },
      settingsMap: {
        selectedMode:'multiple',
        position: 'china',
        selectData: true,
        zoom:1,
        aspectScale:1,
        yAxisType: ['0,0'],
        metrics: ['人口','税收'],	          
        label: {
            normal: {
                show: true,//显示省份标签
                textStyle:{color:"#fbfdfe"}//省份标签字体颜色
            },
            emphasis: {//对应的鼠标悬浮效果
                show: true,
                textStyle:{
                  color:"#fff",
                  fontSize:16,
                }
            }
        },
        itemStyle: {
            normal: {
                borderWidth:1,//区域边框宽度
                borderColor: '#fff',//区域边框颜色
                areaColor:"#276fce",//区域颜色
                
            },
            emphasis: {
                borderWidth:1,
                borderColor: '#fff',
                areaColor:"#046ef9",
                shadowColor: 'rgba(0,0,0,0.5)',
		            shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur:4,
            }
        },
      },
      colors3:["#64ceff","#4c9dc3"],
      dataHistogram:{
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      settingsHistogram:{
        label: {
            normal: {
                show: true,//显示省份标签
                textStyle:{color:"#fbfdfe"}//省份标签字体颜色
            },
            emphasis: {//对应的鼠标悬浮效果
                show: true,
                textStyle:{
                  color:"#fff",
                  fontSize:14,
                }
            }
        },
        itemStyle: {
            normal: {
                   color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    )
            }
        }
      },
      yAxisHistogram:[
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }
      ],
      backgroundColorHistogram:"",
     
    }
    
  },
  created() {
   
  },
  mounted(){


  
  },

  methods: {
    backClick(){
      this.settingsMap.position="china"
    },
    handleFullScreen(){
        let element = document.documentElement;
        let self = this;
        if (this.fullscreen) {
             self.pingtuIsShow=true;
             self.span2=18;
            self.mapHeight='800px';
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
         self.pingtuIsShow=false;
          self.span2=24;
         self.mapHeight='1000px';
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        self.fullscreen = !self.fullscreen;
    },
    exitFull(){
      console.log(111)
               this.fullscreen = true;
               this.span2=18;
                this.mapHeight='800px';
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  overflow-x: auto;

}
.el-card{
  margin-bottom:20px;
}
.el-card.is-always-shadow{
 box-shadow: 0 0px 0px 0 rgba(0,0,0,0.1);
}
</style>
