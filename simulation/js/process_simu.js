 
   /* This HTML page and script files are developed by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/ 



///////////oscilloscope and Function generator VARIABLES GLOBAL/////////////////////////////////////////////////////////////	
var canvas,ctx;
var flag;
var axes = {};
var vmaxs;  //in volt
var tmaxs; // in msec  0.001; //in sec
var voltperdiv,timeperdiv,peak,ss;	

var vp;
var posy1;
var posy2;
var phsl;
var frqfng;



//////////////////////////////////////OSCILLOSCOPE AND Function GENERATOR KNOBS//////////////////////////////////////////////

$(document).ready(function () {
//------------------------------knob of frequency(hz)----------------------//
    $("#fq-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min: 0.1,
        max: 5,
        step: 0.1,
		angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
    //-----------------------knob of amplitude(volt)-------------------------------//
    $("#amp-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
       width: 100,
        height: 80,
        // cursor: pointer,
        min: 1,
        max: 10,
        step: 1,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
	
	
//-----------------------knob of amplitude1(vmax/div)-------------------------------//
    $("#amp-knob1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.01,
        max: 5,
        step: 0.01,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            
          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}
    });
    //-----------------------knob of amplitude2(vmax/div)-------------------------------//
    $("#amp-knob2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.5,
        max: 5,
        step: 0.5,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
	
	 $("#fq-knob").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:100,
        max:1000,
        step:100,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsqr();
				
            }
            if (flag == 2) {
				drawsqrout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}
    });
	
	$("#positiony1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
	$("#positiony2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
});	


///////////////////OSCILLOSCOPE SWITCH ON-OFF///////////////////////////////////
	
function mainswt() {
    var bttn = document.getElementById('onff').value;
	
	
    if (bttn == "Off") {

        document.getElementById("onff").value = "On";
		var canvas = document.getElementById('mycanvas');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.getElementById("sqr").disabled = true;
        document.getElementById("sqrout").disabled = true;
		
        document.getElementById("in").disabled = true;
        document.getElementById("out").disabled = true;
        document.getElementById("inout").disabled = true;
        	
        //document.getElementById("clear").disabled = false;
		document.getElementById('onff').classList.remove("btn-sucess");
        document.getElementById('onff').classList.add("btn-danger");
		
		document.getElementById('knob1').style['pointer-events'] = "none";
		document.getElementById('knob2').style['pointer-events'] = "none";
		document.getElementById('knob3').style['pointer-events'] = "none";
        		
        }
    else {
        document.getElementById("onff").value = "Off";
        document.getElementById("sqr").disabled = false;
        document.getElementById("sqrout").disabled = true; 
		
        document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
		
		//document.getElementById("clear").disabled = true;
		document.getElementById('onff').classList.remove("btn-danger");
		document.getElementById('onff').classList.add("btn-success");
		
		document.getElementById('knob1').style['pointer-events'] = "auto";
		document.getElementById('knob2').style['pointer-events'] = "auto";
		document.getElementById('knob3').style['pointer-events'] = "auto";
		
        drawAxis();
        drawGrid(ctx);

    }
}

////////////////////////////////////OSCILLOSCOPE GRID DRAW///////////////////////////////////////
function drawAxis() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

   voltperdiv1 = document.getElementById("amp-knob1").value;
   vmaxs1 = parseFloat(voltperdiv1)*4;//volt 
  voltperdiv2 = document.getElementById("amp-knob2").value;
  vmaxs2 = parseFloat(voltperdiv2)*4;//volt 

    axes.x0 = 0.5 + 0.0 * canvas.width;//260.5
    axes.y0 = 0.5 + 0.5 * canvas.height;//175.5
    // axes.scale = 50;
    axes.xscale = (canvas.width) / ( tmaxs); 	// x pix per s//260000
   
    axes.N = 101;
     if(flag==1){
          axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
     }
     if(flag==2){
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    if(flag==3){
         axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    axes.doNegativeX = true;
    ctx.lineWidth = 0.5;
    ctx.lineWidth = ticklinewidth;
    ctx.strokeStyle = tickcolor;

    drawHorizontalAxis();
    drawVerticalAxis();
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
}

function drawGrid(ctx) {

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.beginPath();//added afterwards
    for (var x = 0; x < w; x += 43.5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (var y = 0; y < h; y += 44) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "Gainsboro";
    ctx.stroke();
}

var axismargin = 30,
        axisorigin = {x: 0, y: 0},
        axisright = 520,
        horzntickspcng = 9,
        vrtcltickspcng = 9,
        axiswidth = axisright, //520
        axisheight = axisorigin.y, //350
        numofvrtcltick = axisheight / vrtcltickspcng, //175
        numofhorzntick = axiswidth / horzntickspcng, //57.77777777777778
        tickwidth = 10,
        ticklinewidth = 0.5,
        tickcolor = 'black',
        axislinewidth = 1.0,
        axiscolor = 'lightgray';
//alert(numofvrtcltick);
//------------------------------------------------------Horizontal Axis----------------------------------------------------------------------------------//
function drawHorizontalAxis() {
//axes.y0=175.5,w=520
    var y0 = axes.y0, w = ctx.canvas.width;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.stroke();

}
//------------------------------------------------------Vertical Axis------------------------------------------------------------------------------------//          
function drawVerticalAxis() {
//axes.x0=260.5,h=350
    var x0 = axes.x0+218, h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();

}
//-------------------------------------------------------Vertical Ticks--------------------------------------------------------------------------------//         
function drawVerticalAxisTicks() {
    var deltaX;//5

    for (var i = 1; i < 43; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaX = tickwidth / 3;
        else
            deltaX = tickwidth / 3;

        ctx.moveTo(axisorigin.x + 218 - deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);

        ctx.lineTo(axisorigin.x + 218 + deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);
        ctx.stroke();

    }
}
//-------------------------------------------------------Horizontal Ticks----------------------------------------------------------------------------------//     
function drawHorizontalAxisTicks() {
    var deltaY;//5

    for (var i = 1; i < numofhorzntick; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaY = tickwidth / 3;
        else
            deltaY = tickwidth / 3;

        ctx.moveTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 - deltaY);

        ctx.lineTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 + deltaY);

        ctx.stroke();
    }

}

//////////////////////////OSCILLOSCOPE SIGNAL POSITIONNING FOR INPUT SQUARE WAVE APPLICABLE TO ALL CONTROLLERS///////////////////////////	
	
//----------------------------------------Channel 1------------------------------------------------------------//

function posiy1chnge() {
    posy1 = document.getElementById("positiony1").value;
    if (flag == 1) {
        drawsqr();
    }
   if (flag == 2) {
        drawsquare();
    } 
}

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
           drawsquare();
    }
 
}

function ampfng() {
    vp = document.getElementById("amp-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
          drawsquare();
    }
if(flag==3){
        bthdrc();
    }
    if(flag==4){
       grndrc();
    }
    
}

function freqfng() {
    frqfng = document.getElementById("fq-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
          drawsquare();
    }

   if(flag==3){
        bthdrc();
    }
    if(flag==4){
       grndrc();
    }
}

///////////////////////////////////////////SQUARE WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square wave--------------------------------------------------//
function drawsqr() {
    canvas = document.getElementById("mycanvas");
	//document.getElementById('fq-knob-fng').value = "15400";
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 document.getElementById("sqrout").disabled = false;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
    sqrwv();
	
}

function sqrwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vp/2) * Math.sign( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
		
		
		//console.log('i/p ='+y[i]);
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


///////////////////////////////////////////SQUARE OUTPUT WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square output wave--------------------------------------------------//
function drawsqrout() {
    canvas = document.getElementById("mycanvas");
	if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 ;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	///now check which control is applied and how much are the kp ki kd values,acc to that output will be shown///
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==50 ){
	P_pb50();	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==200 ){
	P_pb200();	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==100 ){
	P_pb100();	
	}
    if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==30 ){
	P_pb30();	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==5 ){
	P_pb5();	
	}
	
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==2 ){
	PI_2();	
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==5 ){
	PI_5();	
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==10 ){
	PI_10();	
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==25 ){
	PI_25();	
	}
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	PID_2();	
	}
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	PID_1();	
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==50 ){
	deviation_P50();	
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==200 ){
	deviation_P200();	
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==100 ){
	deviation_P100();	
	}
    if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==30 ){
	deviation_P30();	
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==5 ){
	deviation_P5();	
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==2 ){
	deviation_PI2();	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==5 ){
	deviation_PI5();	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==10 ){
	deviation_PI10();	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==25 ){
	deviation_PI25();	
	}
	
	
	///PID
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	deviation_PID2();	
	}
	
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	deviation_PID1();	
	}
	
}
///Channel-2
function channel2() {
    canvas = document.getElementById("mycanvas");
	if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 ;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	///now check which control is applied and how much are the kp ki kd values,acc to that output will be shown///
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==50 ){
	P_pb50();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==200 ){
	P_pb200();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==100 ){
	P_pb100();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
    if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==30 ){
	P_pb30();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==5 ){
	P_pb5();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==2 ){
	PI_2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==5 ){
	PI_5();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==10 ){
	PI_10();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==25 ){
	PI_25();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	PID_2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	PID_1();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==50 ){
	deviation_P50();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==200 ){
	deviation_P200();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==100 ){
	deviation_P100();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
    if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==30 ){
	deviation_P30();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==5 ){
	deviation_P5();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==2 ){
	deviation_PI2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==5 ){
	deviation_PI5();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==10 ){
	deviation_PI10();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==25 ){
	deviation_PI25();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	
	///PID
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	deviation_PID2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	deviation_PID1();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////
var dataOPPoints=[];
///////////////////////////////////////////P CONTROLLERS//////////////////////////////////////////////////////////
function P_pb50() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	/*var zeta = 0.4;
	var wn = 0.5;
	
	
	for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        //y[i] = (vp/2) * Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180);
		y[i] = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*i))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*i)+Math.acos(zeta)))));
	dataOPPoints.push({x:(i), y:(y[i])});
    }*/
	
	
    // create function 
    for (var t = 0; t < (axes.N/2); t++) {
		
	var a = math.complex(0.0000250833, math.multiply(-8.11755,math.pow(10,-6)));
	var b = math.complex(-43.4714,-134.327);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000501667;
	
	var e = math.complex(0.810394,0.585885);	
	var f = math.complex(0,268.654);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,13289.03178642,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	  
	  measured = yop;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var a = math.complex(0.0000250833, math.multiply(-8.11755,math.pow(10,-6)));
	var b = math.complex(-43.4714,-134.327);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000501667;
	
	var e = math.complex(0.810394,0.585885);	
	var f = math.complex(0,268.654);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,13289.03178642,j).re;
		
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function P_pb200() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	var measured;

