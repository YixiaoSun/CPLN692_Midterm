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
var markers;
var pageNumber = 1;
var plusOne = function(){
  pageNumber=pageNumber+1;
};
var minusOne = function(){
  pageNumber=pageNumber-1;
};
/*var flipPage = function(){
  $("button#prev").click(function(e){
    pageNumber=pageNumber-1;
  });
  $("button#next").click(function(e){
    pageNumber=pageNumber+1;
  });
};*/

/*add data*/
var dataset = "https://raw.githubusercontent.com/YixiaoSun/HepAData/master/HepADataNew";

/*apply background color based on morbidity data*/

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
                    layer.feature.properties.HepA2016+" per 100,000 people")
        .openOn(map);
      });
    };

    /*render the first page*/
    var renderThePage1= function(){
    $("#explanation-header").text("Hepatitis A Morbidity in Chinese Provinces (2016)");
    $("#explanation1").text("Hepatitis A is a viral liver disease that affects many people in China. Applying natural break classification, the map shows the morbidity of Hep A in Chinese provinces. People from provinces in the west of China tend to be bothered more by the epidemic, with Xinjiang having the highest morbidity.");
    $("#explanation2").text("For more detailed information, please see the popup box of each province when putting your mouse over that province on the map.");
    $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
    $("#prev").text("");
    $("#prev").prop("disabled",true);
    $("#next").text("Next >");
    $("#prev").prop("disabled",false);
    $("#legend-title1").text("Hepatitis A morbidity in 2016");
    $("#legend-title2").text("(per 100,000 people)");
    $("#legend1-text").text("Level 1: 0.24-0.68");
    $("#legend2-text").text("Level 2: 0.68-1.48");
    $("#legend3-text").text("Level 3: 1.48-2.94");
    $("#legend4-text").text("Level 4: 2.94-6.77");
    $("#legend5-text").text("Level 5: 6.77-15.15");
    $(".dot1").hide();
    $(".dot2").hide();
    $(".dot3").hide();
    $(".dot4").hide();
    $(".dot5").hide();
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
        opacity:0.8,
      });
    });
  };

  var plotMarkers2 = function(data) {
    markers=makeMarkers2(data);
    _.each(markers,function(object){
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
  $("#explanation1").text("Hepatitis A infection is largely associated with access to safe, drinkable water. Applying natural break classification, the circle markers show the sanitation conditions of drinkable water in the rural areas of each province.");
  $("#explanation2").text("");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#prev").prop("disabled",false);
  $("#legend2-title1").text("Access to clean drinkable water");
  $("#legend2-title2").text("(per 100,000 people)");
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
  };

  /*page 4*/
  /*add color*/
  var myStyle4 = function(feature) {
    switch (feature.properties.changeL){
      case -3:
      return {fillColor:'#E6B0AA',
              color:'white',
              weight:'2px',
              fillOpacity:'0.4'};
      case -2:
      return {fillColor:'#CD6155',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case -1:
      return {fillColor:'#A93226',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case 1:
      return {fillColor:'#7B241C',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
      case 2:
      return {fillColor:'#641E16',
               color:'white',
               weight:'2px',
               fillOpacity:'0.4'};
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
  /*render the fourth page*/
  var renderThePage4= function(){
  $("#explanation-header").text("Hepatitis A Morbidity and Water Sanitation in Chinese Provinces (2016)");
  $("#explanation1").text("Hepatitis A infection is largely associated with access to safe, drinkable water. Applying natural break classification, the circle markers show the sanitation conditions of drinkable water in the rural areas of each province.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when clicking on the circle markers.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#prev").prop("disabled",false);
  $("#legend-title1").text("Hepatitis A morbidity in 2016");
  $("#legend-title2").text("(per 100,000 people)");
  $("#legend1-text").text("Level 1: 0.24-0.68");
  $("#legend2-text").text("Level 2: 0.68-1.48");
  $("#legend3-text").text("Level 3: 1.48-2.94");
  $("#legend4-text").text("Level 4: 2.94-6.77");
  $("#legend5-text").text("Level 5: 6.77-15.15");
  };

  /*page 5*/
  /*render the fifth page*/
  var renderThePage5= function(){
  $("#explanation-header").text("Hepatitis A Morbidity and Water Sanitation in Chinese Provinces (2016)");
  $("#explanation1").text("Hepatitis A infection is largely associated with access to safe, drinkable water. Applying natural break classification, the circle markers show the sanitation conditions of drinkable water in the rural areas of each province.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when clicking on the circle markers.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#next").text("Next >");
  $("#next").prop("disabled",false);
  $("#legend-title1").text("Hepatitis A morbidity in 2016");
  $("#legend-title2").text("(per 100,000 people)");
  $("#legend1-text").text("Level 1: 0.24-0.68");
  $("#legend2-text").text("Level 2: 0.68-1.48");
  $("#legend3-text").text("Level 3: 1.48-2.94");
  $("#legend4-text").text("Level 4: 2.94-6.77");
  $("#legend5-text").text("Level 5: 6.77-15.15");
  };

  /*page 6*/
  var renderThePage6= function(){
  $("#explanation-header").text("Hepatitis A Morbidity and Water Sanitation in Chinese Provinces (2016)");
  $("#explanation1").text("Hepatitis A infection is largely associated with access to safe, drinkable water. Applying natural break classification, the circle markers show the sanitation conditions of drinkable water in the rural areas of each province.");
  $("#explanation2").text("For more detailed information, please see the popup box of each province when clicking on the circle markers.");
  $("#notice").text("Notice: Due to data accessibility, the data of Hongkong, Macau, and Taiwan will not be shown on the map.");
  $("#next").text("");
  $("#next").prop("disabled",true);
  $("#prev").text("< Previous");
  $("#prev").prop("disabled",false);
  $("#legend-title1").text("Hepatitis A morbidity in 2016");
  $("#legend-title2").text("(per 100,000 people)");
  $("#legend1-text").text("Level 1: 0.24-0.68");
  $("#legend2-text").text("Level 2: 0.68-1.48");
  $("#legend3-text").text("Level 3: 1.48-2.94");
  $("#legend4-text").text("Level 4: 2.94-6.77");
  $("#legend5-text").text("Level 5: 6.77-15.15");
  };

var getMarkers= function(){
  var tryMarkers;
    $.ajax(dataset).done(function(data){
      var parsedData=JSON.parse(data);
      var feature=parsedData.features;
      tryMarkers = makeMarkers2(feature);
    });
  console.log(tryMarkers);
};
markers=getMarkers();
console.log(trymarkers);

/*first page as default*/
$(document).ready(function() {
  $(".dot1").hide();
  $(".dot2").hide();
  $(".dot3").hide();
  $(".dot4").hide();
  $(".dot5").hide();
  $.ajax(dataset).done(function(data) {
    renderThePage1();
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle1,
      filter: myFilter1
    }).addTo(map);
    featureGroup.eachLayer(eachFeatureFunction1);
  });
});


/*set click for the next page*/
$("button#next").click(function(e){
  pageNumber=pageNumber+1;
  console.log(pageNumber);
  switch(pageNumber){
    /*page 1*/
    case 1:
    $(document).ready(function() {
      $.ajax(dataset).done(function(data) {
        renderThePage1();
        map.removeLayer(featureGroup);
        var parsedData = JSON.parse(data);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle1,
          filter: myFilter1
        }).addTo(map);
        featureGroup.eachLayer(eachFeatureFunction1);
      });
    });
    break;

    /* page 2*/
    case 2:
    $(document).ready(function() {
      $.ajax(dataset).done(function(data) {
        renderThePage2();
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle1,
          filter: myFilter1
        }).addTo(map);
        var feature=parsedData.features;
        markers = plotMarkers2(feature);
      });
    });
    console.log(featureGroup);

    break;


    /*page 3*/
    case 3:
    /*zoom in to the area*/
    renderThePage3();
    map.setView([30,118],5);
    break;

    /*page 4*/
    case 4:
    $(document).ready(function() {
      map.setView([32,110],4);
      $.ajax(dataset).done(function(data) {
        renderThePage4();
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle4,
          filter: myFilter4
        }).addTo(map);
      });
    });
    break;

    /*page 5*/
    case 5:
    $(document).ready(function() {
      map.setView([32,110],4);
      $.ajax(dataset).done(function(data) {
        renderThePage5();
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle4,
          filter: myFilter4
        }).addTo(map);
      });
    });
    break;

    /*zoom in to the area*/
    case 6:
    renderThePage6();
    map.setView([30,118],5);
    break;
  }
});

