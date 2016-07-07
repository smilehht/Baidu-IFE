window.onload=function(){

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

var city_input=document.getElementById("aqi-city-input");
var value_input=document.getElementById("aqi-value-input");
var add_button=document.getElementById("add-btn");
var aqi_table=document.getElementById("aqi-table");

init();


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  aqiData[city_input.value]=value_input.value;
  
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var str="";
  str="<thead><tr><th>城市</th><th>空气质量</th><th>操作</th></tr></thead>";
  for (var items in aqiData) {
    var Property="";
    str+="<tr><td>"+items+"</td><td>"+aqiData[items]+"</td><td><button>删除</button></td></tr>"
  }
  aqi_table.innerHTML=str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.

  var oTd=target.parentNode.parentNode.getElementsByTagName("td")[0];
  var city=oTd.innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {
  	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    add_button.onclick=addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    aqi_table.onclick=function(ev){ 
      var event=ev||event;
      var target=event.target;
      delBtnHandle(target);
    };
}


}