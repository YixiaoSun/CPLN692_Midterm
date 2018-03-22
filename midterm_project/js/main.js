/*set the map*/
var map = L.map('map', {
  center: [32, 110],
  zoom: 4
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/*keep page number in mind*/
var featureGroup;
var markers1;
var markers2;
var pageNumber = 1;

/*add data*/
var dataset = "https://raw.githubusercontent.com/YixiaoSun/HepAData/master/HepADataNew";

/*page 1*/
/*add color*/
  var myStyle1 = function(feature) {
    switch (feature.properties.HepA2016L){
      case 1:
      return {fillColor:'#E9F7EF',
              color:'white',
              weight:'2px',
              fillOpacity:'0.4'};
      case 2:
      return {fillColor:'#A9DFBF',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case 3:
      return {fillColor:'#52BE80',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case 4:
      return {fillColor:'#1E8449',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case 5:
      return {fillColor:'#145A32',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      }
    };

    var myFilter1 = function(feature){
      if (feature.properties.HepA2016L===" "){
        return false;
      }
      else{
        return true;
      }
    };

    /*add popup*/
    var eachFeatureFunction1 = function(layer) {
      layer.on('mouseover', function (feature) {
        var popup= L.popup()
        .setLatLng([layer.feature.properties.Lat,layer.feature.properties.Log])
        .setContent("Province Name: "+layer.feature.properties.Pro_name+"; Hep A Morbidity in 2016: "+
                    layer.feature.properties.HepA2016+" per 100,000")
        .openOn(map);
      });
    };

    /*render the first page*/
    var renderThePage1= function(){
    $("#explanation-header").text("Hepatitis A Morbidity in Chinese Provinces (2016)");
    $("#explanation1").text("Hepatitis A is a viral liver disease that affects many people in China. Applying natural break classification, the map shows the morbidity of Hep A in Chinese provinces. People from provinces in the west of China tend to be bothered more by the epidemic, with Xinjiang having the highest morbidity.");
    $("#explanation2").text("For more detailed information, please see the popup box of each province when putting your mouse over that province on the map.");
    $("#notice1").text(" Data source: China Yearbook.");
    $("#notice2").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
    $("#prev").text("");
    $("#prev").prop("disabled",true);
    $("#next").text("Next >");
    $("#prev").prop("disabled",false);
    $("#pageNumber").text("1/7");
    $("#legend-title1").text("Hepatitis A morbidity in 2016");
    $("#legend-title2").text("(per 100,000)");
    $("#legend1-text").text("Level 1: 0.24-0.68");
    $("#legend2-text").text("Level 2: 0.68-1.48");
    $("#legend3-text").text("Level 3: 1.48-2.94");
    $("#legend4-text").text("Level 4: 2.94-6.77");
    $("#legend5-text").text("Level 5: 6.77-15.15");
    $("#legend41").hide();
    $("#legend42").hide();
    $("#legend43").hide();
    $("#legend44").hide();
    $("#legend45").hide();
    $(".dot1").hide();
    $(".dot2").hide();
    $(".dot3").hide();
    $(".dot4").hide();
    $(".dot5").hide();
    $(".dot21").hide();
    $(".dot22").hide();
    $(".dot23").hide();
    $(".dot24").hide();
    $(".dot25").hide();
  };


  /*page 2*/
  /*add circle markers*/
  var style={
    radius:12,
    color:"#2E86C1",
    opacity:0.8,
  };

  var makeMarkers2 = function(data){
    return _.map(data, function(feature){
      return L.circleMarker([feature.properties.Lat,feature.properties.Log],{
        radius:6*feature.properties.water2012L,
        color:"#2E86C1",
        fillOpacity:0.4,
        weight:0
      }).bindPopup("Province Name: "+feature.properties.Pro_name+"; Acess to clean drinkable water index: "+
                  feature.properties.water2012);
    });
  };

  var plotMarkers2 = function(data) {
    _.each(data,function(object){
      object.addTo(map);
    });
  };

  var removeMarkers2 = function(data){
    _.each(data,function(object){
      map.removeLayer(object);
    });
  };

  /*render the second page*/
  var renderThePage2= function(){
  $("#explanation-header").text("Hepatitis A Morbidity and Water Sanitation in Chinese Provinces (2016)");
  $("#explanation1").text("Hepatitis A infection is largely associated with access to safe, drinkable water. Applying natural break classification, the circle markers show the sanitation conditions of drinkable water in the rural areas of each province. This index is the measurement of clean water access per 10,000 people in the rural area.");
  $("#explanation2").text("For more detailed information, please click on the circle and popup box of each province.");
  $("#notice1").text(" Data source: China Yearbook.");
  $("#notice2").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#prev").prop("disabled",false);
  $("#pageNumber").text("2/7");
  $("#legend-title1").text("Hepatitis A morbidity in 2016");
  $("#legend-title2").text("(per 100,000)");
  $("#legend1-text").text("Level 1: 0.24-0.68");
  $("#legend2-text").text("Level 2: 0.68-1.48");
  $("#legend3-text").text("Level 3: 1.48-2.94");
  $("#legend4-text").text("Level 4: 2.94-6.77");
  $("#legend5-text").text("Level 5: 6.77-15.15");
  $("#legend2-title2").text("Access to clean drinkable water index");
  $("#legend21-text").text("Level 1: ");
  $("#legend22-text").text("Level 2: ");
  $("#legend23-text").text("Level 3: ");
  $("#legend24-text").text("Level 4: ");
  $("#legend25-text").text("Level 5: ");
  $(".dot1").show();
  $(".dot2").show();
  $(".dot3").show();
  $(".dot4").show();
  $(".dot5").show();
  $(".dot21").hide();
  $(".dot22").hide();
  $(".dot23").hide();
  $(".dot24").hide();
  $(".dot25").hide();
  };

  /*page 3*/
  /*render the third page*/
  var renderThePage3= function(){
  $("#explanation-header").text("Hepatitis A Morbidity and Water Sanitation in Chinese Provinces (2016) - A Closer Look");
  $("#explanation1").text("");
  $("#explanation2").text("For example, in those southeastern provinces, the easier access to sanitary drinkable water is likely to be associated with the lower Hep A mobidity rate.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#prev").prop("disabled",false);
  $("#pageNumber").text("3/7");
  $("#legend-title1").text("Hepatitis A morbidity in 2016");
  $("#legend-title2").text("(per 100,000)");
  $("#legend1-text").text("Level 1: 0.24-0.68");
  $("#legend2-text").text("Level 2: 0.68-1.48");
  $("#legend3-text").text("Level 3: 1.48-2.94");
  $("#legend4-text").text("Level 4: 2.94-6.77");
  $("#legend5-text").text("Level 5: 6.77-15.15");
  $("#legend2-title2").text("Access to clean drinkable water index");
  $("#legend21-text").text("Level 1: ");
  $("#legend22-text").text("Level 2: ");
  $("#legend23-text").text("Level 3: ");
  $("#legend24-text").text("Level 4: ");
  $("#legend25-text").text("Level 5: ");
  $(".dot1").show();
  $(".dot2").show();
  $(".dot3").show();
  $(".dot4").show();
  $(".dot5").show();
  $(".dot21").hide();
  $(".dot22").hide();
  $(".dot23").hide();
  $(".dot24").hide();
  $(".dot25").hide();
  };

  /*page 4*/
  /*add color*/
  var myStyle4 = function(feature) {
    switch (feature.properties.changeL){
      case -3:
      return {fillColor:'#FDEDEC',
              color:'white',
              weight:'2px',
              fillOpacity:'0.4'};
      case -2:
      return {fillColor:'#F5B7B1',
               color:'white',
               weight:'2px',
               fillOpacity:'0.3'};
      case -1:
      return {fillColor:'#EC7063',
               color:'white',
               weight:'2px',
               fillOpacity:'0.3'};
      case 1:
      return {fillColor:'#B03A2E',
               color:'white',
               weight:'2px',
               fillOpacity:'0.3'};
      case 2:
      return {fillColor:'#78281F',
               color:'white',
               weight:'2px',
               fillOpacity:'0.3'};
      }
    };

    var myFilter4 = function(feature){
      if (feature.properties.changeL===" "){
        return false;
      }
      else{
        return true;
      }
    };

    /*add popup*/
    var eachFeatureFunction4 = function(layer) {
      layer.on('mouseover', function (feature) {
        var popup= L.popup()
        .setLatLng([layer.feature.properties.Lat,layer.feature.properties.Log])
        .setContent("Province Name: "+layer.feature.properties.Pro_name+"; Hep A Morbidity change: "+
                    layer.feature.properties.change+" per 100,000")
        .openOn(map);
      });
    };

  /*render the fourth page*/
  var renderThePage4= function(){
  $("#explanation-header").text("Hepatitis A Morbidity Change in Chinese Provinces (2012-2016)");
  $("#explanation1").text("Between Year 2012 and Year 2016, the Hepatitis A morbidity in Chinese provinces differed a lot.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when putting your mouse over that province on the map.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#prev").prop("disabled",false);
  $("#pageNumber").text("4/7");
  $("#legend-title1").text("Hepatitis A morbidity change");
  $("#legend-title2").text("between 2012 and 2016");
  $("#legend1-text").text("Level 1 (decrease): ");
  $("#legend2-text").text("Level 2 (decrease): ");
  $("#legend3-text").text("Level 3 (decrease): ");
  $("#legend4-text").text("Level 4 (increase): ");
  $("#legend5-text").text("Level 5 (increase): ");
  $("#legend1").hide();
  $("#legend2").hide();
  $("#legend3").hide();
  $("#legend4").hide();
  $("#legend5").hide();
  $("#legend41").show();
  $("#legend42").show();
  $("#legend43").show();
  $("#legend44").show();
  $("#legend45").show();
  $("#legend2-title2").text("");
  $("#legend21-text").text("");
  $("#legend22-text").text("");
  $("#legend23-text").text("");
  $("#legend24-text").text("");
  $("#legend25-text").text("");
  $(".dot1").hide();
  $(".dot2").hide();
  $(".dot3").hide();
  $(".dot4").hide();
  $(".dot5").hide();
  $(".dot21").hide();
  $(".dot22").hide();
  $(".dot23").hide();
  $(".dot24").hide();
  $(".dot25").hide();
  };

  /*page 5*/
  /*add markers*/
  var makeMarkers5 = function(data){
    return _.map(data, function(feature){
      return L.circleMarker([feature.properties.Lat,feature.properties.Log],{
        radius:6*feature.properties.edu2016L,
        color:"#8C8FD3",
        fillOpacity:0.4,
        weight:0
      }).bindPopup("Province Name: "+feature.properties.Pro_name+"; Health education rate: "+
                  feature.properties.edu2016+" per 10,000");
    });
  };


  var plotMarkers5 = function(data) {
    _.each(data,function(object){
      object.addTo(map);
    });
  };

  var removeMarkers5 = function(data){
    _.each(data,function(object){
      map.removeLayer(object);
    });
  };

  /*render the fifth page*/
  var renderThePage5= function(){
  $("#explanation-header").text("Hepatitis A Morbidity Change (2012-2016) and Health Education Rate (2016) in Chinese Provinces");
  $("#explanation1").text("Health educatin program can effectively increase the rate of immunization in case of Hep A infection. According to the map showing both the morbidity change and health education rate, education programs are likely to help reduce Hep A infection.");
  $("#explanation2").text("For more detailed information, please click on the circle and popup box of each province.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#next").prop("disabled",false);
  $("#pageNumber").text("5/7");
  $("#legend-title1").text("Hepatitis A morbidity change");
  $("#legend-title2").text("between 2012 and 2016");
  $("#legend1-text").text("Level 1 (decrease): ");
  $("#legend2-text").text("Level 2 (decrease): ");
  $("#legend3-text").text("Level 3 (decrease): ");
  $("#legend4-text").text("Level 4 (increase): ");
  $("#legend5-text").text("Level 5 (increase): ");
  $("#legend2-title2").text("Health education rate (per 10,000)");
  $("#legend21-text").text("Level 1: ");
  $("#legend22-text").text("Level 2: ");
  $("#legend23-text").text("Level 3: ");
  $("#legend24-text").text("Level 4: ");
  $("#legend25-text").text("Level 5: ");
  $(".dot21").show();
  $(".dot22").show();
  $(".dot23").show();
  $(".dot24").show();
  $(".dot25").show();
  };

  /*page 6*/
  var renderThePage6= function(){
  $("#explanation-header").text("Hepatitis A Morbidity Change (2012-2016) and Health Education Rate (2016) - in Provinces with Increasing Morbidity");
  $("#explanation1").text("For provinces with rising Hep A morbidity, health education rates seem to be low.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when clicking on the circle markers.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#next").text("Next>");
  $("#next").prop("disabled",false);
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#pageNumber").text("6/7");
  $("#legend-title1").text("Hepatitis A morbidity change");
  $("#legend-title2").text("between 2012 and 2016");
  $("#legend1-text").text("Level 1 (decrease): ");
  $("#legend2-text").text("Level 2 (decrease): ");
  $("#legend3-text").text("Level 3 (decrease): ");
  $("#legend4-text").text("Level 4 (increase): ");
  $("#legend5-text").text("Level 5 (increase): ");
  };

  /*page 7*/
  var renderThePage7= function(){
  $("#explanation-header").text("Hepatitis A Morbidity Change (2012-2016) and Health Education Rate (2016) - in Provinces with Decreasing Morbidity");
  $("#explanation1").text("For provinces with dropping Hep A morbidity, health education rates seem to be high.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when clicking on the circle markers.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#next").text("");
  $("#next").prop("disabled",true);
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#pageNumber").text("7/7");
  $("#legend-title1").text("Hepatitis A morbidity change");
  $("#legend-title2").text("between 2012 and 2016");
  $("#legend1-text").text("Level 1 (decrease): ");
  $("#legend2-text").text("Level 2 (decrease): ");
  $("#legend3-text").text("Level 3 (decrease): ");
  $("#legend4-text").text("Level 4 (increase): ");
  $("#legend5-text").text("Level 5 (increase): ");
  };

$(document).ready(function() {
  $(".dot1").hide();
  $(".dot2").hide();
  $(".dot3").hide();
  $(".dot4").hide();
  $(".dot5").hide();
  $.ajax(dataset).done(function(data) {
    /*first page as default*/
    renderThePage1();
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle1,
      filter: myFilter1
    }).addTo(map);
    featureGroup.eachLayer(eachFeatureFunction1);
    feature=parsedData.features;
    markers1 = makeMarkers2(feature);
    markers2 = makeMarkers5(feature);
    var filterFeature6= _.filter(feature,function(feature){
        return feature.properties.changeL>0;
    });
    var filterMarkers6 = makeMarkers5(filterFeature6);
    var filterFeature7= _.filter(feature,function(feature){
        return feature.properties.changeL<0;
    });
    var filterMarkers7 = makeMarkers5(filterFeature7);

    /*set click for the next page*/
    $("button#next").click(function(e){
      pageNumber=pageNumber+1;
      switch(pageNumber){
        /*page 1*/
        case 1:
            renderThePage1();
            map.setView([32,110],4);
            map.removeLayer(featureGroup);
            featureGroup = L.geoJson(parsedData, {
              style: myStyle1,
              filter: myFilter1
            }).addTo(map);
            featureGroup.eachLayer(eachFeatureFunction1);
        break;

        /* page 2*/
        case 2:
            renderThePage2();
            map.setView([32,110],4);
            map.removeLayer(featureGroup);
            featureGroup = L.geoJson(parsedData, {
              style: myStyle1,
              filter: myFilter1
            }).addTo(map);
            plotMarkers2(markers1);
        break;

        /*page 3*/
        case 3:
        /*zoom in to the area*/
          renderThePage3();
          map.setView([30,118],5);
          break;

        /*page 4*/
        case 4:
          renderThePage4();
          map.setView([32,110],4);
          map.removeLayer(featureGroup);
          featureGroup = L.geoJson(parsedData, {
              style: myStyle4,
              filter: myFilter4
            }).addTo(map);
          removeMarkers2(markers1);
          featureGroup.eachLayer(eachFeatureFunction4);
        break;

        /*page 5*/
        case 5:
          renderThePage5();
          map.setView([32,110],4);
          map.removeLayer(featureGroup);
          featureGroup = L.geoJson(parsedData, {
              style: myStyle4,
              filter: myFilter4
            }).addTo(map);
          plotMarkers5(markers2);
        break;

        /*page 6*/
        case 6:
          renderThePage6();
          removeMarkers2(markers2);
          plotMarkers5 (filterMarkers6) ;
        break;

        /*page 6*/
        case 7:
          renderThePage7();
          removeMarkers2(filterMarkers6);
          plotMarkers5 (filterMarkers7) ;
        break;
      }
    });

    /*set click for the previous page*/
    $("button#prev").click(function(e){
      pageNumber=pageNumber-1;
      switch(pageNumber){
        /*page 7*/
        case 7:
          renderThePage7();
          removeMarkers2(filterMarkers6);
          plotMarkers5 (filterMarkers7) ;
        break;

        /*page 6*/
        case 6:
          renderThePage6();
          removeMarkers2(filterMarkers7);
          plotMarkers5 (filterMarkers6) ;
        break;

        /*page 5*/
        case 5:
          renderThePage5();
          map.setView([32,110],4);
          map.removeLayer(featureGroup);
          featureGroup = L.geoJson(parsedData, {
            style: myStyle4,
            filter: myFilter4
          }).addTo(map);
          removeMarkers5(filterMarkers6);
          plotMarkers5(markers2);
        break;

        /*page 4*/
        case 4:
          renderThePage4();
          map.setView([32,110],4);
          removeMarkers5(markers2);
          map.removeLayer(featureGroup);
          featureGroup = L.geoJson(parsedData, {
              style: myStyle4,
              filter: myFilter4
            }).addTo(map);
          featureGroup.eachLayer(eachFeatureFunction4);
        break;

        /*page 3*/
        case 3:
        /*zoom in to the area*/
          renderThePage3();
          map.setView([30,118],5);
          map.removeLayer(featureGroup);
          featureGroup = L.geoJson(parsedData, {
            style: myStyle1,
            filter: myFilter1
          }).addTo(map);
          plotMarkers2(markers1);
        break;

          /* page 2*/
          case 2:
              renderThePage2();
              map.setView([32,110],4);
              map.removeLayer(featureGroup);
              featureGroup = L.geoJson(parsedData, {
                style: myStyle1,
                filter: myFilter1
              }).addTo(map);
              removeMarkers2(markers1);
              plotMarkers2(markers1);
          break;

          /*page 1*/
          case 1:
              renderThePage1();
              map.removeLayer(featureGroup);
              removeMarkers2(markers1);
              featureGroup = L.geoJson(parsedData, {
                style: myStyle1,
                filter: myFilter1
              }).addTo(map);
              featureGroup.eachLayer(eachFeatureFunction1);
          break;
      }
    });
  });
});