/////for 200% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.0000501667, -0.0000242657);
	var b = math.complex(-43.4714,-89.8722);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.000100333;
	
	var e = math.complex(0.620788,0.783978);	
	var f = math.complex(0,179.744);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,3322.257946605,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	 
	 
	measured = yop;
		  
	dataOPPoints.push({x:(t), y:(y[t])});
		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var a = math.complex(0.0000501667, -0.0000242657);
	var b = math.complex(-43.4714,-89.8722);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.000100333;
	
	var e = math.complex(0.620788,0.783978);	
	var f = math.complex(0,179.744);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,3322.257946605,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	  
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function P_pb100() {///basically plant identification

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	var  measured;

/////for 100% band PB,kp=1 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.000037625,-0.0000153194);
	var b = math.complex(-43.4714,-106.767);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.00007525;
	
	var e = math.complex(0.715591,0.698519);	
	var f = math.complex(0,213.535);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,6644.51589321,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	 
	 
	measured = yop;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var a = math.complex(0.000037625,-0.0000153194);
	var b = math.complex(-43.4714,-106.767);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.00007525;
	
	var e = math.complex(0.715591,0.698519);	
	var f = math.complex(0,213.535);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(33222.6,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
  	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function P_pb30() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	var  measured;

/////for 30% band PB,kp=3.33 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.0000173788,math.multiply(-4.60786,math.pow(10,-6)));
	var b = math.complex(-43.4714,-163.954);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000347575;
	
	var e = math.complex(0.868633,0.495456);	
	var f = math.complex(0,327.908);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,22126.237924389,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	measured = yop;
	 	  
	  
	dataOPPoints.push({x:(t), y:(y[t])});
		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var a = math.complex(0.0000173788,math.multiply(-4.60786,math.pow(10,-6)));
	var b = math.complex(-43.4714,-163.954);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000347575;
	
	var e = math.complex(0.868633,0.495456);	
	var f = math.complex(0,327.908);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,22126.237924389,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function P_pb5() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	var  measured;

/////for 5% band PB,kp=20 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(math.multiply(3.58333,math.pow(10,-6)),math.multiply(-4.19866,math.pow(10,-7)));
	var b = math.complex(-43.4714,-371.005);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = math.multiply(7.16667,math.pow(10,-6));
	
	var e = math.complex(0.972913,0.23117);	
	var f = math.complex(0,742.001);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,132890.3178642,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2*Math.sin(2*Math.PI*16.66*t);
	measured = yop;
	 
	dataOPPoints.push({x:(t), y:(y[t])});	
		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var a = math.complex(math.multiply(3.58333,math.pow(10,-6)),math.multiply(-4.19866,math.pow(10,-7)));
	var b = math.complex(-43.4714,-371.005);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = math.multiply(7.16667,math.pow(10,-6));
	
	var e = math.complex(0.972913,0.23117);	
	var f = math.complex(0,742.001);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,132890.3178642,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2*Math.sin(2*Math.PI*16.66*t);
	
	console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlarged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

////////////////////////////////////////////////////////////////PI CONTROLLERS,P is fixed to 50% band,i.e. kp=2//////////////////////////////////////////////////////////
function PI_2() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Ti=2,i.e. ki=kp/Ti=1 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.000050233,0.0000162533);
	var c2 = math.complex(-43.3045,-134.273);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.81026,0.586071);
	var c6 = math.complex(0,268.547);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.333818,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000500934,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;
	 
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.000050233,0.0000162533);
	var c2 = math.complex(-43.3045,-134.273);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.81026,0.586071);
	var c6 = math.complex(0,268.547);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.333818,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000500934,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re; 
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


