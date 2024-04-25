 
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
        max:500,
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

function led(){
	if(document.getElementById('sw').src.match('./images/side_off.png')){
		document.getElementById('sw').src = "./images/side_on.png";
		document.getElementById('led').src = "./images/ledon.png";
	}
	else if(document.getElementById('sw').src.match('./images/side_on.png')){
		document.getElementById('sw').src = "./images/side_off.png";
		document.getElementById('led').src = "./images/ledoff.png";
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
        
    } 
}

function posiy2chnge() {
    posy1 = document.getElementById("positiony1").value;
    if (flag == 1) {
        
    }
   if (flag == 2) {
        drawsqrout();
    } 
}

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
           drawsqrout();
    }
 
}

function ampfng() {
    vp = document.getElementById("amp-knob-fng").value;
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

function freqfng() {
    frqfng = document.getElementById("fq-knob-fng").value;
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
	pointMove();
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
	if(document.getElementById('controllerchk').value==1 ){
	PControl();	
	}
	
	if(document.getElementById('controllerchk').value==2 ){
	PIControl();	
	}
	
	if(document.getElementById('controllerchk').value==3 ){
	PIDControl();	
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 ){
	deviation_P();	
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 ){
	deviation_PI();	
	}
	
	///PID
	if(document.getElementById('controllerchk').value==6 ){
	deviation_PID();	
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
	if(document.getElementById('controllerchk').value==1 ){
	PControl();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	if(document.getElementById('controllerchk').value==2 ){
	PIControl();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	
	if(document.getElementById('controllerchk').value==3 ){
	PIDControl();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 ){
	deviation_P();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 ){
	deviation_PI();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///PID
	if(document.getElementById('controllerchk').value==6 ){
	deviation_PID();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////P CONTROLLERS//////////////////////////////////////////////////////////
function PControl() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;
	var yop=[];
/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	if(document.getElementById('P').value == 50){
	 zeta = 0.4;
	 wn = 138.08;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');	
	}
	if(document.getElementById('P').value == 100){
	 zeta = 0.5;
	 wn = 81.5139;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 200){
	 zeta = 0.6;
	 wn = 139.121;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 30){
	 zeta = 0.2;
	 wn = 101.7044;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 5){
	 zeta = 0;
	 wn = 138.08;
	 document. getElementById('sv').setAttribute('readonly','true');
	document. getElementById('pv').setAttribute('readonly','true');
	}
	
	
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(math.pow(wn,2),math.add(1,kp));
	var s1 = math.multiply(2,zeta,wn);
	var s2 = 1;
	
	var roots = math.polynomialRoot(s0,s1,1);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(vp,kp,math.pow(wn,2));
	
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta)));
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha)));	
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 yop[t] = (math.add(part1,part2,part3)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop[t]/2;
	 
	/*  if(document.getElementById('P').value == 5){
	measured = 9.31;//y[t];
	}
	if(document.getElementById('P').value = 5){
	 measured = yop;
	} */
	measured=yop[t];
	 dataOPPoints.push({x:(t), y:(y[t])}); 
	  
	
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	 yop[t] = (math.add(part1,part2,part3)).re;
	
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop[t])/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	}
	}

if(document.getElementById('P').value == 5){
	  measured = yop[50];
	  }
	 /* if(document.getElementById('P').value != 5){
	  measured = yop[t];
	  } */
	  var diff = math.subtract(measured,vp);
	
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
		
	var sserr = math.abs(math.subtract(vp,measured));
	document.getElementById('sserr').value = sserr;
	
	console.log('measured =' + measured);
	console.log('diff = ' + diff);
	
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
      text: "Output Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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
function PIControl() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	
	zeta = 0.5;
	wn = 81.5139;
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	
	var iValue = document.getElementById('I').value;
	var ki = math.divide(kp,iValue);
	
	
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(ki,math.pow(wn,2));;
	 var s1 = math.add(math.pow(wn,2),kp);
	 var s2 = math.multiply(2,zeta,wn);
	 var s3 = 1;
	
	var roots = math.polynomialRoot(s0,s1,s2,s3);
	var alpha = roots[0];
	var beta = roots[1];
	var gamma = roots[2];
	
	var LHS_A = math.multiply(vp,ki,math.pow(wn,2));
	var LHS_B = math.multiply(vp,math.add(math.multiply(kp,alpha),ki),math.pow(wn,2));
	var LHS_C = math.multiply(vp,math.add(math.multiply(kp,beta),ki),math.pow(wn,2));
	var LHS_D = math.multiply(vp,math.add(math.multiply(kp,gamma),ki),math.pow(wn,2));
	
	var A =  math.divide(LHS_A,math.multiply(math.subtract(0,alpha),math.subtract(0,beta),math.subtract(0,gamma)));
	var B =  math.divide(LHS_B,math.multiply(alpha,math.subtract(alpha,beta),math.subtract(alpha,gamma)));
	var C =  math.divide(LHS_C,math.multiply(beta,math.subtract(beta,alpha),math.subtract(beta,gamma)));
	var D =  math.divide(LHS_D,math.multiply(gamma,math.subtract(gamma,alpha),math.subtract(gamma,beta)));
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop/2;
	  
	  measured = yop;
	  var diff = math.subtract(measured,vp);
	dataOPPoints.push({x:(t), y:(y[t])});
	
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	}
	}	
	var sserr = math.abs(math.subtract(vp,measured));
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
      text: "Output Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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
