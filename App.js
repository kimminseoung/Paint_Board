const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const CANVAS_SIZE = 700;
const INITIAL_COLOR="#2c2c2c"

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white"
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
ctx.strokeStyle=INITIAL_COLOR
ctx.fillStyle=INITIAL_COLOR
ctx.lineWidth='2.5'

let painting = false;
let filling = false;;

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath()
    ctx.moveTo(x,y)
  }else {
    ctx.lineTo(x,y)
    ctx.stroke()
  }
}
function startPaint(){
  painting=true;
}
function stopPaint(){
  painting = false;
}
function onChangeColor(event){
  const color = event.target.style.backgroundColor
  ctx.strokeStyle=color
  ctx.fillStyle=color
}

Array.from(colors).forEach(color=>color.addEventListener('click',onChangeColor))
function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
  }
}
function handleCM(event){
  event.preventDefault()
}
if(canvas){
  canvas.addEventListener('mousemove',onMouseMove)
  canvas.addEventListener('mousedown',startPaint)
  canvas.addEventListener('mouseup',stopPaint)
  canvas.addEventListener('mouseleave',stopPaint)
  canvas.addEventListener('click',handleCanvasClick)
  canvas.addEventListener('contextmenu',handleCM)
}
function handleRangeChange(event){
  ctx.lineWidth=event.target.value
}
if(range){
  range.addEventListener('input',handleRangeChange)
}

function handleBgClick(event){
  if(filling===true){
    filling = false;
    mode.innerText="Fill"
  
  }else{
    filling = true;
    mode.innerText="Paint"
    
  }
}
if(mode){
  mode.addEventListener('click',handleBgClick)
}
function handleSaveClick(){
  const image = canvas.toDataURL('image/png')
  const link = document.createElement("a")
  link.href = image
  link.download = "Paint[😎]"
  link.click()
}
if(save){
  save.addEventListener('click',handleSaveClick)
}