mapboxgl.accessToken = 'pk.eyJ1IjoibWN3aGl0dGVtb3JlIiwiYSI6IjI5Y2dTd1UifQ.7nBmjzRZ4M3bzEwoo3YIAQ';
var map = new mapboxgl.Map({
    container: 'map', // container id
    maxZoom: 5
});

var bios = document.getElementById('bios');
var aboutPage = bios.innerHTML;

function aboutAstronauts(astronauts) {
  var out = '<ul>';
  for(var i=0; i<1; i++) {
    var astronaut = astronauts[i];
    out += '<li>';
      out += "<h2>";
        out += astronaut.properties.name;
      out += "</h2>";
      out += "<div class='in-space'>";
        out += "Entered space on " + astronaut.properties["Entered Space"];
      out += "</div>";
      out += "<img src='"+astronaut.properties.Image+"' />";
      out += "<div class='about'>";
          out += astronaut.properties.about.replace(/\[[\d]*\]/g, '');
      out += "</div>";
      out += "<a target='_blank' href='"+astronaut.properties.wiki+"'>";
        out += "Read more..."
      out += "</a>";
    out += '</li>';
  }
  out += '</ul>';
  bios.innerHTML = out;
  highlight(astronaut.properties.wiki);
}

function highlight(id) {
  map.addLayer({
    "layout": {
        "visibility": "visible"
    },
    "filter": [
        "==",
        "wiki",
        id
    ],
    "type": "circle",
    "source": "mapbox://mcwhittemore.ciliwq3lu3oduvamcolpeirb9-0pnzx",
    "id": "highlight",
    "paint": {
        "circle-color": "hsl(153, 95%, 57%)",
        "circle-radius": {
            "base": 1.06,
            "stops": [
                [
                    0,
                    5
                ],
                [
                    22,
                    30
                ]
            ]
        }
    },
    "source-layer": "women-in-space",
    "interactive": true
  });
}

function hideGrams() {
  highlight('');
  bios.innerHTML = aboutPage;
}

map.on('click', function(e) {
  map.featuresAt(e.point, {
    radius: 5,
    layer: 'women-in-space'
  }, function(err, astronauts) {
    if(err) {
      alert(err.message);
    }
    else {
      if(astronauts.length > 0) {
        aboutAstronauts(astronauts);
      }
      else {
        hideGrams();
      }
    }
  });
});

map.setStyle('mapbox://styles/mcwhittemore/ciliwuclu000p9dm3cb6awdpl');
