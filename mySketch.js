var colors = "ffcbf2-f3c4fb-ecbcfd-e5b3fe-e2afff-deaaff-d8bbff-d0d1ff-c8e7ff-c0fdff".split("-").map(a=>"#"+a)

var colors_r = "f72585-7209b7-3a0ca3-4361ee-4cc9f0".split("-").map(a=>"#"+a)
var positionListX=[]//所有花的x軸位置，List串列，array陣列
var positionListY=[]//所有花的y軸位置
var clrList=[]//所有花辦的顏色
var clr_rList=[]//所有花圓心的顏色
var sizeList=[]//所有花大小
let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16
function setup() {
  createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
video.size(width, height);

handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
handpose.on("predict", (results) => {
    predictions = results;
});

  // Hide the video element, and just show the canvas
video.hide();
  for(var j =0;j<10;j++){
    positionListX.push(random(width))//把花的位置x軸存入到positionListX list資料內
    positionListY.push(random(height))//把花的位置y軸存入到positionListX list資料內
    clrList.push(colors[int(random(colors.length))])
    clr_rList.push(colors_r[int(random(colors_r.length))])//花園心顏色放到list
    sizeList.push(random(0.5,1.5))
    push()
      translate(positionListX[j],positionListY[j])
      // var clr = colors[int(random(colors.length))]
      // var clr_r = colors_r[int(random(colors_r.length))]
      // drawFlower(clr,clr_r,random(0.5,1.5))
      drawFlower(clrList[j],clr_rList[j],sizeList[j])
    pop()    
  }
}

function draw() {
	translate(width, 0);
	scale(-1, 1);
  background(255);
	 drawKeypoints(); //取得手指位置
    
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
  for (var k=0;k<positionListX.length;k++) {

  push()
  translate(positionListX[k],positionListY[k])
  rotate(frameCount/50)
  //var clr = colors[int(random(colors.length))]
  //var clr_r = colors_r[int(random(colors_r.length))]
  //drawFlower(clr,clr_r,random(0.5,1.5))
  r_Flower(clrList[k], clr_rList[k],sizeList[k],positionListX[k],positionListY[k])
pop()    
}
}

function drawFlower(clr,clr_r,size=1){ 
  push()
  scale(size)//縮放比率,1:100%,<1代表縮小,>1代表放大
    // fill(255,211,33) //中間的圓顏色
    rectMode(CENTER)
    strokeWeight(0)
    fill("#4361ee")
    rect(0,0,60,100,20)//拖鞋深色
    fill("#4cc9f0")
    rect(-5,5,60,100,20)//拖鞋淺色
    strokeWeight(4)
    stroke("#fee440")
    arc(-20,-21,30,40,100,210)
    arc(10,-21,30,40,70,198)
    stroke(0)
    for(var i =0;i<6;i++){  
      strokeWeight(0)
	fill("#9d6b53")
	ellipse(105,0,50,100)//身體
 	fill("#774936")
 	ellipse(90,18,35,70)//翅膀(左)
 	ellipse(120,18,35,70)//翅膀(右)
	strokeWeight(1)
 	line(127,-17,83,-17)//脖子線
 	noFill()
 	strokeWeight(1)
 	arc(130,-60,50,80,41,200)//觸鬚(右)
 	arc(80,-60,50,80,80,-50)//觸鬚(左)
 	strokeWeight(0)
 	fill(0)
 	ellipse(110,-40,5)//眼睛(右)
 	ellipse(98,-40,5)//眼睛(左)
      rotate(PI/3) //PI代表180，
    }
  pop()
    
}
function mousePressed()
{
  positionListX.push(mouseX)//把花的位置x軸存入到positionListX list資料內
    positionListY.push(mouseY)//把花的位置y軸存入到positionListX list資料內
    clrList.push(colors[int(random(colors.length))])
    clr_rList.push(colors_r[int(random(colors_r.length))])//花園心顏色放到list
    sizeList.push(random(0.5,1.5))
    push()
    translate(positionListX[positionListX.length-1],positionListY[positionListY.length-1])
    drawFlower(clrList[positionListX.length-1],clr_rList[positionListX.length-1],sizeList[positionListX.length-1])
  pop()
  }
function R_draw(handX,handY)
{
  positionListX.push(handX) //把花X位置存入到positionListX list資料內
  positionListY.push(handY) //把花Y位置存入到positionListY list資料內
  clrList.push(colors[int(random(colors.length))])
  clr_rList.push(colors_r[int(random(colors_r.length))]) //花圓心顏色放到list
  sizeList.push(random(0.5,1.5))
  let data_total = positionListX.length //目前資料筆數
  push()
    translate(positionListX[data_total-1],positionListY[data_total-1])
    drawFlower(clrList[data_total-1], clr_rList[data_total-1], sizeList[data_total-1]) 
  pop() 

}
function modelReady() {
  console.log("Model ready!");
}
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {				
				pointerX8 = map(keypoint[0],0,640,0,width)
				pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = map(keypoint[2],0,480,0,height)
        console.log(pointerZ8)
        if(pointerZ8<-150)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) {   
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
		
      } else
      if (j == 14) {
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}
function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
	if(pointerY14<pointerY16){
		drawFlower(F_clr,F_clr_r,map(d,0,600,F_size,F_size+1))
	}else
	{
		rotate(frameCount/20)
		drawFlower(F_clr,F_clr_r,F_size)
			
	}
	pop()
}
