// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(45.518715,-73.581250); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1>Legend</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
var myGeoJSON= {
  "type":"FeatureCollection",
  "features":
  [{"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                [-85.60546875,49.03786794532644]]]}},
   {"type":"Feature",
    "properties":{myColor: 'green'},
    "myColor" : "green",
     "geometry":{"type":"Polygon",
                 "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                 [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                 [-113.203125,58.35563036280967]]]
                }}]};


/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 12,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
              [{position: new google.maps.LatLng(45.530503,-73.613894),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map to the one
                               // located at the URL which is given by the variable blueURL, see above
                title: "Behaviour Interactive",
                window_content: "<h1>Marker1</h1><p> and this would be the extended description</p>"
               },
               {position: new google.maps.LatLng(45.500609,-73.577025),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map
                title: "EA Motive Studios",
                window_content: "<h1>Marker2</h1><p> and <a href='http://something'>this would</a> be the extended description</p>"
              },
              {position: new google.maps.LatLng(45.506213,-73.569076),
               map: my_map,
               icon: blueURL, // this sets the image that represents the marker in the map
               title: "Eidos Montreal",
               window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
               '<blockquote>quote quote quote quote</blockquote>'
             },
             {position: new google.maps.LatLng(45.530152,-73.598626),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Gameloft Montreal",
              window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
              '<blockquote>quote quote quote quote</blockquote>'
            },
            {position: new google.maps.LatLng(45.502028,-73.556273),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "Ludia Inc",
             window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
             '<blockquote>quote quote quote quote</blockquote>'
           },
           {position: new google.maps.LatLng(45.525995,-73.597618),
            map: my_map,
            icon: blueURL, // this sets the image that represents the marker in the map
            title: "Ubisoft Montreal",
            window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
            '<blockquote>quote quote quote quote</blockquote>'
          },
          {position: new google.maps.LatLng(45.516570,-73.559170),
           map: my_map,
           icon: blueURL, // this sets the image that represents the marker in the map
           title: "Warner Brothers Games Montreal",
           window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
           '<blockquote>quote quote quote quote</blockquote>'
         },
         {position: new google.maps.LatLng(45.496761,-73.554729),
          map: my_map,
          icon: blueURL, // this sets the image that represents the marker in the map
          title: "Bethesda Games Montreal",
          window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
          '<blockquote>quote quote quote quote</blockquote>'
        },
              ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var romeCircle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: my_map,
    bounds: {
      north: 45.530503,
      south: 45.496761,
      east: -73.554729,
      west: -73.613894
    },

    center: {"lat": 45.518715, "lng":-73.581250},
    radius: 1000
  });
  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// form outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
