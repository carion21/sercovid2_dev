demo = {
    initGoogleMaps: function () {
        //RECUPERATION

        var havecenter = parseInt(document.getElementById("havecenter").textContent)
        var ztotal = parseInt(document.getElementById("ztotal").textContent)
        var zcenter = {}

        var zone = {}
        let zones = []

        for (let index = 0; index < ztotal; index++) {
            var color;
            var icon;
            var statut = parseInt(document.getElementById("statut_"+index).textContent)
            if (statut == 1) {
                var color = '#FF0000'
                var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            } else {
                var color = '#00FF00'
                var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
            let zone = {
                title: document.getElementById("title_"+index).textContent,
                rayon: parseFloat(document.getElementById("rayon_"+index).textContent),
                latitude: parseFloat(document.getElementById("latitude_"+index).textContent),
                longitude: parseFloat(document.getElementById("longitude_"+index).textContent),
                color: color,
                icon: icon
            }
            //console.log(zone)
            zones.push(zone)
            
        }

        if (havecenter == 1) {
            var zcenter = {
                latitude: parseFloat(document.getElementById("zclatitude").textContent),
                longitude: parseFloat(document.getElementById("zclongitude").textContent)
            }
            var zc = new google.maps.LatLng(zcenter.latitude, zcenter.longitude);
        } else {
            var zcenter = {
                latitude: parseFloat(document.getElementById("latitude_0").textContent),
                longitude: parseFloat(document.getElementById("longitude_0").textContent)
            }
            var zc = new google.maps.LatLng(zcenter.latitude, zcenter.longitude);
        }
        console.log(zcenter)

        


        //var myZone = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            zoom: 16,
            mapTypeId: 'satellite',
            center: zc,
            scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                    elementType: 'geometry',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#263c3f'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#6b9a76'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#38414e'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#212a37'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#9ca5b3'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#1f2835'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#f3d19c'
                    }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#2f3948'
                    }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#17263c'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#515c6d'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#17263c'
                    }]
                }
            ]

        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        for (let index = 0; index < ztotal; index++) {
            const zone = zones[index];

            var cityCircle = new google.maps.Circle({
                strokeColor: zone.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zone.color,
                fillOpacity: 0.35,
                map: map,
                center: {lat: zone.latitude, lng: zone.longitude},
                radius: zone.rayon
            });

            var marker = new google.maps.Marker({
                icon: zone.icon,
                position: {lat: zone.latitude, lng: zone.longitude},
                title: zone.title,
                animation: google.maps.Animation.DROP,
            });
            marker.addListener('click', toggleBounce);
            marker.setMap(map);
            
        }


        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        
    }

}