function PI_5() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Ti=5,i.e. ki=kp/Ti=0.4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.0000501813,0.0000162424);
	var c2 = math.complex(-43.4047,-134.306);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810339,0.585961);
	var c6 = math.complex(0,268.611);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.133411,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501375,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;
	 
	dataOPPoints.push({x:(t), y:(y[t])});	
		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.0000501813,0.0000162424);
	var c2 = math.complex(-43.4047,-134.306);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810339,0.585961);
	var c6 = math.complex(0,268.611);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.133411,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501375,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re; 
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec)"
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function PI_10() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Ti=10,i.e. ki=kp/Ti=0.2 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.000050174,0.0000162388);
	var c2 = math.complex(-43.438,-134.316);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810367,0.585923);
	var c6 = math.complex(0,268.633);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.066686,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501521,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;
	 
	dataOPPoints.push({x:(t), y:(y[t])});	
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.000050174,0.0000162388);
	var c2 = math.complex(-43.438,-134.316);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810367,0.585923);
	var c6 = math.complex(0,268.633);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.066686,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501521,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	dataOPPoints.push({x:(t), y:(y[t])});
	}

var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;	

	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function PI_25() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Ti=25,i.e. ki=kp/Ti=0.08 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.0000501696,0.0000162366);
	var c2 = math.complex(-43.458,-134.323);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810383,0.5859);
	var c6 = math.complex(0,268.646);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.0266698,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501608,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;

	dataOPPoints.push({x:(t), y:(y[t])});	
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.0000501696,0.0000162366);
	var c2 = math.complex(-43.458,-134.323);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810383,0.5859);
	var c6 = math.complex(0,268.646);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.0266698,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501608,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re; 
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	dataOPPoints.push({x:(t), y:(y[t])});
	}


