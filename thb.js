/*global $ */
var map;
var geocoder;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var cmsMap = new HashMap();
var rdMap = new HashMap();
var viMap = new HashMap();
var wdMap = new HashMap();
var proHwyRdMap = new HashMap(); //省道雨量偵測資訊
var markerMap = new HashMap(); var markerMap2 = new HashMap();             //marker in markerMap2 is for illustration
var highwayCctvMap = new HashMap(); var highwayCctvMap2 = new HashMap();   //marker in highwayCctvMap2 is for illustration

var deviceMap = new HashMap(); var vdRealtimeDataMap =new HashMap();
var eventMap = new HashMap();
var blockingMap = new HashMap();
var weatherMap = new HashMap();
var alternativeJamRoadMap = new HashMap();
var countyMap = new HashMap();
var disasterMap = new HashMap();
var earlyWarningMap = new HashMap();
var rainfallMap = new HashMap();
var cctvLayer;
var kmlLayerOptions = {preserveViewport:true,suppressInfoWindows: true};
var airportToPingzhenLayer;var guanxiToTuchengLayer;var hsinchuToChanghuaLayer;var dayaToYuanlinLayer;var douliuToWufengLayer;var xindianToTouchengLayer;var wuguToAirportLayer
var hwMoeLayer1;var hwMoeLayer2;var hwMoeLayer3;var hwMoeLayer4;var hwMoeLayer5;var hwMoeLayer6;
var timer = null; var iPadTimer;
var infoWindow = null, infoWindow2 = null;

var moeColorLayer;var moe2ColorLayer;var moe3ColorLayer;
var t1ALayer;var t2ALayer;var t3ALayervar;var t4ALayervar;var t5ALayer;var t6ALayer;var t7ALayer;var t8ALayer;var t8ALayer;var t9ALayer;var t10ALayer;var t31ALayer;var t61ALayer;var t66ALayer;var t76ALayer;
var moeSceneryLayer;var moe2SceneryLayer;
var disasterLayer;var earlyWarningLayer;
var isCctvPause = false;
var lastCctvUrl = "";
var cctvTimer;

var moeColorKml = "http://61.67.72.1/data/moeBaseLine/moe1.kml";
var moe2ColorKml = "http://61.67.72.1/data/moeBaseLine/moe2.kml";
var moe3ColorKml = "http://61.67.72.1/data/moeBaseLine/moe3.kml";
var moe4ColorKml = "http://61.67.72.1/data/moeBaseLine/moe4.kml";
var moe5ColorKml = "http://61.67.72.1/data/moeBaseLine/moe5.kml";
var t1AKml = "http://61.67.72.1/data/moeBaseLine/T1_BaseLine.kml";
var t2AKml = "http://61.67.72.1/data/moeBaseLine/T2_BaseLine.kml";
//var t2ATestKml = "http://61.67.72.1/data/moeBaseLine/T2_BaseLineTest.kml";	//測試用
var t3AKml = "http://61.67.72.1/data/moeBaseLine/T3_BaseLine.kml";
var t4AKml = "http://61.67.72.1/data/moeBaseLine/T4_BaseLine.kml";
var t5AKml = "http://61.67.72.1/data/moeBaseLine/T5_BaseLine.kml";
var t6AKml = "http://61.67.72.1/data/moeBaseLine/T6_BaseLine.kml";
var t7AKml = "http://61.67.72.1/data/moeBaseLine/T7_BaseLine.kml";
var t8AKml = "http://61.67.72.1/data/moeBaseLine/T8_BaseLine.kml";
var t9AKml = "http://61.67.72.1/data/moeBaseLine/T9_BaseLine.kml";
var t10AKml = "http://61.67.72.1/data/moeBaseLine/T10_BaseLine.kml";
var t11AKml = "http://61.67.72.1/data/moeBaseLine/T11_BaseLine.kml";
var t12AKml = "http://61.67.72.1/data/moeBaseLine/T12_BaseLine.kml";
var t13AKml = "http://61.67.72.1/data/moeBaseLine/T13_BaseLine.kml";
var t14AKml = "http://61.67.72.1/data/moeBaseLine/T14_BaseLine.kml";
var t15AKml = "http://61.67.72.1/data/moeBaseLine/T15_BaseLine.kml";
var t16AKml = "http://61.67.72.1/data/moeBaseLine/T16_BaseLine.kml";
var t17AKml = "http://61.67.72.1/data/moeBaseLine/T17_BaseLine.kml";
var t18AKml = "http://61.67.72.1/data/moeBaseLine/T18_BaseLine.kml";
var t19AKml = "http://61.67.72.1/data/moeBaseLine/T19_BaseLine.kml";
var t20AKml = "http://61.67.72.1/data/moeBaseLine/T20_BaseLine.kml";
var t21AKml = "http://61.67.72.1/data/moeBaseLine/T21_BaseLine.kml";
var t25AKml = "http://61.67.72.1/data/moeBaseLine/T25_BaseLine.kml";
var t26AKml = "http://61.67.72.1/data/moeBaseLine/T26_BaseLine.kml";
var t28AKml = "http://61.67.72.1/data/moeBaseLine/T28_BaseLine.kml";
var t31AKml = "http://61.67.72.1/data/moeBaseLine/T31_BaseLine.kml";
var t61AKml = "http://61.67.72.1/data/moeBaseLine/T61_BaseLine.kml";
var t63AKml = "http://61.67.72.1/data/moeBaseLine/T63_BaseLine.kml";
var t66AKml = "http://61.67.72.1/data/moeBaseLine/T66_BaseLine.kml";
var t74AKml = "http://61.67.72.1/data/moeBaseLine/T74_BaseLine.kml";
var t76AKml = "http://61.67.72.1/data/moeBaseLine/T76_BaseLine.kml";


//default value  when map initialize
var zoom = 8;//var lat=23.778381;var lng=120.973978;
var lng=121.615125; var lat=24.958967;
//real env
var vdSrc = "http://61.67.72.1/data/VdDataAllZone.xml";
var cmsInfoSrc = "http://61.67.72.1/data/CmsInfo.xml";
//var rdInfoSrc = "http://61.67.72.1/data/RdInfo.xml";
//var viInfoSrc = "http://61.67.72.1/data/ViInfo.xml";
//var wdInfoSrc = "http://61.67.72.1/data/WdInfo.xml";
var rdInfoSrc = "http://61.67.72.1/thbTest/data/RdInfo.xml";
var viInfoSrc = "http://61.67.72.1/thbTest/data/ViInfo.xml";
var wdInfoSrc = "http://61.67.72.1/thbTest/data/WdInfo.xml";
//var disasterXmlSrc = "http://bobe168.tw/datachangexml.aspx?UID=iisi";
//var earlyWarningSrc = "http://thb-gis.thb.gov.tw/Normaltemp.aspx?U=thb";
var disasterXmlSrc = "http://thb-gis.thb.gov.tw/NonOpenEventList.aspx?U=thb";
var earlyWarningSrc = "http://thb-gis.thb.gov.tw/Normaltemp.aspx?U=thb";
var rainfallXmlSrc = "http://thb-gis.thb.gov.tw/ChangeRain.aspx?UID=iisi";
//var proHwyRdInfoSrc = "http://localhost:8180/thb/data/proHwyRdTestInfo.xml";
var proHwyRdUrlPrefix = "http://localhost:80/thb/data";
var proHwyRdUrlSuffix = ".txt";
var proHwyRdFtpUrl = "117.56.4.156";
//test env
/*
var vdSrc = "http://210.59.250.246:8088/temp/thb/VdDataAllZone.xml";
var cmsInfoSrc = "http://210.59.250.246:8088/temp/thb/CmsInfo.xml";
var rdInfoSrc = "http://localhost:8180/thb/data/RdInfo.xml";
var viInfoSrc = "http://localhost:8180/thb/data/ViInfo.xml";
var wdInfoSrc = "http://localhost:8180/thb/data/WdInfo.xml";
var disasterXmlSrc = "http://210.59.250.246:8088/temp/thb/disasters.xml";
var rainfallXmlSrc = "http://210.59.250.246:8088/temp/thb/rainfall.xml";
*/

var weatherUrlPrefix = "http://210.59.250.246:8088/TrafficAsset/Weather/";
var weatherUrlSuffix = ".xml";
var hwMoeKml1 = "http://117.56.220.2/exchange_data/kml/thbmoe1.kml";
var hwMoeKml2 = "http://117.56.220.2/exchange_data/kml/thbmoe2.kml";
var hwMoeKml3 = "http://117.56.220.2/exchange_data/kml/thbmoe3.kml";
var hwMoeKml4 = "http://117.56.220.2/exchange_data/kml/thbmoe4.kml";
var hwMoeKml5 = "http://117.56.220.2/exchange_data/kml/thbmoe5.kml";
var hwMoeKml6 = "http://117.56.220.2/exchange_data/kml/thbmoe6.kml";

var deviceJsonObject;
//var mobileUrlInterval;

