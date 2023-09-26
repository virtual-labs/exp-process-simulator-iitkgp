/* This  script file is edited by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/



jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
                var o = instance.getOffset(el, true),
                    o2 = instance.getOffset(el),
                    s = jsPlumb.getSize(el),
                    pxy = [e.pageX || e.clientX, e.pageY || e.clientY],
                    c = [pxy[0] - (o.left + (s[0] / 2)), pxy[1] - (o.top + (s[1] / 2))],
                    oo = [c[0] / s[0], c[1] / s[1]],
                    DIST = 350,
                    l = o2.left + (oo[0] * DIST),
                    t = o2.top + (oo[1] * DIST);

                var id = el.getAttribute("id");
                instance.animate(el, {left: l, top: t}, { duration: 350, easing: 'easeOutBack' });
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
	// for all live red connection//
        endpoint = {
            anchors: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 8, stroke: "#C50806" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 100,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint);
					},
					
			
					
			

	endpoint_ground = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 10, stroke: "black" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_ground = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_ground);
					},
					
					

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 162;
            var x = (0.2 * w) + Math.floor(Math.random() * (0.5 * w));
            var y = (0.2 * h) + Math.floor(Math.random() * (0.6 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "./images/littledot.png" } ],
        Connector: [ "Bezier", { curviness:-80 } ],
        Container: "canvas"
    });
	
	
	
	/*jsPlumb.connect({ 
  sourceId:"bd3",
  targetId:"bd5",
  connector: [ "Bezier", { curviness:175 } ],
  paintStyle:{ lineWidth:25, strokeStyle:'yellow' }
});*/

	
	
	
	
	
	

    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("bd1"),            
            e2 = prepare("bd2"),
			e3 = prepare("bd3"),
            e4 = prepare("bd4"),
			e5 = prepare("bd5"),
			e6 = prepare("bd6"),
			e7 = prepare("bd7"),            
            e8 = prepare("bd8"),
			e9 = prepare("bd9"),
            e10 = prepare("bd10"),
			e11= prepare("bd11"),
			e12= prepare("bd12"),
			e13 = prepare("bd13"),            
            e14 = prepare("bd14"),
			e15 = prepare("bd15"),
            e16 = prepare("bd16"),
			e17 = prepare("bd17"),
			e18 = prepare("bd18"),
			e19 = prepare("bd19"),            
            e20 = prepare("bd20"),
			e21 = prepare("bd21"),
            e22= prepare("bd22"),
			e23= prepare("bd23"),
			e24= prepare("bd24"),
			e25 = prepare("bd25"),            
            e26 = prepare("bd26"),
			e27 = prepare("bd27"),
            e28 = prepare("bd28"),
			e29 = prepare("bd29"),
			e30 = prepare("bd30"),
			e31 = prepare("bd31"),
            e32 = prepare("bd32"),           
           	e33 = prepare("bd33"),	
            e34 = prepare("bd34"),
			e35 = prepare("bd35"),
			e36 = prepare("bd36"),
			e37 = prepare("bd37"),
			e38 = prepare("bd38"),
			e39 = prepare("bd39"),
			e40 = prepare("bd40"),
			e41 = prepare("bd41");
			e42 = prepare("bd42");
			e43 = prepare_ground("bd43");
			e44 = prepare("bd44");
			e45 = prepare("bd45");
			e46 = prepare_ground("bd46");
			
            // instance.connect({ source: e5, target: e6 });
			 
			 //delete clicked connection
      instance.bind("click", function (conn, originalEvent) {
		  
           if ( confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {////for clicking on a connection
               instance.deleteConnection(conn);			  
			         }
       }); 
		
  

   


    });
	
	
      document.getElementById("check").addEventListener("click", function () {
        var correct_connections_2_7 = [
            {
                "source": "bd2",
                "target": "bd7"
            },

            {
                "source": "bd7",
                "target": "bd2"
            }
        ];

        var correct_connections_8_9 = [
            {
                "source": "bd8",
                "target": "bd9"
            },

            {
                "source": "bd9",
                "target": "bd8"
            }
        ];        

        var correct_connections_10_11 = [
            {
                "source": "bd10",
                "target": "bd11"
            },
    
            {
                "source": "bd11",
                "target": "bd10"
            }
        ];

        var correct_connections_12_13 = [
            {
                "source": "bd12",
                "target": "bd13"
            },

            {
                "source": "bd13",
                "target": "bd12"
            }
        ];

        var correct_connections_21_22 = [
            {
                "source": "bd21",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd21"
            }
        ];
        
		var correct_connections_23_24 = [
            {
                "source": "bd23",
                "target": "bd24"
            },

            {
                "source": "bd24",
                "target": "bd23"
            }
        ];
		var correct_connections_37_38 = [
            {
                "source": "bd37",
                "target": "bd38"
            },

            {
                "source": "bd38",
                "target": "bd37"
            }
        ];
		var correct_connections_39_40 = [
            {
                "source": "bd39",
                "target": "bd40"
            },

            {
                "source": "bd40",
                "target": "bd39"
            }
        ];
		
		var correct_connections_28_29 = [
            {
                "source": "bd28",
                "target": "bd29"
            },

            {
                "source": "bd29",
                "target": "bd28"
            }
        ];
		var correct_connections_25_26 = [
            {
                "source": "bd25",
                "target": "bd26"
            },

            {
                "source": "bd26",
                "target": "bd25"
            }
        ];
		
		var correct_connections_23_42 = [
            {
                "source": "bd23",
                "target": "bd42"
            },

            {
                "source": "bd42",
                "target": "bd23"
            }
        ];
		var correct_connections_44_42 = [
            {
                "source": "bd44",
                "target": "bd42"
            },

            {
                "source": "bd42",
                "target": "bd44"
            }
        ];
		var correct_connections_46_25 = [
            {
                "source": "bd46",
                "target": "bd25"
            },

            {
                "source": "bd25",
                "target": "bd46"
            }
        ];
		
		var correct_connections_46_43 = [
            {
                "source": "bd46",
                "target": "bd43"
            },

            {
                "source": "bd43",
                "target": "bd46"
            }
        ];
		
		var correct_connections_32_35 = [
            {
                "source": "bd32",
                "target": "bd35"
            },

            {
                "source": "bd35",
                "target": "bd32"
            }
        ];
		
		var correct_connections_30_31 = [
            {
                "source": "bd30",
                "target": "bd31"
            },

            {
                "source": "bd31",
                "target": "bd30"
            }
        ];
		
		var correct_connections_33_36 = [
            {
                "source": "bd33",
                "target": "bd36"
            },

            {
                "source": "bd36",
                "target": "bd33"
            }
        ];
		
		var correct_connections_45_22 = [///o/p
            {
                "source": "bd45",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd45"
            }
        ];
		
		var correct_connections_45_27 = [///deviation
            {
                "source": "bd45",
                "target": "bd27"
            },

            {
                "source": "bd27",
                "target": "bd45"
            }
        ];
		
		
		
		       //a connection outside this will invalidate the circuit
        var allowed_connections = [
            {
                "source": "bd2",
                "target": "bd7"
            },
    
            {
                "source": "bd7",
                "target": "bd2"
            },
            
            {
                "source": "bd8",
                "target": "bd9"
            },

            {
                "source": "bd9",
                "target": "bd8"
            },

            {
                "source": "bd10",
                "target": "bd11"
            },
    
            {
                "source": "bd11",
                "target": "bd10"
            },
			
			{
                "source": "bd12",
                "target": "bd13"
            },

            {
                "source": "bd13",
                "target": "bd12"
            },
			
            {
                "source": "bd21",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd21"
            },
			
			{
                "source": "bd23",
                "target": "bd24"
            },

            {
                "source": "bd24",
                "target": "bd23"
            },
			{
                "source": "bd37",
                "target": "bd38"
            },

            {
                "source": "bd38",
                "target": "bd37"
            },
			
			{
                "source": "bd39",
                "target": "bd40"
            },

            {
                "source": "bd40",
                "target": "bd39"
            },
			
			{
                "source": "bd28",
                "target": "bd29"
            },

            {
                "source": "bd29",
                "target": "bd28"
            },
			{
                "source": "bd25",
                "target": "bd26"
            },

            {
                "source": "bd26",
                "target": "bd25"
            },
			
			{
                "source": "bd23",
                "target": "bd42"
            },

            {
                "source": "bd42",
                "target": "bd23"
            },
			
			{
                "source": "bd44",
                "target": "bd42"
            },

            {
                "source": "bd42",
                "target": "bd44"
            },
			{
                "source": "bd46",
                "target": "bd25"
            },

            {
                "source": "bd46",
                "target": "bd43"
            },
			
			{
                "source": "bd32",
                "target": "bd35"
            },

            {
                "source": "bd35",
                "target": "bd32"
            },
			
			{
                "source": "bd30",
                "target": "bd31"
            },

            {
                "source": "bd31",
                "target": "bd30"
            },
			
			{
                "source": "bd33",
                "target": "bd36"
            },

            {
                "source": "bd36",
                "target": "bd33"
            },
			
			{
                "source": "bd45",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd45"
            },
			
			{
                "source": "bd45",
                "target": "bd27"
            },

            {
                "source": "bd27",
                "target": "bd45"
            },
			 
        ];

        var actual_connections = instance.getAllConnections();

				var is_connected_2_7 = false;
				var is_connected_8_9 = false;
				var is_connected_10_11 = false;
				var is_connected_12_13 = false;
				var is_connected_21_22 = false;
				var is_connected_23_24 = false;
				var is_connected_37_38 = false;
				var is_connected_39_40 = false;
				var is_connected_28_29 = false;
				var is_connected_25_26 = false;
				var is_connected_23_42 = false;
				var is_connected_44_42 = false;
				var is_connected_46_43 = false;
				var is_connected_46_25 = false;

				var is_connected_32_35 = false;///P
				var is_connected_30_31 = false;///P-I
				var is_connected_33_36 = false;///p-I-D
				
				var is_connected_45_22 = false;///o/p curve
				var is_connected_45_27 = false;/// Deviation
				
				
        var unallowed_connection_present = false;
        var count =0; // counts number of connection


        actual_connections.forEach(function (connection) {
            count++;
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_2_7){
                is_connected_2_7 = correct_connections_2_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

            if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return (conn.source === this_connection.source && conn.target === this_connection.target);
                }));
            }
            // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false

        });

        //checking for 3_7 connection
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_8_9){
                is_connected_8_9 = correct_connections_8_9.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_10_11){
                is_connected_10_11 = correct_connections_10_11.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_12_13){
                is_connected_12_13 = correct_connections_12_13.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_21_22){
                is_connected_21_22 = correct_connections_21_22.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_23_24){
                is_connected_23_24 = correct_connections_23_24.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_37_38){
                is_connected_37_38 = correct_connections_37_38.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
	actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_39_40){
                is_connected_39_40 = correct_connections_39_40.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_28_29){
                is_connected_28_29 = correct_connections_28_29.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_25_26){
                is_connected_25_26 = correct_connections_25_26.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_23_42){
                is_connected_23_42 = correct_connections_23_42.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_44_42){
                is_connected_44_42 = correct_connections_44_42.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_46_43){
                is_connected_46_43 = correct_connections_46_43.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_46_25){
                is_connected_46_25 = correct_connections_46_25.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_32_35){
                is_connected_32_35 = correct_connections_32_35.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
					var this_connection = {
						"source": connection.sourceId,
						"target": connection.targetId
					};

					if(!is_connected_30_31){
						is_connected_30_31 = correct_connections_30_31.find(function (conn) {
							return conn.source === this_connection.source && conn.target === this_connection.target;
						});
					}
					  // if this_connection exists in correct_connections
					// remove this connection from correct ones
					// continue
					// else
					// return false
				});

		actual_connections.forEach(function (connection) {
					var this_connection = {
						"source": connection.sourceId,
						"target": connection.targetId
					};

					if(!is_connected_33_36){
						is_connected_33_36 = correct_connections_33_36.find(function (conn) {
							return conn.source === this_connection.source && conn.target === this_connection.target;
						});
					}
					  // if this_connection exists in correct_connections
					// remove this connection from correct ones
					// continue
					// else
					// return false
				});
				
				actual_connections.forEach(function (connection) {
					var this_connection = {
						"source": connection.sourceId,
						"target": connection.targetId
					};

					if(!is_connected_45_22){
						is_connected_45_22 = correct_connections_45_22.find(function (conn) {
							return conn.source === this_connection.source && conn.target === this_connection.target;
						});
					}
					  // if this_connection exists in correct_connections
					// remove this connection from correct ones
					// continue
					// else
					// return false
				});
		
		actual_connections.forEach(function (connection) {
					var this_connection = {
						"source": connection.sourceId,
						"target": connection.targetId
					};

					if(!is_connected_45_27){
						is_connected_45_27 = correct_connections_45_27.find(function (conn) {
							return conn.source === this_connection.source && conn.target === this_connection.target;
						});
					}
					  // if this_connection exists in correct_connections
					// remove this connection from correct ones
					// continue
					// else
					// return false
				});
		
			///output signal	
		///P-Control
        if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_22 && is_connected_32_35 &&!is_connected_30_31 &&!is_connected_33_36 && !unallowed_connection_present ) {
			            
			document.getElementById('controllerchk').value = 1;
			alert('Right Connection\nP-Control');
			document.getElementById("onff").disabled = false;
			document. getElementById('sv').removeAttribute('readonly');
			document. getElementById('pv').removeAttribute('readonly');
           }
		   ///P-I Control
	else if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_22 &&  is_connected_32_35 && is_connected_30_31 &&!is_connected_33_36 &&!unallowed_connection_present ) {
		       
			   document.getElementById('controllerchk').value = 2;
			   alert('Right Connection\nP-I Control');
               document.getElementById("onff").disabled = false; 
			   document. getElementById('sv').removeAttribute('readonly');
				document. getElementById('pv').removeAttribute('readonly');
            }  
			
			///P-I-D Control
			else if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_22 && is_connected_32_35 &&  is_connected_30_31 &&  is_connected_33_36 && !unallowed_connection_present ) {
		       
			   document.getElementById('controllerchk').value = 3;
			   alert('Right Connection\nP-I-D Control\n Set Proportional band to 50%, Integral time to 2 and Derivative time to 2');
               document.getElementById("onff").disabled = false;
				document. getElementById('sv').removeAttribute('readonly');
				document. getElementById('pv').removeAttribute('readonly');			   
            }
			
		///deviation signal	
			
		///P-Control
    else if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_27 && is_connected_32_35 &&!is_connected_30_31 &&!is_connected_33_36 && !unallowed_connection_present ) {
			            
			document.getElementById('controllerchk').value = 4;
			alert('Right Connection\nP-Control');
			document.getElementById("onff").disabled = false;
			document. getElementById('sv').setAttribute('readonly','true');
			document. getElementById('pv').setAttribute('readonly','true');
			
           }
		   ///P-I Control
	else if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_27 &&  is_connected_32_35 && is_connected_30_31 &&!is_connected_33_36 &&!unallowed_connection_present ) {
		       
			   document.getElementById('controllerchk').value = 5;
			   alert('Right Connection\nP-I Control');
               document.getElementById("onff").disabled = false; 
			   document. getElementById('sv').setAttribute('readonly','true');
			document. getElementById('pv').setAttribute('readonly','true');
            }  
			
			///P-I-D Control
			else if (is_connected_46_25 && is_connected_46_43 && is_connected_44_42 && is_connected_23_42 && is_connected_25_26 && is_connected_28_29 && is_connected_39_40 && is_connected_37_38 && is_connected_23_24 && is_connected_21_22 && is_connected_12_13 && is_connected_10_11 && is_connected_8_9 && is_connected_2_7 && is_connected_45_27 && is_connected_32_35 &&  is_connected_30_31 &&  is_connected_33_36 && !unallowed_connection_present ) {
		       
			   document.getElementById('controllerchk').value = 6;
			   alert('Right Connection\nP-I-D Control\n Set Proportional band to 50%, Integral time to 2 and Derivative time to 2');
               document.getElementById("onff").disabled = false; 
			   document. getElementById('sv').setAttribute('readonly','true');
			document. getElementById('pv').setAttribute('readonly','true');
            }	
			
			
		else{
			
		alert('Connect the circuit properly following the instructions')	
		document.getElementById("onff").disabled = true;	
			
		}	
		

    });
});


	
	
	
	
	
	
	
	
	
	
	
	
	
	







