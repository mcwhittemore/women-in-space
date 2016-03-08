mapboxgl.accessToken = 'pk.eyJ1IjoibWN3aGl0dGVtb3JlIiwiYSI6IjI5Y2dTd1UifQ.7nBmjzRZ4M3bzEwoo3YIAQ';
var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [0 ,0], // starting position
    zoom: 0, // starting zoom
    minZoom: 0,
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

map.setStyle({
    "version": 8,
    "name": "Women in space",
    "metadata": {
        "mapbox:groups": {
            "1444856567853.8965": {
                "name": "Country labels",
                "collapsed": true
            },
            "1444856935386.6565": {
                "name": "Place labels",
                "collapsed": true
            },
            "1444856939874.5793": {
                "name": "State labels",
                "collapsed": true
            },
            "1444856955689.293": {
                "name": "POI labels",
                "collapsed": true
            },
            "1444856962845.698": {
                "name": "Road labels",
                "collapsed": true
            },
            "1444856991019.1448": {
                "name": "Marine labels",
                "collapsed": true
            },
            "1444857009211.682": {
                "name": "Admin boundaries",
                "collapsed": true
            },
            "1444857022617.3206": {
                "name": "Roads",
                "collapsed": true
            }
        }
    },
    "center": [
        -95.60190465212021,
        -1.7053025658242404e-13
    ],
    "zoom": 0.3083389167722215,
    "bearing": 0,
    "pitch": 0,
    "sources": {
        "mapbox": {
            "url": "mapbox://mapbox.mapbox-streets-v7",
            "type": "vector"
        },
        "satellite": {
            "url": "mapbox://mapbox.satellite",
            "type": "raster",
            "tileSize": 256
        },
        "mapbox://mcwhittemore.ciliwq3lu3oduvamcolpeirb9-0pnzx": {
            "url": "mapbox://mcwhittemore.ciliwq3lu3oduvamcolpeirb9-0pnzx",
            "type": "vector"
        }
    },
    "sprite": "mapbox://sprites/mcwhittemore/ciliwuclu000p9dm3cb6awdpl",
    "glyphs": "mapbox://fonts/mcwhittemore/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "rgb(4,7,14)"
            },
            "interactive": true
        },
        {
            "id": "satellite",
            "type": "raster",
            "source": "satellite",
            "source-layer": "mapbox_satellite_full",
            "paint.temp": {
                "raster-fade-duration": 100
            },
            "paint.contours": {
                "raster-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            11,
                            1
                        ],
                        [
                            12,
                            0.5
                        ]
                    ]
                }
            },
            "interactive": true,
            "paint": {
                "raster-brightness-max": 0.8,
                "raster-contrast": 0,
                "raster-saturation": 0.5
            }
        },
        {
            "interactive": true,
            "paint.temp": {
                "text-opacity": 0
            },
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "uppercase",
                "text-max-width": 4,
                "text-letter-spacing": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            0
                        ],
                        [
                            6,
                            0.2
                        ]
                    ]
                },
                "text-padding": 0,
                "text-size": {
                    "stops": [
                        [
                            2,
                            8
                        ],
                        [
                            8,
                            20
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444856567853.8965"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    5
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_small",
            "paint": {
                "text-color": "hsl(289, 100%, 8%)",
                "text-opacity": 0.65,
                "text-halo-color": "black",
                "text-halo-width": 0
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "paint.temp": {
                "text-opacity": 0
            },
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "uppercase",
                "text-max-width": 4,
                "text-letter-spacing": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            0
                        ],
                        [
                            6,
                            0.2
                        ]
                    ]
                },
                "text-padding": 0,
                "text-allow-overlap": true,
                "text-size": {
                    "stops": [
                        [
                            2,
                            8
                        ],
                        [
                            6,
                            20
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444856567853.8965"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "in",
                    "scalerank",
                    2,
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_medium",
            "paint": {
                "text-color": "hsl(289, 100%, 8%)",
                "text-opacity": 0.65,
                "text-halo-color": "black",
                "text-halo-width": 0
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "paint.temp": {
                "text-opacity": 0
            },
            "layout": {
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "uppercase",
                "text-max-width": 4,
                "text-letter-spacing": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            0
                        ],
                        [
                            2,
                            0.2
                        ]
                    ]
                },
                "text-padding": 0,
                "text-size": {
                    "stops": [
                        [
                            2,
                            12
                        ],
                        [
                            6,
                            25
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444856567853.8965"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_large",
            "paint": {
                "text-color": "hsl(289, 100%, 8%)",
                "text-opacity": 0.65,
                "text-halo-color": "black",
                "text-halo-width": 0
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "paint.temp": {
                "line-opacity": 0
            },
            "layout": {
                "line-join": "bevel",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444857009211.682"
            },
            "filter": [
                "all",
                [
                    ">=",
                    "admin_level",
                    3
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "province_border",
            "paint": {
                "line-color": "#000",
                "line-dasharray": [
                    1,
                    0
                ],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            3,
                            1
                        ],
                        [
                            12,
                            3
                        ]
                    ]
                },
                "line-opacity": {
                    "stops": [
                        [
                            1,
                            0
                        ],
                        [
                            3.5,
                            0.25
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "paint.temp": {
                "line-opacity": 0
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444857009211.682"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "disputed",
                    0
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "country_border",
            "paint": {
                "line-color": "black",
                "line-width": {
                    "base": 1.25,
                    "stops": [
                        [
                            4,
                            1
                        ],
                        [
                            16,
                            5
                        ]
                    ]
                },
                "line-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            0
                        ],
                        [
                            4,
                            0.7
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "paint.temp": {
                "line-opacity": 0
            },
            "minzoom": 5,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444857009211.682"
            },
            "filter": [
                "==",
                "maritime",
                1
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_maritime",
            "paint": {
                "line-color": "#79d3e3",
                "line-opacity": 0.5,
                "line-dasharray": [
                    0,
                    2.5
                ],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            3
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "layout": {
                "visibility": "visible"
            },
            "metadata": {},
            "type": "circle",
            "source": "mapbox://mcwhittemore.ciliwq3lu3oduvamcolpeirb9-0pnzx",
            "id": "dot-glow",
            "paint": {
                "circle-color": "hsl(268, 49%, 81%)",
                "circle-radius": {
                    "base": 1.06,
                    "stops": [
                        [
                            0,
                            6
                        ],
                        [
                            22,
                            31
                        ]
                    ]
                }
            },
            "source-layer": "women-in-space",
            "interactive": true
        },
        {
            "id": "women-in-space",
            "paint": {
                "circle-color": "hsl(268, 87%, 40%)",
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
            "interactive": true,
            "ref": "dot-glow"
        }
    ],
    "created": "2016-03-08T04:22:17.776Z",
    "id": "ciliwuclu000p9dm3cb6awdpl",
    "modified": "2016-03-08T04:37:30.130Z",
    "owner": "mcwhittemore",
    "draft": false
});