function updateData () {
    
    try {
        //reload CCTV、VD
        vdRealtimeDataMap.clear();
        if ($("#deviceCheck").attr("src").indexOf("_click.png") > -1) {
                var deviceArr = deviceMap.values();
                for (var index in deviceArr) {
                    var deviceMarker = deviceArr[index];
                    deviceMarker.setMap(null);
                }
                deviceMap.clear();
        } else {
                deviceMap.clear();
        }
        getVdRealtimeData();
    }
    catch(err) {
        $.log.debug(err);
    }
    
    try {
        //reload CMS
        if ($("#cmsCheck").attr("src").indexOf("_click.png") > -1) {
            var cmsArr = cmsMap.values();
            for (var i=0;i < cmsArr.length;i++){
                    var cmsMarker = cmsArr[i];
                    cmsMarker.setMap(null);
            }
            cmsMap.clear();
        } else {
            cmsMap.clear();
        }
        loadCMS();
    }
    catch(err) {
        $.log.debug(err);
    }
    
    try {
        //reload 雨量偵測器
        if ($("#rdCheck").attr("src").indexOf("_click.png") > -1) {
            var rdArr = rdMap.values();
            for (var i=0;i < rdArr.length;i++){
                    var rdMarker = rdArr[i];
                    rdMarker.setMap(null);
            }
            rdMap.clear();
        } else {
            rdMap.clear();
        }
        loadRd();
    }
    catch(err) {
        $.log.debug(err);
    }
    
    try {
        //reload 濃霧偵測器
        if ($("#viCheck").attr("src").indexOf("_click.png") > -1) {
            var viArr = viMap.values();
            for (var i=0;i < viArr.length;i++){
                    var viMarker = viArr[i];
                    viMarker.setMap(null);
            }
            viMap.clear();
        } else {
            viMap.clear();
        }
        loadVi();
    }
    catch(err) {
        $.log.debug(err);
    }
    
    try {
        //reload 風力偵測器
        if ($("#wdCheck").attr("src").indexOf("_click.png") > -1) {
            var wdArr = wdMap.values();
            for (var i=0;i < wdArr.length;i++){
                    var wdMarker = wdArr[i];
                    wdMarker.setMap(null);
            }
            wdMap.clear();
        } else {
            wdMap.clear();
        }
        loadWd();
    }
    catch(err) {
        $.log.debug(err);
    }
    
    /*
    try {
        //reload 道路封阻
        var blockingArr = blockingMap.values();
        for (var i=0;i < blockingArr.length;i++){
                var blockingMarker = blockingArr[i];
                blockingMarker.setMap(null);
        }
        blockingMap.clear();
        loadBlocking();
        showBlocking();
    }
    catch(err) {
        $.log.debug(err);
    }
    */

    try{
        //reload Moe
        if ($("#moeCheck").attr("src").indexOf("_click.png") > -1) {
            clearMoe();
            loadMoe();
        }
        if ($("#hwMoeCheck").attr("src").indexOf("_click.png") > -1) {
            clearHwMoe();
            loadHwMoe();   
        }
    }
    catch(err){
        $.log.debug(err);
    }
    
    try{
        //reload 路況事件
        if ($("#eventCheck").attr("src").indexOf("_click.png") > -1) {
            var eventArr = eventMap.values();
            for (var i=0;i < eventArr.length;i++){
                    var eventMarker = eventArr[i];
                    eventMarker.setMap(null);
            }
            eventMap.clear();
        } else {
            eventMap.clear();
        }
        loadEvent();
    }
    catch(err){
        $.log.debug(err);
    }
    
    try{
        //reload 災情資訊
        if ($("#disasterCheck").attr("src").indexOf("_click.png") > -1) {
            clearDisasters();
            loadDisasters();
        }
        
    }
    catch(err){
        $.log.debug(err);
    }
    
    //loadEvent
    
	$("#dataUpdateSpan").html((new Date()).toLocaleString());
	setTimeout(function(){updateData();},300000);
}

function getVdRealtimeData() {
	//抓取各期與各區的車流資訊,皆以VD編號為key
	$.ajax({
		url:"vd.do",
		data:{"action":"getVdRealtimeData","vdSrc":vdSrc},
		type:"post",
		dataType:"json",
		cache:false,
		error:function(err,status){
			//alert("error when getVdRealtimeData:"+err);
		},success:function(res) {
			$.each(res,function(index,item) {			
					vdRealtimeDataMap.put(item.vdId,item);
			}); 
			getDeviceInfo();
		}
	});
}

function urlExists(url, callback){
  $.ajax({
    type: 'HEAD',
    url: url,
    success: function(){
      callback(true);
    },
    error: function() {
      callback(false);
    }
  });
}
function changeCctvMode(obj){
    var jqBtn = $(obj);
    
    if(isCctvPause){
        isCctvPause = false;
        $("#cctvIframe").attr("src", jqBtn.attr("data-url") + "?t=" + new Date().getTime());
        jqBtn.val("靜態影像");
    }
    else{
        isCctvPause = true;
        jqBtn.attr("src", lastCctvUrl);
        clearTimeout(cctvTimer);
        jqBtn.val("繼續撥放");
    }
}