function PIDControl() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
	var dataOPPoints=[];
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	
	zeta = 0.5;
	wn = 81.5139;
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	
	var iValue = document.getElementById('I').value;
	var ki = math.divide(kp,iValue);
	
	var dValue = document.getElementById('D').value;
	var kd = math.multiply(kp,dValue);
	
	
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(ki,math.pow(wn,2));;
	 var s1 = math.multiply(math.add(1,kp),math.pow(wn,2));
	 var s2 = math.add(math.multiply(2,zeta,wn),math.multiply(kd,math.pow(wn,2)));
	 var s3 = 1;
	
	var roots = math.polynomialRoot(s0,s1,s2,s3);
	var alpha = roots[0];
	var beta = roots[1];
	var gamma = roots[2];
	
	var LHS_A = math.multiply(vp,ki,math.pow(wn,2));
	var LHS_B = math.multiply(vp,math.add(math.multiply(kp,alpha),ki,math.multiply(kd,math.pow(alpha,2))),math.pow(wn,2));
	var LHS_C = math.multiply(vp,math.add(math.multiply(kp,beta),ki,math.multiply(kd,math.pow(beta,2))),math.pow(wn,2));
	var LHS_D = math.multiply(vp,math.add(math.multiply(kp,gamma),ki,math.multiply(kd,math.pow(gamma,2))),math.pow(wn,2));
	
	var A =  math.divide(LHS_A,math.multiply(math.subtract(0,alpha),math.subtract(0,beta),math.subtract(0,gamma)));
	var B =  math.divide(LHS_B,math.multiply(alpha,math.subtract(alpha,beta),math.subtract(alpha,gamma)));
	var C =  math.divide(LHS_C,math.multiply(beta,math.subtract(beta,alpha),math.subtract(beta,gamma)));
	var D =  math.divide(LHS_D,math.multiply(gamma,math.subtract(gamma,alpha),math.subtract(gamma,beta)));
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop/2;
	  
	  measured = yop;
	  var diff = math.subtract(measured,vp);
	dataOPPoints.push({x:(t), y:(y[t])});
	
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 
	
	//console.log(y[t]);	
	dataOPPoints.push({x:(t), y:(y[t])});
	}
	}	
	var sserr = math.abs(math.subtract(vp,measured));
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
      text: "Output Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
		
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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
	posy2 = document.getElementById("positiony2").value;
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
	if(document.getElementById('controllerchk').value==1 ){
	PControl();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}	
	
	if(document.getElementById('controllerchk').value==2 ){
	PIControl();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}	
	
	if(document.getElementById('controllerchk').value==3){
	PIDControl();	
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///Deviation Signal
	///P
	if(document.getElementById('controllerchk').value==4 ){
	deviation_P();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];
	}
	
	///PI
	if(document.getElementById('controllerchk').value==5 ){
	deviation_PI();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
	///PID
	if(document.getElementById('controllerchk').value==6 ){
	deviation_PID();
	document.getElementById('plotbucket').style.display ="none";
	dataOPPoints = [];	
	}
	
}

///Deviation 

