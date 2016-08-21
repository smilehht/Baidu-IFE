window.onload=function(){


var oField_date=document.getElementById("form-gra-time");
var oField_city=document.getElementById("city-select");
var oChart=document.getElementById("aqi-chart");
var oDate=oField_date.getElementsByTagName("input");
var date_type=getDateType();
var city=oField_city.value;
// alert(date_type);
init();



//获取当前时间粒度
function getDateType(){
  var str="";
  for (var i = 0; i < oDate.length; i++) {
    if(oDate[i].checked==true){
        str=oDate[i].value;
    }
  }
  return str;
}



// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};



// alert(aqiSourceData["北京"]["2016-01-01"]);
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  oChart.innerHTML="";
  var oUl=document.createElement("ul");
  var num=0;
  for (var i in  aqiSourceData[city]) {
    if (num<30) {
      var oli=document.createElement("li");
      oli.style.height=aqiSourceData[city][i];
      oli.style.marginTop=(520-aqiSourceData[city][i])+"px";
      oUl.appendChild(oli);
      num++;
    }
  } 
  oChart.appendChild(oUl);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(date_type==getDateType()){
    return false;
  }
  // alert("2");
  // 设置对应数据
  date_type=getDateType();
  // alert(date_type);
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  // if(city==oField_city.value){
  //   return false;
  // }
  // 设置对应数据
  city=oField_city.value;
  alert(city);
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  //日期粒度改变后调用graTimeChange函数
  oField_date.addEventListener("click",function(ev){
    // alert("1");
      // var event=ev||event;
      // var target=event.target;
      // target.onclick=
      graTimeChange();
  },false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  oField_city.onmouseup=function(){


    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    if(city==oField_city.value){
      return false;
    }
    citySelectChange();

  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

}