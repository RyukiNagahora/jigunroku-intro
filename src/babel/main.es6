const $ = require('jquery')
//
import * as PIXI from 'pixi.js'
const app = new PIXI.Application()
//
import * as dat from 'dat.gui'
const gui = new dat.GUI({
  name: 'canvas param'
})
//
import  { TweenLite, Power1 } from  'gsap'
// import { TweenLite } from 'gsap/TweenLite'

//
// PIXI
$('#app').append(app.view)

//
// GUI
let guiParams = function()
{
  this.scaleMin = 0.3,
  this.scaleMax = 3.0,
  this.startDurationSec = 2.0,
  this.startUpSec = 10,
  this.allSec = 12,
  this.resetFunc = reset
}
let _guiParams = new guiParams()
gui.add(_guiParams, 'scaleMin')
gui.add(_guiParams, 'scaleMax')
gui.add(_guiParams, 'startDurationSec')
gui.add(_guiParams, 'startUpSec')
gui.add(_guiParams, 'allSec')
gui.add(_guiParams, 'resetFunc')

//
let resWords = [];

//
let showTween

//
let showWordDuration =
{
  sec: 2.0
}

//
let timer0
let timer1
let timer2
let timer3
let finishTimer


//
initCanvas()
function initCanvas()
{
  //
  app.renderer.backgroundColor = '0xFFFFFF'
}


//
//
function startShowing()
{
  console.log('START')

  showWordDuration.sec = _guiParams.startDurationSec
  showTween = TweenLite.to(showWordDuration, _guiParams.startUpSec, {
    sec: 0.01,
    // ease: Power1.easeIn,
    onComplete: function()
    {
      console.log('DONE')
      drawWord1()
      drawWord2()
      drawWord3()
    }
  })

  drawWord()

  //
  finishTimer = window.setTimeout(stopShowing, _guiParams.allSec * 1000)
}


//
//
function stopShowing()
{
  console.log('STOP')
  showTween.kill()
  clearTimeout(timer0)
  clearTimeout(timer1)
  clearTimeout(timer2)
  clearTimeout(timer3)
  clearTimeout(finishTimer)
}


//
// あとでなおす
function drawWord()
{
  timer0 = window.setTimeout(function()
  {
    generateResword()
    drawWord()
  }, showWordDuration.sec * 1000)
}
function drawWord1()
{
  timer1 = window.setTimeout(function()
  {
    generateResword()
    drawWord1()
  }, showWordDuration.sec * 1000)
}
function drawWord2()
{
  timer2 = window.setTimeout(function()
  {
    generateResword()
    drawWord2()
  }, showWordDuration.sec * 1000)
}
function drawWord3()
{
  timer3 = window.setTimeout(function()
  {
    generateResword()
    drawWord3()
  }, showWordDuration.sec * 1000)
}


//
// 解析単語を生成
function generateResword () {
  let tex = 'word' + resWords.length

  let textObj = new PIXI.Text(tex, {
    fontsize: 20 
  })
  textObj.anchor.x = 0.5
  textObj.anchor.y = 0.5
  textObj.scale.x = textObj.scale.y = Math.random() * (_guiParams.scaleMax - _guiParams.scaleMin) + _guiParams.scaleMin
  resWords.push(textObj)

  showWord(resWords[resWords.length - 1])
}


//
//
function showWord(word)
{
  let randX = Math.floor(Math.random() * $(window).width())
  let randY = Math.floor(Math.random() * $(window).height())
  
  word.x = randX
  word.y = randY

  app.stage.addChild(word)
}


//
//
function reset ()
{
  stopShowing()
  resetWords()

  startShowing()
}


//
//
function resetWords()
{
  app.stage.removeChildren()
  resWords = []
}










// --------------
// DOM EVENTS


//
// onload
$(window).on('load', function()
{
  console.log('onload')

  resizeCanvas()

  startShowing()
})


//
// resize
$(window).on('resize', function()
{
  console.log('resize')

  resizeCanvas()
})
//
function resizeCanvas()
{
  $('canvas').get(0).width = $(window).width()
  $('canvas').get(0).height = $(window).height()
}


//
// click
$('#app').on('click', function()
{
  generateResword()
})


// ----------------
/*
// TODO
- 複数の文字列のテキストオブジェクトを生成

// DONE
- アニメーションでの表示ロジックを考える
- TweenMaxを導入
- guiのチェンジのイベントをとる
- 制御しているTweenをGUIで制御
- テキストオブジェクトの表示タイミングをTweenで制御
- 複数テキストオブジェクトを表示

// LOGIC
- 表示する間の時間をTweenでアニメーション
*/