var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;	
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

/////////////////////////////////////////////PB is fixed to 50% i.e. kp=2,Ti is fixed to 2 i.e. ki=1//////////////////////
function PID_2() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Td=2,i.e. kd=kp*Td=4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(math.multiply(-2.42558,math.pow(10,-7)),0.000056397);
	var c2 = math.complex(-0.373783,-0.330875);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(-0.999963,0.00860164);
	var c6 = math.complex(0,661749);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-26664.3,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.000150015,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(math.multiply(-2.42558,math.pow(10,-7)),0.000056397);
	var c2 = math.complex(-0.373783,-0.330875);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(-0.999963,0.00860164);
	var c6 = math.complex(0,661749);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-26664.3,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.000150015,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	//dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


function PID_1() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop; 
	var  measured;

/////for Td=1,i.e. kd=kp*Td=2 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var d1 = math.multiply(-0.000149544,math.pow(math.e,math.multiply(-13374.5,t)));
	var d2 = math.multiply(0.000152601,math.pow(math.e,math.multiply(-0.987061,t)));
	var d3 = math.multiply(-0.000153557,math.pow(math.e,math.multiply(-0.503318,t)));
	
	var d4 = math.multiply(vp,6644.51589321,math.add(0.0001505,d1,d2,d3));
	var output = d4;
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	measured = output;
	  
	dataOPPoints.push({x:(t), y:(y[t])});
	
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var d1 = math.multiply(-0.000149544,math.pow(math.e,math.multiply(-13374.5,t)));
	var d2 = math.multiply(0.000152601,math.pow(math.e,math.multiply(-0.987061,t)));
	var d3 = math.multiply(-0.000153557,math.pow(math.e,math.multiply(-0.503318,t)));
	
	var d4 = math.multiply(vp,6644.51589321,math.add(0.0001505,d1,d2,d3));
	var output = d4;
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	dataOPPoints.push({x:(t), y:(y[t])});
	console.log(output);
	
	//dataOPPoints.push({x:(t), y:(y[t])});
	} 
	
	var sserr = math.subtract(vp,measured);
	document.getElementById('sserr').value = sserr;
	
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Output Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

