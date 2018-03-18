/*set the map*/
var map = L.map('map', {
  center: [35, 100],
  zoom: 4
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/*add data*/
var dataset = "https://raw.githubusercontent.com/YixiaoSun/HepAData/master/HepADataNew";


/*apply background color based on morbidity data*/
var myStyle = function(feature) {
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

var featureGroup;
/*var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};*/

/*set popup*/
var eachFeatureFunction = function(layer) {
  layer.on('click', function (feature) {
    var popup= L.popup()
    .setLatLng([layer.feature.properties.Lat,layer.feature.properties.Log])
    .setContent("Province Name: "+layer.feature.properties.Pro_name+"; Hep A Morbidity in 2016: "+
                layer.feature.properties.HepA2016+" per 100,000 people")
    .openOn(map);
  });
};

var eachFeatureFunction2 = function(layer) {
  layer.on('mouseover', function (feature) {
    var popup= L.popup()
    .setLatLng([layer.feature.properties.Lat,layer.feature.properties.Log])
    .setContent("Province Name: "+layer.feature.properties.Pro_name+"; Hep A Morbidity in 2016: "+
                layer.feature.properties.HepA2016+" per 100,000 people")
    .openOn(map);
  });
};

var myFilter = function(feature){
  if (feature.properties.COLLDAY===" "){
    return false;
  }
  else{
    return true;
  }
};


$(document).ready(function() {
/*add color to map*/
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);
  featureGroup.eachLayer(eachFeatureFunction2);

  });
});