function deviation_P(){
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
var dataOPPoints=[];
    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	if(document.getElementById('P').value == 50){
	 zeta = 0.4;
	 wn = 138.08;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');	
	}
	if(document.getElementById('P').value == 100){
	 zeta = 0.5;
	 wn = 81.5139;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 200){
	 zeta = 0.6;
	 wn = 139.121;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 30){
	 zeta = 0.2;
	 wn = 101.7044;
	 document. getElementById('sv').removeAttribute('readonly');
	 document. getElementById('pv').removeAttribute('readonly');
	}
	if(document.getElementById('P').value == 5){
	 zeta = 0;
	 wn = 138.08;
	 document. getElementById('sv').setAttribute('readonly','true');
	document. getElementById('pv').setAttribute('readonly','true');
	}
	
	
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(math.pow(wn,2),math.add(1,kp));
	var s1 = math.multiply(2,zeta,wn);
	var s2 = 1;
	
	var roots = math.polynomialRoot(s0,s1,1);
	var alpha = roots[0];
	var beta = roots[1];
	
	var LHS = math.multiply(vp,kp,math.pow(wn,2));
	
	var coeff1 =  math.divide(LHS,math.multiply(math.subtract(0,alpha),math.subtract(0,beta)));
	var coeff2 =  math.divide(LHS,math.multiply(alpha,math.subtract(alpha,beta)));
	var coeff3 =  math.divide(LHS,math.multiply(beta,math.subtract(beta,alpha)));	
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	var yop = (math.add(part1,part2,part3)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop/2;
	
	/* if(document.getElementById('P').value == 5){
	measured = 9.31;//y[t];
	}
	if(document.getElementById('P').value != 5){
	measured = yop;//y[t];
	} */
	measured = yop;
	var set = vp;
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	
	console.log('set =' + set);
	console.log('measured =' + measured);
	console.log('devi[t] =' + devi[t]);
	
	if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = coeff1;
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(beta,t)));	

	var yop = (math.add(part1,part2,part3)).re;
	
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 
	/*  if(document.getElementById('P').value == 5){
	measured = -9.31;//y[t];
	}
	if(document.getElementById('P').value != 5){
	measured = -yop;//y[t];
	} */
	measured = -yop;//y[t];
	var set = (-vp);
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	} 
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
      text: "Deviation Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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

function deviation_PI() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
var dataOPPoints=[];
    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	
	zeta = 0.5;
	wn = 81.5139;
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	
	var iValue = document.getElementById('I').value;
	var ki = math.divide(kp,iValue);
	
	
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(ki,math.pow(wn,2));;
	 var s1 = math.add(math.pow(wn,2),kp);
	 var s2 = math.multiply(2,zeta,wn);
	 var s3 = 1;
	
	var roots = math.polynomialRoot(s0,s1,s2,s3);
	var alpha = roots[0];
	var beta = roots[1];
	var gamma = roots[2];
	
	var LHS_A = math.multiply(vp,ki,math.pow(wn,2));
	var LHS_B = math.multiply(vp,math.add(math.multiply(kp,alpha),ki),math.pow(wn,2));
	var LHS_C = math.multiply(vp,math.add(math.multiply(kp,beta),ki),math.pow(wn,2));
	var LHS_D = math.multiply(vp,math.add(math.multiply(kp,gamma),ki),math.pow(wn,2));
	
	var A =  math.divide(LHS_A,math.multiply(math.subtract(0,alpha),math.subtract(0,beta),math.subtract(0,gamma)));
	var B =  math.divide(LHS_B,math.multiply(alpha,math.subtract(alpha,beta),math.subtract(alpha,gamma)));
	var C =  math.divide(LHS_C,math.multiply(beta,math.subtract(beta,alpha),math.subtract(beta,gamma)));
	var D =  math.divide(LHS_D,math.multiply(gamma,math.subtract(gamma,alpha),math.subtract(gamma,beta)));
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop/2;
	 
	measured = yop;
	var set = vp;
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	
	console.log('set =' + set);
	console.log('measured =' + measured);
	console.log('devi[t] =' + devi[t]);

		if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 
   measured = -yop;//y[t];
	var set = (-vp);
	
	console.log('set='+set);
	console.log('measured='+measured);
	
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	//console.log(devi[t]);	
	dataOPPoints.push({x:(t), y:(devi[t])});
	//console.log(devi[t]);	
	}
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
      text: "Deviation Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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

function deviation_PID() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//
var dataOPPoints=[];
    var x = new Array(), y = new Array(),devi = new Array;  // x,y plotting variables
    var dt, tstart, tstop,zeta,wn,tperiod,cyclehlfs,vop,count=50; 
	var  measured;