///////Dual function////////////////

function dual(){	
vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vp/2) * Math.sign( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();	


///now check which control is applied and how much are the kp ki kd values,acc to that output will be shown///
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==50 ){
	P_pb50();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==200 ){
	P_pb200();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==100 ){
	P_pb100();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
    if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==30 ){
	P_pb30();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==1 && document.getElementById('P').value==5 ){
	P_pb5();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==2 ){
	PI_2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==5 ){
	PI_5();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==10 ){
	PI_10();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==2 && document.getElementById('I').value==25 ){
	PI_25();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	PID_2();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}	
	
	if(document.getElementById('controllerchk').value==3 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	PID_1();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==50 ){
	deviation_P50();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==200 ){
	deviation_P200();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==100 ){
	deviation_P100();
    document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
    if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==30 ){
	deviation_P30();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==4 && document.getElementById('P').value==5 ){
	deviation_P5();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==2 ){
	deviation_PI2();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==5 ){
	deviation_PI5();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==10 ){
	deviation_PI10();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	if(document.getElementById('controllerchk').value==5 && document.getElementById('I').value==25 ){
	deviation_PI25();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
	
	///PID
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==2 ){
	deviation_PID2();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
	if(document.getElementById('controllerchk').value==6 && document.getElementById('P').value==50 && document.getElementById('I').value==2 && document.getElementById('D').value==1 ){
	deviation_PID1();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
}

///Deviation 

function deviation_P50(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.0000250833, math.multiply(-8.11755,math.pow(10,-6)));
	var b = math.complex(-43.4714,-134.327);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000501667;
	
	var e = math.complex(0.810394,0.585885);	
	var f = math.complex(0,268.654);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,13289.03178642,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var a = math.complex(0.0000250833, math.multiply(-8.11755,math.pow(10,-6)));
	var b = math.complex(-43.4714,-134.327);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000501667;
	
	var e = math.complex(0.810394,0.585885);	
	var f = math.complex(0,268.654);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,13289.03178642,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
}

function deviation_P100(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	

/////for 100% band PB,kp=1 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.000037625,-0.0000153194);
	var b = math.complex(-43.4714,-106.767);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.00007525;
	
	var e = math.complex(0.715591,0.698519);	
	var f = math.complex(0,213.535);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,6644.51589321,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var a = math.complex(0.000037625,-0.0000153194);
	var b = math.complex(-43.4714,-106.767);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.00007525;
	
	var e = math.complex(0.715591,0.698519);	
	var f = math.complex(0,213.535);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,6644.51589321,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
}



function deviation_P200(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	

/////for 200% band PB,kp=0.5 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.0000501667, -0.0000242657);
	var b = math.complex(-43.4714,-89.8722);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.000100333;
	
	var e = math.complex(0.620788,0.783978);	
	var f = math.complex(0,179.744);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,3322.257946605,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var a = math.complex(0.0000501667, -0.0000242657);
	var b = math.complex(-43.4714,-89.8722);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.000100333;
	
	var e = math.complex(0.620788,0.783978);	
	var f = math.complex(0,179.744);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,3322.257946605,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
}

function deviation_P30(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	

/////for 30% band PB,kp=3.33 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(0.0000173788,math.multiply(-4.60786,math.pow(10,-6)));
	var b = math.complex(-43.4714,-163.954);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000347575;
	
	var e = math.complex(0.868633,0.495456);	
	var f = math.complex(0,327.908);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,22126.237924389,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var a = math.complex(0.0000173788,math.multiply(-4.60786,math.pow(10,-6)));
	var b = math.complex(-43.4714,-163.954);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = 0.0000347575;
	
	var e = math.complex(0.868633,0.495456);	
	var f = math.complex(0,327.908);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,22126.237924389,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
}

function deviation_P5(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,count=50; 
	

/////for 5% band PB,kp=20 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function through wolfarm math model
    for (var t = 0; t < axes.N/2; t++) {
		
	var a = math.complex(math.multiply(3.58333,math.pow(10,-6)),math.multiply(-4.19866,math.pow(10,-7)));
	var b = math.complex(-43.4714,-371.005);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = math.multiply(7.16667,math.pow(10,-6));
	
	var e = math.complex(0.972913,0.23117);	
	var f = math.complex(0,742.001);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,132890.3178642,j).re;


		x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var a = math.complex(math.multiply(3.58333,math.pow(10,-6)),math.multiply(-4.19866,math.pow(10,-7)));
	var b = math.complex(-43.4714,-371.005);
	var c = math.multiply(b,t);
	var d = math.pow(math.e,c);
	var scndcompprt1 = (math.multiply(a,d));
	
	var frstcomp = math.multiply(7.16667,math.pow(10,-6));
	
	var e = math.complex(0.972913,0.23117);	
	var f = math.complex(0,742.001);	
	var g = math.multiply(f,t);	
	var h = math.pow(math.e,g);	
	var scndcompprt2 = math.add(e,h);
	var scndcomp = math.multiply(scndcompprt1,scndcompprt2);	
		
	var j = math.subtract(frstcomp,scndcomp);


	var yop = math.multiply(vp,132890.3178642,j).re;
		
	x[t] = tstart + t * dt;
	 y[t] = (-yop)/2;
	
	
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:5,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
}

///deviation PI

function deviation_PI2() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Ti=2,i.e. ki=kp/Ti=1 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.000050233,0.0000162533);
	var c2 = math.complex(-43.3045,-134.273);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.81026,0.586071);
	var c6 = math.complex(0,268.547);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.333818,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000500934,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.000050233,0.0000162533);
	var c2 = math.complex(-43.3045,-134.273);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.81026,0.586071);
	var c6 = math.complex(0,268.547);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.333818,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000500934,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re; 
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}	

