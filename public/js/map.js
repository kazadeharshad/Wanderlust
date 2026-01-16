locationiq.key = mapToken;

var map = new maplibregl.Map({
                container: 'map',
                style: locationiq.getLayer("Streets"),
                zoom: 12,
                center: coords
            });
            
            //Define layers you want to add to the layer controls; the first element will be the default layer
            var layerStyles = {
                "Streets": "streets/vector",
                 "Dark": "dark/vector",
                 "Light": "light/vector"
            };
            
            map.addControl(new locationiqLayerControl({
                key: locationiq.key,
                layerStyles: layerStyles
            }), 'top-left');

            var coordinates = document.getElementById('coordinates');
                
            // First create DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.id = 'marker';
            // Set marker properties using JS
            el.style.backgroundImage = 'url(https://tiles.locationiq.com/static/images/marker50px.png)';

            var marker = new maplibregl.Marker(el, {
                draggable: true
            }).setLngLat(coords)
            .addTo(map);

            // After the mouse is released the following function is executed which updates the displayed lat and long
            function onDragEnd() {
                var lngLat = marker.getLngLat();
                coordinates.style.display = 'block';
                coordinates.innerHTML =
                    'Latitude: ' + lngLat.lat + '<br />Longitude: ' + lngLat.lng;
            }

            marker.on('dragend', onDragEnd);