function getDeviceInfo() {
	$.ajax({
		url:"device.do",
		data:{"action":"getDeviceInfo"},
		type:"post",
		dataType:"json",
		error:function(err,status) {
			//alert("in getDeviceInfo error:"+err);
		},success:function(res) {
			$.each(res,function(index,item) {
				var iconType;
				//判斷設備圖示
				if (item.type == "CCTV") {
					 var vdId = item.sharedDeviceId;
					 var vdItem = vdRealtimeDataMap.get(vdId);
					 if (vdId && vdId !== "") {
						iconType = "cctv_vd.png"
					 }else {
						var positionId = item.positionId;
						var rainfallItem = rainfallMap.get(positionId);
						if (rainfallItem != null && rainfallItem.warn.indexOf("未達警戒") == -1) {
							iconType = "cctvFlash.gif";
						} else {
							iconType="cctv.png";
						} 
					 }
				} else {
					iconType = "vd.png";
				}
				
				//產生設備圖示及標題名稱
			  	var title =  item.mixedDescription;
				var marker = new google.maps.Marker({
				      position: new google.maps.LatLng(item.wgsy,item.wgsx),
				      map: map,
				      icon: "images/"+iconType,
				      title:title
				  });
				 marker.setMap(null);
				 marker.deviceId = item.deviceId;
				 marker.alias = item.alias;
				 marker.type = item.type;
				 marker.description = item.description;
				 marker.wgsx = item.wgsx;
				 marker.wgsy = item.wgsy;
				 marker.display = item.display;
				 marker.dir = item.dir;
				 marker.alternative = item.alternative;
				 marker.location = item.location;
				 marker.project = item.project;
				 marker.mixedDescription = item.mixedDescription;
				 marker.positionId = item.positionId;
				 if(item.sharedDeviceId){
				     marker.sharedDeviceId = item.sharedDeviceId;
				 }
				 if (item.type == 'CCTV') {
					 marker.pcUrl = item.pcUrl;
					 marker.mobileUrl = item.mobileUrl;
				 }
				  
				  //一個位置可能包含CCTV,VD兩種設備,但也可能只包含其中一種. 後端的做法是一個地點的代表順序為: CCTV > VD
				 //所以一個設備點下去時須先判斷為哪種設備；若為CCTV，則要判斷是否還有VD; 若為VD則就只有VD了。 
				   
				  google.maps.event.addListener(marker, 'click', function() {
						 closeInfoWindow();   //關閉之前已打開的
						 clearTimeout(cctvTimer);
						 
						 //加上時雨量資訊
						 var positionId = marker.positionId;
						  var rainfallItem = rainfallMap.get(positionId);
						  var contentString = ""; 
						  if (rainfallItem != null) {
						      contentString = "<font color=blue>週圍10分鐘雨量:" + rainfallItem.rain + "</font>";
                              //contentString = (rainfallItem.warn.indexOf("未達") > -1)?"<font color=blue>週圍時雨量:"+rainfallItem.rain+"</font>":"<font color=blue>週圍時雨量:"+rainfallItem.rain+" "+rainfallItem.warn+"</font>";
						  }
						  
						  //若文字長度>33,則將里程數移至下一行顯示
						  //以免造成標題列太長,把整個資訊視窗撐大
						  if (marker.mixedDescription.length <=33) {      
							  contentString += "<center><b>"+marker.mixedDescription+"</b></center>";
						  } else {
						      try{
						          var parts = marker.mixedDescription.split("(");
						          contentString += "<center><b>"+parts[0]+"<br />("+parts[1]+"</b></center>";
						      }
						      catch (err){
						          contentString += "<center><b>"+marker.mixedDescription+"</b></center>";
						      };
						  }
						 
						 var updateTime ="無資料";
						 var vdTable = "";
						 var vdTableWidth = 380;								 //預設的VD表格寬度
						 
						 if (marker.type == "CCTV") {                                 //此位置以CCTV為代表,所以依序尋找CCTV、VD的資訊
							 //有url才要繼續作判斷
							 //clearInterval(mobileUrlInterval);
							 if (marker.pcUrl.indexOf("http") > - 1) {
								//有"+"表示從IDC機房出來之影像 
								if (marker.pcUrl.indexOf("+") > - 1) {
								    contentString += "<img id='cctvIframe' src='"+marker.mobileUrl+"' width='320px' height='240px' onload='refreshMJpeg(this, \""+marker.mobileUrl+"\")' />";
								    /*
								    if($.browser.msie || $.browser.mozilla || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
                                        contentString += "<img id='cctvIframe' src='"+marker.mobileUrl+"' width='320px' height='240px' onload='refreshMJpeg(this, \""+marker.mobileUrl+"\")' />";
                                    }
                                    else {
                                        contentString += "<img id='cctvIframe' src='"+marker.mobileUrl+"' width='320px' height='240px' onload='refreshMJpeg(this, \""+marker.mobileUrl+"\")' />";
                                        var time = new Date().getTime();
                                        var cctvMJpeg = $("<img id='cctvIframe"+ time +"' width='320px' height='240px' />")
                                        .attr("src", marker.pcUrl)
                                        .load(function() {
                                            $("#tempArea").append(cctvMJpeg);
                                            setTimeout(function() {
                                                $("#cctvIframe").after(cctvMJpeg).remove();
                                            }, 3000);
                                        });
                                    }
                                    */
                                   contentString += "<input type='button' value='靜態影像' class='.ui-button' id='btnCctvPause' data-url='"+marker.mobileUrl+"' onclick='changeCctvMode(this);' />"
                                    vdTableWidth = 320;
									
								} else {
								    //一期前影像
								    contentString += "<iframe id='cctvIframe' src="+marker.pcUrl+" width='380px' height='310px' style='overflow:hidden' ></iframe>";
								}
							 } else {
								 		//無url便顯示影像系統維護中
								 		contentString += "<div id='iwDiv'><center>影像系統維護中</center></div>";
							 }
							 //加入VD資訊
							 var vdId = marker.sharedDeviceId;
							 var vdItem = vdRealtimeDataMap.get(vdId);
							 if (vdItem != null) {
								 updateTime = vdItem.updateTime;
								 vdTable = "<table id='vdTable' width='"+vdTableWidth+"px' >";
								 vdTable += "<thead><tr align=center><td>方向</td><td>五分鐘車流量(輛)</td><td>平均時速(km/hr)</td><td>佔量(%)</td><td>車況</td></tr></thead>";
								 vdTable += "<tbody><tr align=center>";
								 vdTable += "<td>"+vdItem.dir1Name+"</td><td>"+vdItem.dir1TotalVol+"</td><td>"+vdItem.dir1AvgSpd+"</td><td>"+vdItem.dir1AvgOcc+"</td><td>"+vdItem.dir1MoeLevel+"</td>";
								 vdTable += "</tr>";
								 if (vdItem.dir2Name != undefined) {
									 vdTable += "<tr align=center bgcolor=#E2E4FF>";
									 vdTable += "<td>"+vdItem.dir2Name+"</td><td>"+vdItem.dir2TotalVol+"</td><td>"+vdItem.dir2AvgSpd+"</td><td>"+vdItem.dir2AvgOcc+"</td><td>"+vdItem.dir2MoeLevel+"</td>";
									 vdTable += "</tr>";
								 }
								 vdTable += "<tr><td colspan='5' algin='left' style='padding-top:8px;'>更新時間: " + vdItem.updateTime + "</td></tr>";
								 vdTable += "</tbody></table>";
							 }
							 else if(vdId && vdId !== ""){
							     contentString += "<br><center>VD 查無資料...</center>";
							 } 
						 }
						 if (marker.type == "VD") {                                 //此位置以VD為代表,表示沒有CCTV,所以尋找VD資訊即可
							 var vdItem = vdRealtimeDataMap.get(marker.deviceId);
							 if (vdItem != null) {
								 updateTime = vdItem.updateTime;
								 vdTable = "<table id='vdTable' width='380px'  >";
								 vdTable += "<thead><tr align=center><td>方向</td><td>五分鐘車流量(輛)</td><td>平均時速(km/hr)</td><td>佔量(%)</td><td>車況</td></tr></thead>";
								 vdTable += "<tbody><tr align=center>";
								 vdTable += "<td>"+vdItem.dir1Name+"</td><td>"+vdItem.dir1TotalVol+"</td><td>"+vdItem.dir1AvgSpd+"</td><td>"+vdItem.dir1AvgOcc+"</td><td>"+vdItem.dir1MoeLevel+"</td>";
								 vdTable += "</tr>";
								 if (vdItem.dir2Name != undefined) {
									 vdTable += "<tr align=center bgcolor=#E2E4FF>";
									 vdTable += "<td>"+vdItem.dir2Name+"</td><td>"+vdItem.dir2TotalVol+"</td><td>"+vdItem.dir2AvgSpd+"</td><td>"+vdItem.dir2AvgOcc+"</td><td>"+vdItem.dir2MoeLevel+"</td>";
									 vdTable += "</tr>";		 
								 }
								 vdTable += "<tr><td colspan='5' algin='left' style='padding-top:8px;'>更新時間: " + vdItem.updateTime + "</td></tr>";
								 vdTable += "</tbody></table>";
							 }
							 else{
                                 contentString += "<br><center>查無資料...</center>";
                             } 
						 }
						 	if (updateTime != '無資料') { 
						 		contentString += vdTable;
						 	}
						 	
							 infoWindow = new google.maps.InfoWindow({
								 content:contentString
							 });
							 infoWindow.open(map,marker);
							 
							 google.maps.event.addListener(infoWindow, 'closeclick', function(){
							     $("#cctvIframe,#hwCctvIframe").remove();
							     /*
							     if(/Chrome|Safari/i.test(navigator.userAgent)){
							         window.stop();
							     }
							     */
							     var latlng = new google.maps.LatLng(marker.wgsy,marker.wgsx);
							     map.panTo(latlng);
							 });
							 clearTimeout(timer);
							 timer = setTimeout("closeInfoWindow();",65000);
					  }); 
				  	  deviceMap.put(item.deviceId,marker);
			});
			genLocatorSource();
			
			if ($("#deviceCheck").attr("src").indexOf("_click.png") > -1) {
				if (map.getZoom()>=11) {
					var deviceArr = deviceMap.values();
					for (var i=0;i < deviceArr.length;i++) {
						var deviceMarker = deviceArr[i];
						deviceMarker.setMap(map);
					}
				}
		   }
			
		}
	});
}

function refreshMJpeg(obj, url){
    if($("#cctvIframe").length > 0 && isCctvPause === false){
        cctvTimer = setTimeout(function(){
            lastCctvUrl = obj.src;
            obj.src = url + "?t=" + new Date().getTime();
        },100);
    }
}


function checkDevice() {
	if ($("#deviceCheck").attr("src").indexOf("_click.png") == -1) {
		if (map.getZoom()>=11) {
			var deviceArr = deviceMap.values();
			for (var i=0;i < deviceArr.length;i++) {
				var deviceMarker = deviceArr[i];
				deviceMarker.setMap(map);
			}
		}else {
			var deviceArr2 = markerMap2.values();
			for (var i=0;i < deviceArr2.length;i++){
				var deviceMarker2 = deviceArr2[i];
				deviceMarker2.setMap(map);
			}
		}
   } else {
	  if (map.getZoom()>=11) {
		var deviceArr = deviceMap.values();
		for (var i=0;i < deviceArr.length;i++){
			var deviceMarker = deviceArr[i];
			deviceMarker.setMap(null);
		}
	  }else {
		var deviceArr2 = markerMap2.values();
		for (var i=0;i < deviceArr2.length;i++){
			var deviceMarker2 = deviceArr2[i];
			deviceMarker2.setMap(null);
		}  
	  }	
   }
}

function gotoLink(url){
	window.open(url);
}

function getVisitorNums() {
	$.ajax({
		url:"navigate.do",
		data:{"action":"getVisitorNums"},
		type:"post",
		dataType:"html",
		error:function(err,status){
			//alert("error in getVisitorNums");
		},success:function(res) {
			var visitorArr = res.split("@");
			var onlineVisitors = visitorArr[0];
			var totalVisitors = visitorArr[1];
			var onlineHtml="";
			var totalHtml="";
			for (var i=0;i < onlineVisitors.length;i++ ){
				var iChar = onlineVisitors.charAt(i);
				var imgUrl = "<img src='images/number/"+iChar+".gif' />";
				onlineHtml +=imgUrl;
			}
			for (var i=0;i < totalVisitors.length;i++ ){
				var iChar = totalVisitors.charAt(i);
				var imgUrl = "<img src='images/number/"+iChar+".gif' />";
				totalHtml += imgUrl;
			}
			$("#onlineVisitors").html(onlineHtml);
			$("#totalVisitors").html(totalHtml);
		}
	});
}

function loadHighwayCCTV() {
	$.ajax({
		url:"cctv.do",
		data:{"action":"getHighwayCCTV"},
		type:"post",
		dataType:"json",
		error:function(err,status){
			//alert("in loadHighwayCCTV:"+status);
		},
		success:function(res) {
			$.each(res,function(index,item){
				var roadType = item.roadId.charAt(0);
				var roadTypeName = (roadType == 'N')?"國道":"省道(快速道路)";
				var highwayNO = item.roadId.substring(1,item.roadId.length-1);
				var directionChar = item.roadId.charAt(item.roadId.length-1);
				var direction;
				switch (directionChar){
					case 'N':
							direction = "往北";break;
					case 'E':
							direction = "往東";break;
					case 'S':
							direction = "往南";break;
					case 'W':
							direction = "往西";break;
				}
				
				var titleStr = roadTypeName+highwayNO+"號"+direction+" "+item.cameraMileage+"公里";
				
				var hwMarker = new google.maps.Marker({
				      position: new google.maps.LatLng(item.lat,item.lng),
				      map: map,
				      icon: "images/cctvBlack.png",
				      title:titleStr
				 });
				hwMarker.setMap(null);
				 hwMarker.roadId = item.roadId;
				 hwMarker.cameraId = item.cameraId;
				 hwMarker.cameraMileage = item.cameraMileage;
				 hwMarker.lat = item.lat;
				 hwMarker.lng = item.lng;
				 hwMarker.url = item.url;
				 
				 
				 google.maps.event.addListener(hwMarker, 'click', function(){
					 closeInfoWindow();   //關閉之前已打開的
					 var contentStr = "<center><b><font size='3'>"+titleStr+"</font></b></center><div id='iwDiv'><iframe id='hwCctvIframe' src='hwCCTVImage.html?cctvUrl="+hwMarker.url+"' width='380px' height='320px'></iframe><center>基於資源分配公平原則，本視窗將於60秒後自動關閉</center></div>";
					 					 
					 infoWindow = new google.maps.InfoWindow({
						    maxWidth:"600px",
						  	content:contentStr
					 });
					 infoWindow.open(map,hwMarker);
					 clearTimeout(timer);
					timer = setTimeout("closeInfoWindow();",65000);
					 
				 });
				 highwayCctvMap.put(item.cameraId,hwMarker);
			});		
		}
	});
}

