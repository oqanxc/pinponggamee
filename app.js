const cvs=document.getElementById('game');
const ctx=cvs.getContext('2d');//canvas alındı ve contextine erişildi

const user={//user,computer ve top için sınıflar oluşturldu
    x:20,
    y:cvs.height/2-50,
    w:50,
    h:100,
    color: '#f00',
    score: 0
}
const comp={
    x:cvs.width-80,
    y:cvs.height/2-50,
    w:50,
    h:100,
    color: '#000',
    score: 0
}

const ball={
    x:cvs.width/2,
    y:cvs.height/2,
    r:10,
    color:'#b45698',
    speed:15,
    velocitX:8,
    velocitY:8,
}
function generateRect(x,y,w,h,color){// dikdörtgen ve daire oluşturma fonksiyonları oluşturuldu
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}
function generateCircle1(x,y,r,color){//daire çizimi için tanımlandı
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.closePath();
    ctx.fill()
}

function generateCircle2(x,y,r,w,color){//içi boş çember oluşturuldu
ctx.fillStyle=color;
ctx.lineWidth=w;
ctx.beginPath();
ctx.arc(x,y,r,0,2*Math.PI)
ctx.closePath()
ctx.stroke()
}

function drawText(text,x,y,color){//skorbord için oluşturuldu
    ctx.fillStyle=color;
    ctx.font='30px arial';
    ctx.fillText(text,x,y);

}


function RestartGame(){//topun canvasın genişliğini her geçmesi durumunda yani her skor artışında oyunun yeniden başlatılması sağlandı
        ball.x=cvs.width/2;
        ball.y=cvs.height/2;

        
        ball.velocitX=3;
        ball.velocitY=4;

}
function movement(e) {
let rectangle=cvs.getBoundingClientRect();
user.y=e.clientY-rectangle.top-user.h/2;

}
cvs.addEventListener('mousemove',movement);//fare hareketinde movepaddle çağrıldı

function update(){//ekran yenilemesi için update fonsiyonu tanımlandı daha sonra ne kadar sürede yenileceğine setInterval fonksiyonu ile karar verildi
    ball.x+=ball.velocitX;//her yenilemede x ekseninde ve y ekseninde ball.velocity,ball.velocityx kadar artış sağlandı
    ball.y+=ball.velocitY;

    if(ball.y+ball.r>cvs.height || ball.y-ball.r<0)//alt-üst tabana çarpması duurmunda topun x,y eksenindeki hızının simetriği alındı
    ball.velocitY=-ball.velocitY;

    let comLvl=0.15;
    comp.y+=(ball.y-(comp.y+comp.h/2))*comLvl;//zorluk seviyesi belirlendi comLvl 0.15 olarak belirlendi ki her defasında top computer çubuğunun tam ortasına gitmesin bu satır için internetten yardım aldım 
     
    let player;//topun hangi alanda olduğuna karar verildi
    if (ball.x < cvs.width / 2) {
      player = user;
    } else {
      player = comp;
    }


    if(user.score>4){//oyuncu skorunun 5'i geçmesi durumunda oyunu zorlaştırma amaçlandı
        comLvl+=0.1;
        
    }



}

function start(){
generateRect(0,0,cvs.width,cvs.height,'#00f');//yukarıda tanımlana dikdörtgen daire ve skorbord için fonsiyonlara parametre aktarıldı
generateRect(cvs.width/2,0,4,cvs.height,'#fff');
generateCircle2(cvs.width/2,cvs.height/2,50,4,'#fff');
drawText(user.score,cvs.width/2-40,320,'#f00');
drawText(comp.score,cvs.width/2+10,318,'#000');
generateRect(user.x,user.y,user.w,user.h,user.color);
generateRect(comp.x,comp.y,comp.w,comp.h,comp.color);
generateCircle1(ball.x,ball.y,ball.r,ball.color);
}


function game(){
update();
start();

}


setInterval(game,20);//20ms 1 oyun ekranı yenilendi

















