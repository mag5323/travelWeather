$(document).ready(function(e){
    var cctvTimer;
    var map;
    var dirService;
    var dirDisplay;
    var pathToPoints = [[2],[]];
    var infoWindow;
    var times = 0;

    init();

    /* add click listener/infowindow/marker */
    function setUpCamera(camera) {
        var myLatlng = new google.maps.LatLng(camera.lat, camera.lng);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: camera.lat +","+ camera.lng
        });

        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
            closeInfoWindow();

            map.setCenter(marker.getPosition());
            if (camera.url.indexOf("snapshot") > -1) {
                infoWindow = new google.maps.InfoWindow({
                            content: "<img class='snap' src='"+camera.url+"' width='320px' height='240px' onload='refreshMJpeg(this, \""+camera.url+"\")' />"
                });

            }else {
                infoWindow = new google.maps.InfoWindow({
                            content: "<img class='cctv' src='"+camera.url+"' width='320px' height='240px' />"
                });
            }

            infoWindow.open(map, marker);
        });
    }

    /* classify routing path's point */
    function classify(item){
        if (item.A>121.0) {
            if (item.k>25.0) {
                return 0;
            }

            if (item.k>24.5) {
                return 2;
            }

            if (item.k>24.0) {
                return 4;
            }

            if (item.k>23.5) {
                return 6;
            }

            if (item.k>23.0) {
                return 8;
            }

            if (item.k>22.5) {
                return 10;
            }
        } else {
            if (item.k>24.5) {
              return 1;
            }

            if (item.k>24.0) {
              return 3;
            }

            if (item.k>23.5) {
              return 5;
            }

            if (item.k>23.0) {
              return 7;
            }

            if (item.k>22.5) {
              return 9;
            }

            if (item.k>21.5) {
              return 11;
            }
        }
    }

    /*  checking if the camera is on the route
        by calculating their straight-line distance */
    function isOnThePath(point, camera) {
        var xSum = Math.pow(point.k-camera.lat, 2);
        var ySum = Math.pow(point.A-camera.lng, 2);
        var distance = Math.sqrt(xSum+ySum);
        if (Math.abs(Math.floor(distance)-distance) < 0.005) {
            return true;
        }
        return false;
    }

    /* close other infowindow */
    function closeInfoWindow(){
        if(infoWindow != null){
            infoWindow.close();
            clearTimeout(cctvTimer);
            $(".snap, .cctv").remove();
        }
    }

    /* getting From location*/
    function getFrom() {
        return $("#from").val();
    }

    /* getting To location*/
    function getTo() {
        return to = $("#to").val();
    }

    /* google map initialize */
    function init() {
        // var deviceLen = position[0].length+1;
        var i;
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(23.5986813, 121.0173533),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    /* Alaways set Taiwan as center while resizing*/
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    /* route service/display constructing, map target */
    $("#submit").on("click", function(){
        if (times > 0) {
            init();
        }
        times ++;

        dirService = new google.maps.DirectionsService();
        dirDisplay = new google.maps.DirectionsRenderer();
        dirDisplay.setMap(map);

        var from = getFrom();
        var to = getTo();

        var request = {
            origin: from,
            destination: to,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        dirService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirDisplay.setDirections(response);

                /* change route into points array */
                var path = response.routes[0].overview_polyline.points;
                var points = google.maps.geometry.encoding.decodePath(path);

                $.getJSON("camera.json", function(cameras){

                    /* roughly iterating points array by 5 step */
                    for (var i=0; i<points.length; i+=5) {
                        var group = classify(points[i]);

                        $.each(cameras[group], function(j, camera){
                            if (isOnThePath(points[i], camera)) {
                                setUpCamera(camera);
                            }
                        });
                    }
                });
            }
        });
    });

    $(".ui.dropdown").dropdown({
        onChange: function (val) {
            $("#to").val(val);
        }
    });
});

function refreshMJpeg(obj, url){
    if( $(".snap").length > 0 ){
        cctvTimer = setTimeout(function(){
            obj.src = url + "?t=" + new Date().getTime();
        },100);
    }
}