function loadEvent() {
	$.ajax({
		url:"event.do",
		data:{"action":"getEvent"},
		type:"post",
		dataType:"json",
		error:function(err,status){
			//alert("error when loadEvent(), status"+status);
		},
		success:function(res){
			$.each(res,function(index,item){
				var eventIcon;
				switch (item.type) {
				case 1:
					eventIcon = "attention.gif";
					break;
				case 3:
					eventIcon = "construction.gif";
					break;
				case 4:
					eventIcon = "detour.gif";
					break;
				case 5:
					eventIcon = "jam.gif";
					break;
				case 6:
					eventIcon = "tcBreakdown.gif";
					break;
				}
				
				var eventMarker = new google.maps.Marker({
				      position: new google.maps.LatLng(item.wgsy,item.wgsx),
				      map: map,
				      draggable:false,
				      icon: "images/event/"+eventIcon,
				      title:item.title
				});
				eventMarker.setMap(null);
				eventMarker.uuid = item.eventUUID ;				
				eventMarker.title = item.title;
				eventMarker.content = item.content;
				eventMarker.region = item.region;
				eventMarker.type = item.type;
				eventMarker.wgsx = item.wgsx;
				eventMarker.wgsy = item.wgsy;
				
				google.maps.event.addListener(eventMarker, 'click', function(){
					 closeInfoWindow();   //關閉之前已打開的
					 var contentString = "<div style=\"width:320px;height:120px\"><center><b>"+eventMarker.title+"</b></center>"+eventMarker.content+"</div>";
					 infoWindow = new google.maps.InfoWindow({
					     maxWidth:"500px",
					  	 content:contentString
					 });
					 infoWindow.open(map,eventMarker);
				  });
				  eventMap.put(eventMarker.uuid,eventMarker);
			});
			
			if ($("#eventCheck").attr("src").indexOf("_click.png") > -1) {
                var eventArr = eventMap.values();
                for (var index in eventArr) {
                    var eventMarker = eventArr[index];
                    eventMarker.setMap(map);
                }
            }
		}
	});
}

function loadBlocking() {
    iisi.ajax({
        ajaxCaller:"loadBlocking",
        url:"blocking.do",
        data:{"action":"getBlocking"},
        success:function(res) {
            try{
                $.each(res,function(index,item){
                    var markers = new Array();
                    for(var i = 0; i < 2; i++) {
                        var eventMarker = new google.maps.Marker({
                            position : new google.maps.LatLng(item.wgsy1, item.wgsx1),
                            map : map,
                            draggable : false,
                            icon : "images/event/block.png",
                            title : item.title
                        });
                        eventMarker.setMap(null);
                        eventMarker.uuid = item.blockingUUID;
                        eventMarker.title = item.title;
                        eventMarker.content = item.content;
                        eventMarker.region = item.region;
                        eventMarker.type = item.type;
                        eventMarker.wgsx1 = item.wgsx1;
                        eventMarker.wgsy1 = item.wgsy1;
                        eventMarker.wgsx2 = item.wgsx2;
                        eventMarker.wgsy2 = item.wgsy2;
                        if(i == 1){
                            eventMarker.uuid = eventMarker.uuid + "_2";
                            eventMarker.setPosition(new google.maps.LatLng(item.wgsy2,item.wgsx2));
                        }
                        markers.push(eventMarker);
                    }
    
                    for(var i=0;i<2;i++){
                        google.maps.event.addListener(markers[i], 'click', function() {
                            closeInfoWindow();   //關閉之前已打開的
                            infoWindow = new google.maps.InfoWindow({
                                maxWidth:"500px",
                                content:"<center><b>"+markers[0].title+"</b></center>"+markers[0].content
                            });
                            infoWindow2 = new google.maps.InfoWindow({
                                maxWidth:"50px",
                                content:"<center><b>"+markers[1].title+"</b></center>"+markers[1].content
                            });
                            infoWindow.open(map,markers[0]);
                            infoWindow2.open(map,markers[1]);
                        });
                        blockingMap.put(markers[i].uuid,markers[i]);
                    }
    
                });
            }
            catch(err){
            //    alert(err);
            }
        }
    });
}

function loadRainfall () {
    iisi.ajax({
        ajaxCaller : "loadRainfall",
        url : "rainfall.do",
        data : {"rainfallXmlSrc" : rainfallXmlSrc},
        cache : false,
        success : function(res) {
            $.each(res, function(index, item) {
                rainfallMap.put(item.positionId, item)
            });
        }
    });
}


function loadCMS() {
	iisi.ajax({
	    ajaxCaller:"loadCMS",
		url:"cms.do",
		data:{"action":"getCMS","cmsInfoSrc":cmsInfoSrc},
		dataType:"html",
		cache:false,
		success:function(res) {
			var cmsArr = res.split("@@");
			$.each(cmsArr,function(index,cmsRow){
				var cms = cmsRow.split("@");
				var cmsIcon = "images/cms.png";      						//default cms icon	
				if (cms[9] != "無資料" && cms[10] == '1' ) {					//如果cms有資料且需要閃爍的話;則要更換成閃爍的icon
					var rightNow = new Date();
					var currentHours = rightNow.getHours().toString();
					if (currentHours.length == 1) currentHours = "0"+currentHours;
					var currentMinutes = rightNow.getMinutes().toString();
					if (currentMinutes.length == 1) currentMinutes = "0"+currentMinutes;
					var currentHM = currentHours + currentMinutes;
					if (currentHM <= cms[11]) cmsIcon = "images/cmsFlash.gif";	
				}
				
				if (cms[5] != undefined && cms[6] != undefined && cms[5] != "無資料" && cms[6] != '0' ) {
					var cmsMarker = new google.maps.Marker({
						  position: new google.maps.LatLng(cms[6],cms[5]),
						  map: map,
						  icon: cmsIcon,
						  title:cms[4]+"("+cms[3]+")"
					 });
					 
					cmsMarker.setMap(null);
					
					 cmsMarker.cmsId = cms[0];
					 cmsMarker.direction = cms[1];
					 cmsMarker.alternative = cms[2];
					 cmsMarker.description = cms[3];
					 cmsMarker.alias = cms[4];
					 cmsMarker.wgsx = cms[5];
					 cmsMarker.wgsy = cms[6];
					 cmsMarker.location = cms[7];
					 cmsMarker.project = cms[8];
					 cmsMarker.content = cms[9];
					 cmsMarker.mixedDescription = cms[12];
					 
					 google.maps.event.addListener(cmsMarker, "click", function() {
						var contentString = "<center><b>"+cmsMarker.mixedDescription+" " + cmsMarker.direction +"</b></center><br /><marquee scrolldelay=150>"+cmsMarker.content+"</marquee>";
						closeInfoWindow();   //關閉之前已打開的
						 infoWindow = new google.maps.InfoWindow({
							 maxWidth:"300px",
							 content:contentString
						 });
						 infoWindow.open(map,cmsMarker);
					 });
					 cmsMap.put(cms[0],cmsMarker);
				 }
			});
			
			
            if ($("#cmsCheck").attr("src").indexOf("_click.png") > -1) {
                var cmsArr = cmsMap.values();
                for (var index in cmsArr) {
                    var cmsMarker = cmsArr[index];
                    cmsMarker.setMap(map);
                }
            }

		
		}
	});
}

function loadRd() {
    return false;
    iisi.ajax({
        ajaxCaller : "loadRd",
        url : "rd.do",
        data : {"action":"getRd", "rdInfoSrc":rdInfoSrc},
        cache : false,
        success : function(res) {
            if (res.isSuccess === "TRUE") {
                $.each(res.rdInfos, function(index, item) {
                    var rdIcon = "images/rd.png";
                    if(item.flash){
                        rdIcon = "images/rd_flash.png";
                    }
                    if(item.status === "故障"){
                        rdIcon = "images/rd_error.png";
                    }
                    if(item.status === "斷線"){
                        rdIcon = "images/rd_disconnect.png";
                    }

                    var rdMarker = new google.maps.Marker({
                        position : new google.maps.LatLng(item.wgsy, item.wgsx),
                        map : map,
                        icon : new google.maps.MarkerImage(rdIcon,null,null,null, new google.maps.Size(26,26)),
                        title : item.mixedDescription
                    });

                    rdMarker.setMap(null);

                    rdMarker.deviceId = item.deviceId;
                    rdMarker.status = item.status;
                    rdMarker.wgsx = item.wgsx;
                    rdMarker.wgsy = item.wgsy;
                    rdMarker.mixedDescription = item.mixedDescription;
                    rdMarker.curPluviometric =  item.curPluviometric;
                    rdMarker.accPluviometric =  item.accPluviometric;
                    rdMarker.degree =  item.degree;
                    rdMarker.time =  item.time;
                    rdMarker.flash =  item.flash;

                    google.maps.event.addListener(rdMarker, "click", function() {
                        //關閉之前已打開的
                        closeInfoWindow();
                        
                        var contentString;
                        if(rdMarker.status === "故障"){
                            contentString = "設備故障...";
                        }
                        else if(rdMarker.status === "斷線"){
                            contentString = "設備斷線...";
                        }
                        else{
                            contentString = "<center><b>" + rdMarker.mixedDescription + "</b></center>" + 
                            "時段降雨量: " + rdMarker.curPluviometric + " (公厘)<br>" + 
                            "累積降雨量: " + rdMarker.accPluviometric + " (公厘)<br>" + 
                            "豪雨程度: " + rdMarker.degree + "級<br>" + 
                            "資料更新時間: " + rdMarker.time;
                        }

                        infoWindow = new google.maps.InfoWindow({
                            maxWidth : "300px",
                            content : contentString
                        });
                        infoWindow.open(map, rdMarker);
                    });
                    rdMap.put(rdMarker.deviceId, rdMarker);
                });

                if ($("#rdCheck").attr("src").indexOf("_click.png") > -1) {
                    var index;
                    var rdArr = rdMap.values();
                    for (index in rdArr) {
                        var rdMarker = rdArr[index];
                        rdMarker.setMap(map);
                    }
                }
                
            }
        }
    });
}