function deviation_PI5() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Ti=5,i.e. ki=kp/Ti=0.4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.0000501813,0.0000162424);
	var c2 = math.complex(-43.4047,-134.306);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810339,0.585961);
	var c6 = math.complex(0,268.611);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.133411,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501375,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.0000501813,0.0000162424);
	var c2 = math.complex(-43.4047,-134.306);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810339,0.585961);
	var c6 = math.complex(0,268.611);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.133411,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501375,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}	

function deviation_PI25() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Ti=25,i.e. ki=kp/Ti=0.4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.0000501696,0.0000162366);
	var c2 = math.complex(-43.458,-134.323);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810383,0.5859);
	var c6 = math.complex(0,268.646);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.0266698,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501608,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.0000501696,0.0000162366);
	var c2 = math.complex(-43.458,-134.323);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810383,0.5859);
	var c6 = math.complex(0,268.646);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.0266698,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501608,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


function deviation_PI10() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Ti=10,i.e. ki=kp/Ti=0.2 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(-0.000050174,0.0000162388);
	var c2 = math.complex(-43.438,-134.316);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810367,0.585923);
	var c6 = math.complex(0,268.633);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.066686,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501521,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 
	var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);		
	} 
	
	for (var t=50; t< axes.N; t++) {
		
	var c1 = math.complex(-0.000050174,0.0000162388);
	var c2 = math.complex(-43.438,-134.316);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(0.810367,0.585923);
	var c6 = math.complex(0,268.633);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-0.066686,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.0000501521,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);	
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec)"
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

///deviation pid

function deviation_PID2() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Td=2,i.e. kd=kp*Td=4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var c1 = math.complex(math.multiply(-2.42558,math.pow(10,-7)),0.000056397);
	var c2 = math.complex(-0.373783,-0.330875);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(-0.999963,0.00860164);
	var c6 = math.complex(0,661749);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-26664.3,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.000150015,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);
		
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var c1 = math.complex(math.multiply(-2.42558,math.pow(10,-7)),0.000056397);
	var c2 = math.complex(-0.373783,-0.330875);
	var c3 = math.multiply(c2,t);
	var c4 = math.pow(math.e,c3);
	var c5 = math.complex(-0.999963,0.00860164);
	var c6 = math.complex(0,661749);
	var c7 = math.multiply(c6,t);
	var c8 = math.pow(math.e,c7);
	var c9 = math.add(c5,c8);
	var c10 = math.multiply(c1,c4,c9);
	
	var c11 = math.multiply(-26664.3,t);
	var c12 = math.pow(math.e,c11);
	var c13 = math.multiply(-0.000150015,c12);
	
	var complexoutput = math.multiply(vp,6644.51589321,math.add(c10,c13,0.0001505));
	var output = complexoutput.re;
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);
	
	//dataOPPoints.push({x:(t), y:(y[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}

function deviation_PID1() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop; 
	