/////for 50% band PB /////////////////////

	// time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points
	
	
	zeta = 0.5;
	wn = 81.5139;
	
	
	var pValue = document.getElementById('P').value;
	var kp = math.divide(100,pValue);
	
	var iValue = document.getElementById('I').value;
	var ki = math.divide(kp,iValue);
	
	var dValue = document.getElementById('D').value;
	var kd = math.multiply(kp,dValue);
	
	
	tperiod = math.multiply(math.divide(1,frqfng),10);
	 cyclehlfs = math.divide(axes.N,tperiod);
	 
	 var s0 = math.multiply(ki,math.pow(wn,2));;
	 var s1 = math.multiply(math.add(1,kp),math.pow(wn,2));
	 var s2 = math.add(math.multiply(2,zeta,wn),math.multiply(kd,math.pow(wn,2)));
	 var s3 = 1;
	
	var roots = math.polynomialRoot(s0,s1,s2,s3);
	var alpha = roots[0];
	var beta = roots[1];
	var gamma = roots[2];
	
	var LHS_A = math.multiply(vp,ki,math.pow(wn,2));
	var LHS_B = math.multiply(vp,math.add(math.multiply(kp,alpha),ki,math.multiply(kd,math.pow(alpha,2))),math.pow(wn,2));
	var LHS_C = math.multiply(vp,math.add(math.multiply(kp,beta),ki,math.multiply(kd,math.pow(beta,2))),math.pow(wn,2));
	var LHS_D = math.multiply(vp,math.add(math.multiply(kp,gamma),ki,math.multiply(kd,math.pow(gamma,2))),math.pow(wn,2));
	
	var A =  math.divide(LHS_A,math.multiply(math.subtract(0,alpha),math.subtract(0,beta),math.subtract(0,gamma)));
	var B =  math.divide(LHS_B,math.multiply(alpha,math.subtract(alpha,beta),math.subtract(alpha,gamma)));
	var C =  math.divide(LHS_C,math.multiply(beta,math.subtract(beta,alpha),math.subtract(beta,gamma)));
	var D =  math.divide(LHS_D,math.multiply(gamma,math.subtract(gamma,alpha),math.subtract(gamma,beta)));
	
	
    // create function
	for (var nc = 0; nc < math.divide(cyclehlfs,2); nc+=1) {
    for (var t = math.multiply(2,nc,tperiod); t <= math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t++) {


	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;

	x[t] = tstart + t * dt;
	 y[t] = yop/2;
	 
	measured = yop;//y[t];
	var set = vp;
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	
	console.log('set =' + set);
	console.log('measured =' + measured);
	console.log('devi[t] =' + devi[t]);

		if(document.getElementById('rr2').src.match('./images/on.png')){
	var vir2Pos = math.add(16.5,math.multiply(diff,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	if(document.getElementById('rr2').src.match('./images/off.png')){
	var vir2Pos = math.add(16.5,math.multiply(measured,0.5));
	document.getElementById('pointer2').style.left = vir2Pos + '%';
	}
	} 
	
	for (var t = math.multiply(math.add(math.multiply(nc,2),1),math.divide(axes.N,cyclehlfs)); t<= math.multiply(2,math.divide(axes.N,cyclehlfs),math.add(((2*nc)/2),1)); t++) {
	
	//var yop = parseFloat(vp*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
	var part1 = A;
	var part2 = math.multiply(B,math.pow(math.e,math.multiply(alpha,t)));
	var part3 = math.multiply(C,math.pow(math.e,math.multiply(beta,t)));
	var part4 = math.multiply(D,math.pow(math.e,math.multiply(gamma,t)));

	var yop = (math.add(part1,part2,part3,part4)).re;
	
	x[t] = tstart + t * dt ;
	 y[t] = (-yop)/2;
	 	 
    measured = -yop;//y[t];
	var set = (-vp);
	var diff = math.subtract(measured,set);
	devi[t] = math.divide(math.subtract(measured,set),2);
	console.log(devi[t]);	
	
	dataOPPoints.push({x:(t), y:(devi[t])});
	console.log(devi[t]);
	
	//dataOPPoints.push({x:(t), y:(y[t])});
	}
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
      text: "Deviation Signal Enlarged View (V vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude (V)",
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
    var p = y0 - parseInt(posy2) * yscale;
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
/* var angle1= 0,angle2= 0,angle3= 0,angle4= 0,angle5= 0,angle6= 0,angle7= 0,angle8= 0;
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
	   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob1.style.transform=null; 
	document.getElementById('P').value = 5;
	angle1=0;
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
	
	angle1=0;
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
    
 } */

//////////pointer movement/////////////////////

function pointMove(){
	
var pointer1Pos = document.getElementById('pointer1').style.left;
var pointer2Pos = document.getElementById('pointer2').style.left;
var virtualPos = math.add(16.5,math.multiply(0.5,vp));	
setTimeout(function() {	
	document.getElementById('pointer1').style.left = virtualPos + '%';
}, 10000);		
	
}

 
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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 