function loadVi() {
    return false;
    iisi.ajax({
        ajaxCaller : "loadVi",
        url : "vi.do",
        data : {"action":"getVi", "viInfoSrc":viInfoSrc},
        cache : false,
        success : function(res) {
            if (res.isSuccess === "TRUE") {
                $.each(res.viInfos, function(index, item) {
                    var viIcon = "images/vi.png";
                    if(item.flash){
                        viIcon = "images/vi_flash.png";
                    }
                    if(item.status === "故障"){
                        viIcon = "images/vi_error.png";
                    }
                    if(item.status === "斷線"){
                        viIcon = "images/vi_disconnect.png";
                    }
                    
                    var viMarker = new google.maps.Marker({
                        position : new google.maps.LatLng(item.wgsy, item.wgsx),
                        map : map,
                        icon : new google.maps.MarkerImage(viIcon,null,null,null, new google.maps.Size(26,26)),
                        title : item.mixedDescription
                    });

                    viMarker.setMap(null);

                    viMarker.deviceId = item.deviceId;
                    viMarker.status = item.status;
                    viMarker.wgsx = item.wgsx;
                    viMarker.wgsy = item.wgsy;
                    viMarker.mixedDescription = item.mixedDescription;
                    viMarker.visibleDistance =  item.visibleDistance;
                    viMarker.degree =  item.degree;
                    viMarker.time =  item.time;
                    viMarker.flash =  item.flash;

                    google.maps.event.addListener(viMarker, "click", function() {
                        //關閉之前已打開的
                        closeInfoWindow();
                        
                        var contentString = "<center><b>" + viMarker.mixedDescription + "</b></center>" + 
                        "能見度距離:" + viMarker.visibleDistance + "(公尺)<br>" +
                        "濃霧程度:" + viMarker.degree + "級<br>" +
                        "資料更新時間:" + viMarker.time;
                        infoWindow = new google.maps.InfoWindow({
                            maxWidth : "300px",
                            content : contentString
                        });
                        infoWindow.open(map, viMarker);
                    });
                    viMap.put(viMarker.deviceId, viMarker);
                });

                if ($("#viCheck").attr("src").indexOf("_click.png") > -1) {
                    var index;
                    var viArr = viMap.values();
                    for (index in viArr) {
                        var viMarker = viArr[index];
                        viMarker.setMap(map);
                    }
                }
                
            }
        }
    });
}

function loadWd() {
    return false;
    iisi.ajax({
        ajaxCaller : "loadWd",
        url : "wd.do",
        data : {"action":"getWd", "wdInfoSrc":wdInfoSrc},
        cache : false,
        success : function(res) {
            if (res.isSuccess === "TRUE") {
                $.each(res.wdInfos, function(index, item) {
                    var wdIcon = "images/wd.png";
                    if(item.flash){
                        wdIcon = "images/wd_flash.png";
                    }
                    if(item.status === "故障"){
                        wdIcon = "images/wd_error.png";
                    }
                    if(item.status === "斷線"){
                        wdIcon = "images/wd_disconnect.png";
                    }
                    
                    var wdMarker = new google.maps.Marker({
                        position : new google.maps.LatLng(item.wgsy, item.wgsx),
                        map : map,
                        icon : new google.maps.MarkerImage(wdIcon,null,null,null, new google.maps.Size(26,26)),
                        title : item.mixedDescription
                    });

                    wdMarker.setMap(null);

                    wdMarker.deviceId = item.deviceId;
                    wdMarker.status = item.status;
                    wdMarker.wgsx = item.wgsx;
                    wdMarker.wgsy = item.wgsy;
                    wdMarker.mixedDescription = item.mixedDescription;
                    wdMarker.avgWindSpeed =  item.avgWindSpeed;
                    wdMarker.avgWindDir =  item.avgWindDir;
                    wdMarker.maxWindSpeed =  item.maxWindSpeed;
                    wdMarker.maxWindDir =  item.maxWindDir;
                    wdMarker.degree =  item.degree;
                    wdMarker.time =  item.time;
                    wdMarker.flash =  item.flash;

                    google.maps.event.addListener(wdMarker, "click", function() {
                        //關閉之前已打開的
                        closeInfoWindow();
                        
                        var contentString = "<center><b>" + wdMarker.mixedDescription + "</b></center>" + 
                        "平均風速:" + wdMarker.avgWindSpeed + "(公尺/秒)<br>" +
                        "最大瞬間風速:" + wdMarker.maxWindSpeed + "(公尺/秒)<br>" +
                        "強風程度:" + wdMarker.degree + "級<br>" +
                        "資料更新時間:" + wdMarker.time;
                        infoWindow = new google.maps.InfoWindow({
                            maxWidth : "300px",
                            content : contentString
                        });
                        infoWindow.open(map, wdMarker);
                    });
                    wdMap.put(wdMarker.deviceId, wdMarker);
                });

                if ($("#wdCheck").attr("src").indexOf("_click.png") > -1) {
                    var index;
                    var wdArr = wdMap.values();
                    for (index in wdArr) {
                        var wdMarker = wdArr[index];
                        wdMarker.setMap(map);
                    }
                }
                
            }
        }
    });
}

function updateProHwyRd (){
	try{
		var now = new Date();
		var miniute = now.getMinutes();
		miniute = miniute % 10;
		if(miniute == 5 || miniute == 0) 
		{
			if ($("#proHwyRdCheck").attr("src").indexOf("_click.png") > -1) {
		        var proHwyRdArr = proHwyRdMap.values();
		        for (var i=0;i < proHwyRdArr.length;i++){
		                var proHwyRdMarker = proHwyRdArr[i];
		                proHwyRdMarker.setMap(null);
		        }
		        proHwyRdMap.clear();
		    } else {
		    	proHwyRdMap.clear();
		    }
			loadProHwyRd();
		}

	}
	catch (err){}
	setTimeout("updateProHwyRd();",60000);
	
}
function queryTime(){
	var today = new Date();
	var timezone = today.getTimezoneOffset();
	var year = today.getFullYear();
	var month= today.getMonth();
	var day  = today.getDay();
	var hour = today.getHours();
	var miniute = today.getMinutes();
	return(year+"/"+month+"/"+day+" "+hour+":"+miniute);
}
function loadProHwyRd(){
//	var time = queryTime();
//	console.log(time2);
	var time = "2013/03/21 03:12";
//    var proHwyRdInfoSrc =  proHwyRdUrlPrefix + " "+ proHwyRdUrlSuffix;
    var  roads ="P070 P080 P090 P180";
    var user = "iisiuser";
    var password = "ftpiisi";
	iisi.ajax({
		ajaxCaller : "loadProHwyRd",
		url : "proHwyRd.do",
		data : {"action":"getProHwyRd", "proHwyRdUrlPrefix":proHwyRdUrlPrefix,"proHwyRdUrlSuffix":proHwyRdUrlSuffix,"time":time,"roads":roads,"ftp":proHwyRdFtpUrl,"user":user,"password":password},
	    success : function(res) {
	    	 if (res.isSuccess === "TRUE") {	 
                 $.each(res.proHwyRdInfos, function(index, item) {
                	 var proHwyRdIcon = "images/proHwyRain.png";
                	
                	 var proHwyRdMarker = new google.maps.Marker({
                         position : new google.maps.LatLng(item.wgsy, item.wgsx),
                         map : map,
                         icon : new google.maps.MarkerImage(proHwyRdIcon,null,null,null, new google.maps.Size(26,26)),
                         title : item.deviceId
                     });

                	 proHwyRdMarker.setMap(null);
                 	 proHwyRdMarker.deviceId = item.deviceId;
                	 proHwyRdMarker.wgsx = item.wgsx;
                	 proHwyRdMarker.wgsy = item.wgsy;
                	 proHwyRdMarker.time =  item.time;
                	 proHwyRdMarker.rain =  item.rain;

                     google.maps.event.addListener(proHwyRdMarker, "click", function() {
                        //關閉之前已打開的
                    	 closeInfoWindow();
                        
                    	 var contentString = "<center><b>" + proHwyRdMarker.deviceId + "</b></center>" + 
                    	 "雨量:" + proHwyRdMarker.rain + "(mm)<br>" +
                    	 "資料更新時間:" + proHwyRdMarker.time;
                    	 infoWindow = new google.maps.InfoWindow({
                    		 maxWidth : "300px",
                    		 content : contentString
                    	 });
                    	 infoWindow.open(map, proHwyRdMarker);
                    });
                    proHwyRdMap.put(proHwyRdMarker.deviceId, proHwyRdMarker);
                });
                if ($("#proHwyRdCheck").attr("src").indexOf("_click.png") > -1) {
                    var index;
                    var proHwyRdArr = proHwyRdMap.values();
                    for (index in proHwyRdArr) {
                        var proHwyRdMarker = proHwyRdArr[index];
                        proHwyRdMarker.setMap(map);
                    }
                }       
	    	 }
	    }
	});
}
/*
function checkDisaster() {
	var disasterArr = disasterMap.values();
	var earlyWarningArr = earlyWarningMap.values();
	if ($("#disasterCheck").attr("src").indexOf("_click.png") == -1) {
		for (var i=0;i < disasterArr.length;i++){
			var disasterMarker = disasterArr[i];
			disasterMarker.setMap(map);
		}

        for (var index in earlyWarningArr) {
            var earlyWarningMarker = earlyWarningArr[index];
            earlyWarningMarker.setMap(map);
        }

                    
	} else {
		for (var i=0;i < disasterArr.length;i++){
			var disasterMarker = disasterArr[i];
			disasterMarker.setMap(null);
		}
		
		for (var index in earlyWarningArr) {
            var earlyWarningMarker = earlyWarningArr[index];
            earlyWarningMarker.setMap(null);
        }
	}
}
*/