/////for Td=2,i.e. kd=kp*Td=4 /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var t = 0; t < axes.N/2; t++) {
		
	var d1 = math.multiply(-0.000149544,math.pow(math.e,math.multiply(-13374.5,t)));
	var d2 = math.multiply(0.000152601,math.pow(math.e,math.multiply(-0.987061,t)));
	var d3 = math.multiply(-0.000153557,math.pow(math.e,math.multiply(-0.503318,t)));
	
	var d4 = math.multiply(vp,6644.51589321,math.add(0.0001505,d1,d2,d3));
	var output = d4;
	 
	 
	
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((output)/2);
	 
	 var measured = y[t];
	var set = (vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);
		
	} 
	
	for (var t=51; t< axes.N; t++) {
		
	var d1 = math.multiply(-0.000149544,math.pow(math.e,math.multiply(-13374.5,t)));
	var d2 = math.multiply(0.000152601,math.pow(math.e,math.multiply(-0.987061,t)));
	var d3 = math.multiply(-0.000153557,math.pow(math.e,math.multiply(-0.503318,t)));
	
	var d4 = math.multiply(vp,6644.51589321,math.add(0.0001505,d1,d2,d3));
	var output = d4;
	 
	 
	 
	 x[t] = tstart + t * dt;
	 y[t] = parseFloat((-output)/2);
	 
	var measured = y[t];
	var set = (-vp/2);
	devi[t] = (measured-set);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);
	
	//dataOPPoints.push({x:(t), y:(y[t])});
	} 
	///for test plot enlaged view
	document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 	
	var chart = new CanvasJS.Chart("chartContainer",
    {
		zoomEnabled: true,
		 
		  zoomType: "x",
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Deviation Signal Enlarged View (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amp(v)",
			interval: 0.2,
			maximum:6,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	//document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///oscilloscope grid view	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - devi[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}
	
/////////////////////////////////////////////ALL FUNCTIONS FOR ROTATING KNOBS///////////////////////////////////
var angle1= 0,angle2= 0,angle3= 0,angle4= 0,angle5= 0,angle6= 0,angle7= 0,angle8= 0;
function rotate1(){
	
	angle1++;
	var deg = angle1*50;
	//alert(deg);
	var knob1= document.getElementById('knob1');	
	knob1.style.transform="rotate("+deg+"deg)";
	
	if(document.getElementById('P').value==5){
		
	document.getElementById('P').stepUp(25);
	}
	
	else if(document.getElementById('P').value==30){
		
	document.getElementById('P').stepUp(20);	
	}
	
	else if(document.getElementById('P').value==50){
		
	document.getElementById('P').stepUp(50);	
	}
	else if(document.getElementById('P').value==100){
		
	document.getElementById('P').stepUp(100);	
	}    
	   
   if( deg>250){
	alert('This is the highest value, can not rotate knob') ;  
	knob1.style.transform=null; 
	document.getElementById('P').value = 5;
	angle=0;
	return;
   }
    
 }
 function rotate2(){
	
	angle1--;
	var deg = angle1*50;
	//alert(deg);
	var knob1= document.getElementById('knob1');	
	knob1.style.transform="rotate("+deg+"deg)";
	 
	if(document.getElementById('P').value==200){
		
	document.getElementById('P').stepDown(100);	
	}
	
	else if(document.getElementById('P').value==100){
		
	document.getElementById('P').stepDown(50);	
	}
	
	else if(document.getElementById('P').value==50){
		
	document.getElementById('P').stepDown(20);	
	}
	else if(document.getElementById('P').value==30){
		
	document.getElementById('P').stepDown(25);	
	}   
	    
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob1.style.transform=null; 
	
	angle=0;
	return;
   }
    
 }
 function rotate3(){
	
	angle2++;
	var deg = angle2*60;
	//alert(deg);
	var knob2= document.getElementById('knob2');	
	knob2.style.transform="rotate("+deg+"deg)";
	
   if(document.getElementById('I').value==2){
		
	document.getElementById('I').stepUp(3);
	}
	
	else if(document.getElementById('I').value==5){
		
	document.getElementById('I').stepUp(5);	
	}
	
	else if(document.getElementById('I').value==10){
		
	document.getElementById('I').stepUp(15);	
	}
	   
   
   if( deg>180){
	alert('This is the highest value, can not rotate knob') ;  
	knob2.style.transform=null; 
	document.getElementById('I').value = 2;
	angle2=0;
	return;
   }
    
 }
 function rotate4(){
	
	angle2--;
	var deg = angle2*60;
	//alert(deg);
	var knob2= document.getElementById('knob2');	
	knob2.style.transform="rotate("+deg+"deg)";
	
   if(document.getElementById('I').value==25){
		
	document.getElementById('I').stepDown(15);	
	}
	
	else if(document.getElementById('I').value==10){
		
	document.getElementById('I').stepDown(5);	
	}
	
	else if(document.getElementById('I').value==5){
		
	document.getElementById('I').stepDown(3);	
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob2.style.transform=null; 
	
	angle2=0;
	return;
   }
    
 }
 function rotate5(){
	
	angle3++;
	
	var deg = angle3*50;
	//alert(deg);
	var knob3= document.getElementById('knob3');	
	knob3.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('D').stepUp(1);
   
  
   
   if( deg>100){
	alert('This is the highest value, can not rotate knob') ;  
	knob3.style.transform=null; 
	document.getElementById('D').value = 0;
	angle3=0;
	return;
   }
    
 }
 function rotate6(){
	
	angle3--;
	
	var deg = angle3*50;
	//alert(deg);
	var knob3= document.getElementById('knob3');	
	knob3.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('D').stepDown(1);
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob3.style.transform=null; 
	
	angle3=0;
	return;
   }
    
 }

 /*function rotate7(){
	
	angle4++;
	
	var deg = angle4*40;
	//alert(deg);
	var knob3= document.getElementById('knob4');	
	knob3.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('RL').stepUp(1);
   document.getElementById('counterchk').value = "1";
  
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob4.style.transform=null; 
	
	angle4=0;
	return;
   }
    
 }
 function rotate8(){
	
	angle4--;
	
	var deg = angle4*40;
	//alert(deg);
	var knob4= document.getElementById('knob4');	
	knob4.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('RL').stepDown(1);
   document.getElementById('counterchk').value = "2";
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob4.style.transform=null; 
	
	angle4=0;
	return;
   }
    
 }*/

 
 function planton(){
	 
	 if(document.getElementById('pon').src.match("./images/off.png")){
	
	document.getElementById('pon').src = "./images/on.png";	
 }

else if(document.getElementById('pon').src.match("./images/on.png")){
	
	document.getElementById('pon').src = "./images/off.png"; 
	 
 }

 }

function motoron(){
	 
	 if(document.getElementById('mon').src.match("./images/off.png")){
	
	document.getElementById('mon').src = "./images/on.png"; 
	 
 }
 
 else if(document.getElementById('mon').src.match("./images/on.png")){
	
	document.getElementById('mon').src = "./images/off.png"; 
	 
 }

 }

function rron(){
	 
	 if(document.getElementById('rr').src.match("./images/off.png")){
	
	document.getElementById('rr').src = "./images/on.png";  
	
 }

else if(document.getElementById('rr').src.match("./images/on.png")){
	
	document.getElementById('rr').src = "./images/off.png";  
	 
 }

 }


 function rr2on(){
	 
	 if(document.getElementById('rr2').src.match("./images/off.png")){
	
	document.getElementById('rr2').src = "./images/on.png";  
	
 }

else if(document.getElementById('rr2').src.match("./images/on.png")){
	
	document.getElementById('rr2').src = "./images/off.png";  
	 
 }

 }
 
 function li1on(){
	 
	 if(document.getElementById('li1').src.match("./images/off.png")){
	
	document.getElementById('li1').src = "./images/on.png";  
	
 }

else if(document.getElementById('li1').src.match("./images/on.png")){
	
	document.getElementById('li1').src = "./images/off.png";  
	 
 }

 }
 
 function li2on(){
	 
	 if(document.getElementById('li2').src.match("./images/off.png")){
	
	document.getElementById('li2').src = "./images/on.png";  
	
 }

else if(document.getElementById('li2').src.match("./images/on.png")){
	
	document.getElementById('li2').src = "./images/off.png";  
	 
 }

 }
 
 
 
function calc(){
	
peak = document.getElementById('pv').value;
ss   = document.getElementById('sv').value;
	
document.getElementById('ov').value	= math.multiply(math.divide(math.subtract(peak,ss),ss),100);
	
	
}
 
 function clr(){
	 
	document.getElementById('sserr').value = 0;
	document.getElementById('pv').value = 0;
	document.getElementById('sv').value = 0;
	document.getElementById('ov').value = 0;
	dataOPPoints = [];
	document.getElementById('plotbucket').style.display="none";	
document.getElementById('chartContainer').style.display="none";	
	 
	 
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 