$("button#prev").click(function(e){
  pageNumber=pageNumber-1;
  console.log(pageNumber);
  switch(pageNumber){
    /*page 1*/
    case 1:
    $(document).ready(function() {
      $.ajax(dataset).done(function(data) {
        renderThePage1();
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle1,
          filter: myFilter1
        }).addTo(map);
        featureGroup.eachLayer(eachFeatureFunction1);
      });
    });
    break;


    /* page 2*/
    case 2:
    $(document).ready(function() {
      renderThePage2();
      map.setView([32,110],4);
    });
    break;
    /*page 3*/
    case 3:
    /*zoom in to the area*/
    renderThePage3();
    map.setView([30,118],5);
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      map.removeLayer(featureGroup);
      featureGroup = L.geoJson(parsedData, {
        style: myStyle1,
        filter: myFilter1
      }).addTo(map);
      var feature=parsedData.features;
      var markers=makeMarkers2(feature);
      plotMarkers2(markers);
    });
    break;

    /*page 4*/
    case 4:
    $(document).ready(function() {
      map.setView([32,110],4);
      $.ajax(dataset).done(function(data) {
        renderThePage4();
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle4,
          filter: myFilter4
        }).addTo(map);
      });
    });
    break;

    /*page 5*/
    case 5:
    $(document).ready(function() {
      map.setView([32,110],4);
      renderThePage5();
      $.ajax(dataset).done(function(data) {
        var parsedData = JSON.parse(data);
        map.removeLayer(featureGroup);
        featureGroup = L.geoJson(parsedData, {
          style: myStyle4,
          filter: myFilter4
        }).addTo(map);
      });
    });
    break;

    /*zoom in to the area*/
    case 6:
    renderThePage6();
    map.setView([30,118],5);
    break;
  }
});









/*var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};*/

/*
var eachFeatureFunction0 = function(layer) {
  layer.on('click', function (feature) {
    var popup= L.popup()
    .setLatLng([layer.feature.properties.Lat,layer.feature.properties.Log])
    .setContent("Province Name: "+layer.feature.properties.Pro_name+"; Hep A Morbidity in 2016: "+
                layer.feature.properties.HepA2016+" per 100,000 people")
    .openOn(map);
  });
};*/