function loadDisasters() {
    disasterLayer = new google.maps.KmlLayer(disasterXmlSrc + "&t=" + new Date().getTime(),{preserveViewport:true});
    earlyWarningLayer = new google.maps.KmlLayer(earlyWarningSrc + "&t=" + new Date().getTime(),{preserveViewport:true});
    disasterLayer.setMap(map);
    earlyWarningLayer.setMap(map);
}
function clearDisasters(){
    disasterLayer.setMap(null);
    earlyWarningLayer.setMap(null);
}
function checkDisaster(){
    if ($("#disasterCheck").attr("src").indexOf("_click.png") == -1) {
        loadDisasters();
    }else {
        clearDisasters();
    }
}

function checkCMS() {
	var cmsArr = cmsMap.values();
	if ($("#cmsCheck").attr("src").indexOf("_click.png") == -1) {
		for (var i=0;i < cmsArr.length;i++){
			var cmsMarker = cmsArr[i];
			cmsMarker.setMap(map);
		}
	} 
	else {
		for (var i=0;i < cmsArr.length;i++){
			var cmsMarker = cmsArr[i];
			cmsMarker.setMap(null);
		}
	}
}

function checkRd() {
    var rdArr = rdMap.values();
    if ($("#rdCheck").attr("src").indexOf("_click.png") == -1) {
        for (var i=0;i < rdArr.length;i++){
            var rdMarker = rdArr[i];
            rdMarker.setMap(map);
        }
    } 
    else {
        for (var i=0;i < rdArr.length;i++){
            var rdMarker = rdArr[i];
            rdMarker.setMap(null);
        }
    }
}

function checkVi() {
    var viArr = viMap.values();
    if ($("#viCheck").attr("src").indexOf("_click.png") == -1) {
        for (var i=0;i < viArr.length;i++){
            var viMarker = viArr[i];
            viMarker.setMap(map);
        }
    } 
    else {
        for (var i=0;i < viArr.length;i++){
            var viMarker = viArr[i];
            viMarker.setMap(null);
        }
    }
}

function checkWd() {
    var wdArr = wdMap.values();
    if ($("#wdCheck").attr("src").indexOf("_click.png") == -1) {
        for (var i=0;i < wdArr.length;i++){
            var wdMarker = wdArr[i];
            wdMarker.setMap(map);
        }
    } 
    else {
        for (var i=0;i < wdArr.length;i++){
            var wdMarker = wdArr[i];
            wdMarker.setMap(null);
        }
    }
}

function checkProHwyRd() {
    var proHwyRdArr = proHwyRdMap.values();
    if ($("#proHwyRdCheck").attr("src").indexOf("_click.png") == -1) {
        for (var i=0;i < proHwyRdArr.length;i++){
            var proHwyRdMarker = proHwyRdArr[i];
            proHwyRdMarker.setMap(map);
        }
        map.setZoom(11);
    } 
    else {
        for (var i=0;i < proHwyRdArr.length;i++){
            var proHwyRdMarker = proHwyRdArr[i];
            proHwyRdMarker.setMap(null);
        }
    }
    
}

function checkEvent() {
	var eventArr = eventMap.values();
	if ($("#eventCheck").attr("src").indexOf("_click.png") == -1) {
		for (var i=0;i < eventArr.length;i++){
			var eventMarker = eventArr[i];
			eventMarker.setMap(map);
		}
	} else {
		for (var i=0;i < eventArr.length;i++){
			var eventMarker = eventArr[i];
			eventMarker.setMap(null);
		}
	}
	
}

function showBlocking() {
    var blockingArr = blockingMap.values();
    for (var i=0;i < blockingArr.length;i++){
        var blockingMarker = blockingArr[i];
        blockingMarker.setMap(map);
    }
}

function checkHwCCTV() {
		if ($("#hwCctvCheck").attr("src").indexOf("_click.png") == -1){
			if (map.getZoom()>=11) {
				var hwCctvArr = highwayCctvMap.values();
				for (var i=0;i < hwCctvArr.length;i++){
					var hwCctvMarker = hwCctvArr[i];
					hwCctvMarker.setMap(map);
				}
			}else {
				var hwCctvArr2 = highwayCctvMap2.values();
				for (var i=0;i < hwCctvArr2.length;i++){
					var hwCctvMarker2 = hwCctvArr2[i];
					hwCctvMarker2.setMap(map);
				}
			}
	   }else {
		   if (map.getZoom()>=11) {
				var hwCctvArr = highwayCctvMap.values();
				for (var i=0;i < hwCctvArr.length;i++){
					var hwCctvMarker = hwCctvArr[i];
					hwCctvMarker.setMap(null);
				}
			}else {
				var hwCctvArr2 = highwayCctvMap2.values();
				for (var i=0;i < hwCctvArr2.length;i++){
					var hwCctvMarker2 = hwCctvArr2[i];
					hwCctvMarker2.setMap(null);
				}
			}
	   }
}
function loadMoe(){
    moeColorLayer = new google.maps.KmlLayer(moeColorKml + "?t=" + new Date().getTime(),{preserveViewport:true});
    moe2ColorLayer = new google.maps.KmlLayer(moe2ColorKml + "?t=" + new Date().getTime(),{preserveViewport:true});
    moe3ColorLayer = new google.maps.KmlLayer(moe3ColorKml + "?t=" + new Date().getTime(),{preserveViewport:true});
    moe4ColorLayer = new google.maps.KmlLayer(moe4ColorKml + "?t=" + new Date().getTime(),{preserveViewport:true});
    moe5ColorLayer = new google.maps.KmlLayer(moe5ColorKml + "?t=" + new Date().getTime(),{preserveViewport:true});
    //t1ALayer = new google.maps.KmlLayer(t1AKml,{preserveViewport:true});
    //t2ALayer = new google.maps.KmlLayer(t2AKml,{preserveViewport:true});
    //t3ALayer = new google.maps.KmlLayer(t3AKml,{preserveViewport:true});
    //t4ALayer = new google.maps.KmlLayer(t4AKml,{preserveViewport:true});
    //t5ALayer = new google.maps.KmlLayer(t5AKml,{preserveViewport:true});
    //t6ALayer = new google.maps.KmlLayer(t6AKml,{preserveViewport:true});
    //t7ALayer = new google.maps.KmlLayer(t7AKml,{preserveViewport:true});
    //t9ALayer = new google.maps.KmlLayer(t9AKml,{preserveViewport:true});
    //t10ALayer = new google.maps.KmlLayer(t10AKml,{preserveViewport:true});
    //t31ALayer = new google.maps.KmlLayer(t31AKml,{preserveViewport:true});
    //t61ALayer = new google.maps.KmlLayer(t61AKml,{preserveViewport:true});
    //t66ALayer = new google.maps.KmlLayer(t66AKml,{preserveViewport:true});
    //t76ALayer = new google.maps.KmlLayer(t76AKml,{preserveViewport:true});
    
    moeColorLayer.setMap(map);
    moe2ColorLayer.setMap(map);
    moe3ColorLayer.setMap(map);
    moe4ColorLayer.setMap(map);
    moe5ColorLayer.setMap(map);
    //t1ALayer.setMap(map);
    //t2ALayer.setMap(map);
    //t3ALayer.setMap(map);
    //t4ALayer.setMap(map);
    //t5ALayer.setMap(map);
    //t6ALayer.setMap(map);
    //t7ALayer.setMap(map);
    //t9ALayer.setMap(map);
    //t10ALayer.setMap(map);
    //t31ALayer.setMap(map);
    //t61ALayer.setMap(map);
    //t66ALayer.setMap(map);
    //t76ALayer.setMap(map);
}
function clearMoe(){
    moeColorLayer.setMap(null);
    moe2ColorLayer.setMap(null);
    moe3ColorLayer.setMap(null);
    moe4ColorLayer.setMap(null);
    moe5ColorLayer.setMap(null);
    //t1ALayer.setMap(null);
    //t2ALayer.setMap(null);
    //t3ALayer.setMap(null);
    //t4ALayer.setMap(null);
    //t5ALayer.setMap(null);
    //t6ALayer.setMap(null);
    //t7ALayer.setMap(null);
    //t9ALayer.setMap(null);
    //t10ALayer.setMap(null);
    //t31ALayer.setMap(null);
    //t61ALayer.setMap(null);
    //t66ALayer.setMap(null);
    //t76ALayer.setMap(null);
}
function checkMoe(){
	if ($("#moeCheck").attr("src").indexOf("_click.png") == -1) {
	    loadMoe();
		var moeHtml = "<div id='moeIllustriation' style='float:right;margin-top:30px;margin-left:0px;width:200px;height:28px;background-color:white;'>";
			moeHtml += "<table id='generalRoadTable'><tbody><tr>";
			moeHtml += "<td width=30px><b>省道</b></td>";
			moeHtml += "<td width=20px bgcolor=green></td><td align=left><font size='2'>順暢</font></td>";
			moeHtml += "<td width=20px bgcolor=orange></td><td align=left><font size='2'>車多</font></td>";
			moeHtml += "<td width=20px bgcolor=red></td><td align=left><font size='2'>壅塞</font></td>";
			moeHtml += "</tr>";
			moeHtml += "</tbody></table>";
		    moeHtml += "</div>";
		$("#mapCanvas").append(moeHtml);
	    $("#moeIllustriation").show().draggable({
	    	containment:'parent',
	    	zIndex:99
	    }); 
	}else {
		clearMoe();
		$("#moeIllustriation").hide();
	}
}

