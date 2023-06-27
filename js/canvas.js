var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
let radius = canvas.height /2
// console.log(radius);

ctx.translate(radius, radius);
radius = radius * 0.9
// dibujaCirculo()
setInterval(dibujaCirculo, 1000)

function dibujaCirculo() {

    dibujaContorno(radius, radius)
    dibujaNumeros(ctx, radius);
    dibujaTiempo(ctx, radius);
}

function dibujaContorno() {
    const grad = ctx.createRadialGradient(0,0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.beginPath();
    ctx.arc(0,0,radius,0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0 , radius * 0.1, 0 , 2 * Math.PI);
    ctx.fillStyle = '#333'
    ctx.fill();
}

function dibujaNumeros(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (let num = 1; num < 13; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0,0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);     
    }
}

function dibujaTiempo(ctx, radius){
    const now = new Date();
    let hora = now.getHours();
    let minuto = now.getMinutes();
    let segundo = now.getSeconds();

    hora = hora%12;
    hora = (hora* Math.PI/6) + (minuto*Math.PI/(6*60)+ segundo*Math.PI/(360*60) );
    dibujaPerillas(ctx, hora, radius*0.5, radius*0.07);

    minuto = (minuto * Math.PI/6)+(segundo*Math.PI/(30*60));
    dibujaPerillas(ctx, minuto, radius*0.8, radius*0.07);

    segundo = (segundo * Math.PI);
    dibujaPerillas(ctx, segundo, radius*0.9, radius*0.02)
    
}


function dibujaPerillas(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth= width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
    
}