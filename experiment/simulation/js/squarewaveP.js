/*  Document Name:rcintgsqrwv_ver2.js
 Created on : 21 oct, 2020
 Author     : Piyali
 */

var flag;
var vp;
var posy1;
var posy2;
var phsl;
var frqfng;
var axes = {};
var vmaxs;  //in volt
var tmaxs = document.getElementById("fq-knob").value*10*Math.pow(10,-3);// in msec  0.001; //in sec

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
		 document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = true;
        document.getElementById("out").disabled = true;
        document.getElementById("inout").disabled = true;
    drawGrid(ctx);
    drawAxis();
    sqrwv();
	
}

function sqrwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
   
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (100 - 1);// time increment over N points

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

}

/*function drawsquare(){
	
 canvas = document.getElementById("mycanvas");
	//document.getElementById('fq-knob-fng').value = "15400";
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     document.getElementById("rectifiedop2").disabled = false;
    drawGrid(ctx);
    drawAxis();
    sqropwv();	
}

function sqropwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
   
//---------------------------------------------------------Square wave-------------------------------------------------------------------------------//

   var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;   
    var r =document.getElementById('R').value*1000;
	var l =document.getElementById('L').value/1000;//* (Math.pow(10,-3));
	var c= document.getElementById('C').value/1000000000;//* (Math.pow(10,-9));
	var xl = (2*3.1415*frqfng*l);
    var sqxl = Math.pow (xl,2);
	var w2 = (2*3.1415*frqfng);
	var sqw2 = Math.pow (w2,2);
	var poly1 = r*(1-(sqw2*l*c));
	var sqpoly1 = Math.pow(poly1,2);
	var poly = (sqxl + sqpoly1);
	var deno = Math.sqrt(poly);
	var vo  = xl/deno;//Math.sqrt(1+Math.pow((frqfng/15.915),4))`;
	document.getElementById('opvalue').value = vo*vp;
	
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (100 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = vo*(vp/2) * Math.sign( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
    }
	if(frqfng>=14500 && frqfng<=15500){
		document.getElementById('fq-knob').value=0.05;
	for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = vo*(vp/2) * ( Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180));
    }
	alert ('1st Harmonic is observed');
	
	}	
	
	if(frqfng>=4500 && frqfng<=5300){
		//document.getElementById('fq-knob').value=0.009;
	for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vo*(vp/2)) * ( Math.sin(2 * 3.1415 * 3*frqfng * x[i] + phsl * 3.1415 / 180));
    }
	document.getElementById('harmonic').innerHTML="Harmonic(a3)";
	alert ('3rd Harmonic is observed');
	
	}	
		
	if(frqfng>=3200 && frqfng<=4300){
		//document.getElementById('fq-knob').value=0.009;
	for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vo*(vp/2)) * ( Math.sin(2 * 3.1415 * 5*frqfng * x[i] + phsl * 3.1415 / 180));
    }
	document.getElementById('harmonic').innerHTML="Harmonic(a5)";
	alert ('5th Harmonic is observed');
	
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
*/

