function loadHwMoe(){
    hwMoeLayer1 = new google.maps.KmlLayer(hwMoeKml1 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer2 = new google.maps.KmlLayer(hwMoeKml2 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer3 = new google.maps.KmlLayer(hwMoeKml3 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer4 = new google.maps.KmlLayer(hwMoeKml4 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer5 = new google.maps.KmlLayer(hwMoeKml5 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer6 = new google.maps.KmlLayer(hwMoeKml6 + "?t=" + new Date().getTime(),{preserveViewport:true});
    hwMoeLayer1.setMap(map);hwMoeLayer2.setMap(map);
    hwMoeLayer3.setMap(map);hwMoeLayer4.setMap(map);
    hwMoeLayer5.setMap(map);hwMoeLayer6.setMap(map);
}
function clearHwMoe(){
    hwMoeLayer1.setMap(null);hwMoeLayer2.setMap(null);
    hwMoeLayer3.setMap(null);hwMoeLayer4.setMap(null);
    hwMoeLayer5.setMap(null);hwMoeLayer6.setMap(null);
}
function checkHwMoe(){
	if ($("#hwMoeCheck").attr("src").indexOf("_click.png") == -1){
		loadHwMoe();
		
		var hwMoeHtml = "<div id='hwMoeIllustriation' style='float:right;margin-top:30px;margin-left:0px;width:520px;height:28px;background-color:white;'>";
		hwMoeHtml += "<table id='generalRoadTable'><tbody><tr>";
		hwMoeHtml += "<td width=30px><b>國道</b></td>";
		hwMoeHtml += "<td width=20px bgcolor=green></td><td align=left><font size='2'>80 公里/時 以上</font></td>";
		hwMoeHtml += "<td width=20px bgcolor=yellow></td><td align=left><font size='2'>60-79公里/時</font></td>";
		hwMoeHtml += "<td width=20px bgcolor=orange></td><td align=left><font size='2'>40-59公里/時</font></td>";
		hwMoeHtml += "<td width=20px bgcolor=red></td><td align=left><font size='2'>39公里/時 以下</font></td>";
		hwMoeHtml += "</tr>";
		hwMoeHtml += "</tbody></table>";
		hwMoeHtml += "</div>";
    	$("#mapCanvas").append(hwMoeHtml);
        $("#hwMoeIllustriation").show().draggable({
        	containment:'parent',
        	zIndex:99
        });
	}else {
		clearHwMoe();
		$("#hwMoeIllustriation").hide();
	}
}

// TODO
function showSceneryMoe(kml1, kml2){
    clearSceneryMoe();
    
    if(kml1){
        kml1 += kml1.indexOf("?") ? "&t=" + new Date().getTime() : "?t=" + new Date().getTime();
        moeSceneryLayer = new google.maps.KmlLayer(kml1, {preserveViewport:true});
        moeSceneryLayer.setMap(map);
    }
    if(kml2){
        kml2 += kml2.indexOf("?") ? "&t=" + new Date().getTime() : "?t=" + new Date().getTime();
        moe2SceneryLayer = new google.maps.KmlLayer(kml2 + "&t=" + new Date().getTime(), {preserveViewport:true});
        moe2SceneryLayer.setMap(map);
    }
}
function clearSceneryMoe(){
    if(moeSceneryLayer){
        moeSceneryLayer.setMap(null);
    }
    if(moe2SceneryLayer){
         moe2SceneryLayer.setMap(null);
    }
}


function closeInfoWindow(){
    if(infoWindow != null){
        infoWindow.close();
        clearTimeout(cctvTimer);
        $("#cctvIframe,#hwCctvIframe").remove();
        
        isCctvPause = false;
        /*
        if(/Chrome|Safari/i.test(navigator.userAgent)){
            window.stop();
        }
        */
    }
    if(infoWindow2 != null){
        infoWindow2.close();
    }
}

// 台灣區域圖所使用
function MM_preloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;  if(!d) d=document; 
    if((p=n.indexOf("?"))>0&&parent.frames.length) { d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
    if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

// google map
function loadMapillustration(){
    // 產生省道CCTV的示意層
    var coordinatesArr = ["25.0019497\,121.3509148","24.3842292\,120.7526906","24.606142\,121.855856","23.165535\,120.340719","23.9279566666667\,121.537044333333","23.85615\,120.47135","23.3323163333333\,121.3198275","22.642354\,120.402686","22.995514\,121.159369","24.761797\,121.036377","22.220463\,120.786438"];
    for (var index in coordinatesArr) {
        var lat = coordinatesArr[index].split(",")[0];
        var lng = coordinatesArr[index].split(",")[1];
        var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat,lng),
              map: map,
              icon: "images/cctv.png",
              title:"點擊圖示即可觀看此區域即時影像及道路績效"
          });
        google.maps.event.addListener(marker, 'click', function(mouseEvent){
            map.setZoom(11);
            map.panTo(new google.maps.LatLng(mouseEvent.latLng.lat(),mouseEvent.latLng.lng()))
        });
        markerMap2.put(markerMap2.size, marker);
    }
    
    // 產生國道設備的示意層
    var hwCoordinatesArr =["22.593726\,120.410156","24.87647\,121.102295","24.87647\,121.761475","25.000994\,121.278076","24.607069\,120.888062","24.367114\,120.717773","24.21691\,120.673828","23.855698\,120.492554","23.579092\,120.426636","23.276673\,120.272827","23.019076\,120.250854","22.781246\,120.404663"];
    
    for (var index = 0 ;index < hwCoordinatesArr.length;index++ ) {
        var lat = hwCoordinatesArr[index].split(",")[0];
        var lng = hwCoordinatesArr[index].split(",")[1];
        var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat,lng),
              icon: "images/cctvBlack.png",
              title:"點擊圖示即可觀看此區域國道影像"
        });
        google.maps.event.addListener(marker, 'click', function(mouseEvent){
            map.setZoom(11);
            map.panTo(new google.maps.LatLng(mouseEvent.latLng.lat(),mouseEvent.latLng.lng()))
        });
        highwayCctvMap2.put(highwayCctvMap2.size, marker);
    }
}

function loadMap() {
    if(map !== undefined){
        google.maps.event.clearListeners(map, 'zoom_changed');
        google.maps.event.clearListeners(map, 'dragend');
    }
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat,lng);
    var myOptions = {
      zoom: zoom,
      center: latlng,
      disableDefaultUI: true,
      scaleControl:true,
      navigationControl: true,
      streetViewControl: true,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeControl:true,
      mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID] },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    

    google.maps.event.addListener(map,"dragend",function(){
        geocoder.geocode({'latLng': map.getCenter()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[4] != undefined) {
                    showWeatherInfo(results[4].formatted_address);
                }
            }
        });
        changeWeatherDeviceTextList();
    });
    
    //預設勾選CCTV、道路績效及災情資訊
    checkDevice();
    $("#deviceCheck").attr({"src" : $("#deviceCheck").attr("src").replace(".png","_click.png")});
    checkMoe();
    $("#moeCheck").attr({"src" : $("#moeCheck").attr("src").replace(".png","_click.png")});
    checkDisaster();
    $("#disasterCheck").attr({"src" : $("#disasterCheck").attr("src").replace(".png","_click.png")});
    //永遠顯示道路封閉
    showBlocking();

    google.maps.event.addListener(map, 'zoom_changed', function() { 
          if (map.getZoom() < 8 ) { 	
              map.setZoom(8); 
          } else if (map.getZoom() > 17 ) { 
              map.setZoom(17); 
          }

//          //控制道路雨量 當Zoom<11, 將proHwyRdCheck改回未點選狀態且將map上的marker移除
//          if(map.getZoom() < 11 && $("#proHwyRdCheck").attr("src").indexOf("_click.png") > -1){
//        	  $("#proHwyRdCheck").attr({"src" : $("#proHwyRdCheck").attr("src").replace("_click.png",".png")});
//        	  var proHwyRdArr = proHwyRdMap.values();
//        	  for (var i=0;i < proHwyRdArr.length;i++){
//                  var proHwyRdMarker = proHwyRdArr[i];
//                  proHwyRdMarker.setMap(null);
//              }
//          } 

          //zoom level 8~10 為示意層, 11 ~ 17 為實際的圖層 
          if ( map.getZoom() <= 10) {
              if ($("#deviceCheck").attr("src").indexOf("_click.png") > -1){
                   var deviceArr = deviceMap.values();
                   for (var i=0;i < deviceArr.length;i++){
                        var deviceMarker = deviceArr[i];
                        deviceMarker.setMap(null);
                   }
                   var cctvArr2 = markerMap2.values();
                   for (var i=0;i < cctvArr2.length;i++){
                        var cctvMarker2 = cctvArr2[i];
                        cctvMarker2.setMap(map);
                   }
              }
              if ($("#hwCctvCheck").attr("src").indexOf("_click.png") > -1){
                   var cctvArr = highwayCctvMap.values();
                       for (var i=0;i < cctvArr.length;i++){
                            var cctvMarker = cctvArr[i];
                            cctvMarker.setMap(null);
                   }
                   var cctvArr2 = highwayCctvMap2.values();
                   for (var i=0;i < cctvArr2.length;i++){
                        var cctvMarker2 = cctvArr2[i];
                        cctvMarker2.setMap(map);
                   }
              }
          } 
          else if (map.getZoom() >= 11) {
              if ($("#deviceCheck").attr("src").indexOf("_click.png") > -1) {
                   var cctvArr2 = markerMap2.values();
                   for (var i=0;i < cctvArr2.length;i++) {
                        var cctvMarker2 = cctvArr2[i];
                        cctvMarker2.setMap(null);
                   }
                   var deviceArr = deviceMap.values();
                   for (var i=0;i < deviceArr.length;i++) {
                        var deviceMarker = deviceArr[i];
                        deviceMarker.setMap(map);
                   }
              }
              
              if ($("#hwCctvCheck").attr("src").indexOf("_click.png") > -1) {
                   var cctvArr2 = highwayCctvMap2.values();
                       for (var i=0;i < cctvArr2.length;i++){
                            var cctvMarker2 = cctvArr2[i];
                            cctvMarker2.setMap(null);
                   }
                   var cctvArr = highwayCctvMap.values();
                   for (var i=0;i < cctvArr.length;i++){
                        var cctvMarker = cctvArr[i];
                        cctvMarker.setMap(map);
                   }
              }
          }
          changeWeatherDeviceTextList();
    });
}

// initialize...
function initialize() {
    loadRainfall();
    getVdRealtimeData();
    loadCMS();
    loadRd();
    loadVi();
    loadWd();
 //   loadProHwyRd();
    loadHighwayCCTV();
    loadEvent();
    loadBlocking();
    //loadDisasters();
    getVisitorNums();
    getWeatherInfo();
    loadMapillustration();
    $("#dataUpdateSpan").html((new Date()).toLocaleString());
    setTimeout(function(){updateData();},300000);
  //  setTimeout("updateProHwyRd();",60000);
}

function initializeMarquee(){
    // 先取得 div#abgne_marquee ul
    // 接著把 ul 中的 li 項目再重覆加入 ul 中(等於有兩組內容)
    // 再來取得 div#abgne_marquee 的高來決定每次跑馬燈移動的距離
    // 設定跑馬燈移動的速度及輪播的速度

    var $marqueeUl = $('div#abgne_marquee ul'), 
        $marqueeli = $marqueeUl.append($marqueeUl.html()).children(), 
        height = $('div#abgne_marquee').height() * -1, 
        scrollSpeed = 600, timer, 
        speed = 10000 + scrollSpeed, 
        direction = 0, // 0 表示往上, 1 表示往下
        lock = false;

    // 讓跑馬燈文字垂直置中
    $marqueeUl.children().each(function() {
        var li = $(this);
        li.children("a").css({
            "height" : "50px",
            "line-height" : (li.height() > 25) ? "25px" : "50px"
        });
    });
    
    // 控制跑馬燈上下移動的處理函式
    function showad() {
        lock = !lock;
        var now = $marqueeUl.position().top / height;
        now = ( direction ? now - 1 + $marqueeli.length : now + 1) % $marqueeli.length;

        // $marqueeUl 移動
        $marqueeUl.animate({
            top : now * height
        }, scrollSpeed, function() {
            // 如果已經移動到第二組時...則馬上把 top 設回到第一組的最後一筆
            // 藉此產生不間斷的輪播
            if (now == $marqueeli.length - 1) {
                $marqueeUl.css('top', $marqueeli.length / 2 * height - height);
            }
            else if (now == 0) {
                $marqueeUl.css('top', $marqueeli.length / 2 * height);
            }
            lock = !lock;
        });
        // 再啟動計時器
        timer = setTimeout(showad, speed);
    }

    // 先把 $marqueeli 移動到第二組
    $marqueeUl.css('top', $marqueeli.length / 2 * height);
    // 幫左邊 $marqueeli 加上 hover 事件
    // 當滑鼠移入時停止計時器；反之則啟動
    $marqueeli.hover(function() {
        clearTimeout(timer);
    }, function() {
        timer = setTimeout(showad, speed);
    });
    // 判斷要往上還是往下
    $('div#abgne_marquee .marquee_btn').click(function() {
        if (lock) { return; } 
        clearTimeout(timer);
        direction = $(this).attr('id') == 'marquee_next_btn' ? 0 : 1;
        showad();
    });
    
    slideLine('ann_box', 'div', 0, 50, 60);
    //五個屬性各別是：外面div的id名稱、包在裡面的標籤類型、延遲毫秒數、速度、高度

    // 啟動計時器
    timer = setTimeout(showad, speed);
    $('a').focus(function() {
        this.blur();
    });
}

function initializeDomEvent(){
    
    $("#region > div > div").click(function(){
            moveTo($(this).text());
        });

    $('ul a').collapsor({activeClass:'inactive'});
    
    $("#locateBox").focus(function() {
        if ( $(this).val() == "請輸入椿號或別名查詢") {
            $(this).val("");    
        } 
    }).blur(function() {
        if ( $(this).val() == '') {
            $(this).val("請輸入椿號或別名查詢");  
        }
    });
    
    $("input.menuImgBt").hover( function () {
        $(this).attr({"src" : $(this).attr("src").replace(".jpg","_over.jpg")});
        }, function () {
            $(this).attr({"src" : $(this).attr("src").replace("_over.jpg",".jpg")});
        }
    ); 

    $("#deviceCheck,#hwCctvCheck,#moeCheck,#cmsCheck,#hwMoeCheck,#eventCheck,#disasterCheck,#rdCheck,#viCheck,#wdCheck,#proHwyRdCheck").click( function () {
            if ($(this).attr("src").indexOf("_click") == -1 ){
                $(this).attr({"src" : $(this).attr("src").replace(".png","_click.png")});
            }else {
                $(this).attr({"src" : $(this).attr("src").replace("_click.png",".png")});
            }
            changeWeatherDeviceTextList();
        }
    );

    $("#weatherDevices").delegate("#weatherDevicesContainer > div", "click",function(){
        var marker = null;
        var deviceId = $(this).attr("data-id");
        if(deviceId.indexOf("WD") !== -1){
            marker = wdMap.get(deviceId);
        }
        else if(deviceId.indexOf("RD") !== -1){
            marker = rdMap.get(deviceId);
        }
        else if(deviceId.indexOf("VI") !== -1){
            marker = viMap.get(deviceId);
        }
        //點網頁左欄天候資訊 可以跳到MAP之marker上
        //與xml黨DeviceId有關
        else if(deviceId.indexOf("台9線") !== -1){
            marker = proHwyRdMap.get(deviceId);
        }
        
        if(marker){
            google.maps.event.trigger(marker, 'click');
        }
    })
    
}

$(function() {
    $.log.setLogLevel("debug");
    initialize();
    initializeMarquee();
    initializeDomEvent();
});

function showMessage(message) {
    $("<div>" + message + "</div>").dialog({
        modal : true,
        buttons : {
            Ok : function() {
                $(this).dialog('destroy').remove();
            }
        },
        close : function() {
            $(this).dialog('destroy').remove();
        }
    });
}

$(window).load(function () {
    var startDate = new Date("2013/03/14 15:00:00");
    var endDate = new Date("2013/03/18 09:00:00");
    var now = new Date();
    if(now.compareTo(startDate) >= 0 && now.compareTo(endDate) < 0){
        //showMessage("系統公告：<br>2013/03/15 下午3點 ～ 2013/03/18 上午9點<br>系統將進行斷電維護，造成不便敬請見諒!");
    }
    
    // 預先載入按鈕圖片
    $('input:image').preload({
        find : '.jpg',
        replace : '_over.jpg'
    });
    
    $('input:image').preload({
        find : '.png',
        replace : '_click.png'
    });
 
    // 預先載入台灣區域圖
    $.preload(['north', 'earth', 'south', 'middle'], {
        base : 'images/taiwan/',
        ext : '.png'
    });

    $.preload(['north_taipei', 'north_taoyuan', 'north_hsinchu', 'middle_miaoli', 'middle_taichung', 'middle_changhua', 'middle_nantou', 'middle_yunlin', 'south_chiayi', 'south_tainan', 'south_kaohsiung', 'south_pingtung', 'east_taitung', 'east_yilan', 'east_hualien'], {
        base : 'images/taiwan/',
        ext : '.jpg'
    }); 
    
    /*
    if($.cookie('sysMsg') !== "1"){
        $("<div>103年4月9日21：00～隔日07：00，因進行伺服器維護作業，本站將暫時關閉，不便之處，請多見諒</div>").dialog({
            resizable: false,
            modal:true,
            open : function(){
                $.cookie('sysMsg', "1", {"expires" :new Date().addHours(1)});
            },
            close : function() {
                $(this).dialog('destroy').remove();
            },
            buttons : {
                "確定" : function() {
                    $(this).dialog('destroy').remove();
                }
            }
        });
    }
    */
    
});
