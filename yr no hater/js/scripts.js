$(document).ready(function() {

 $('#bitch').click(function() {
  $('#bitch').text('baby')
  $('#bitch').css('color', 'darkred')
  $('#bitch').css('transition', 'none')
  $('#bitch').css('font-style','normal')
  $('#structure').css('letter-spacing', '1.1vw')
  $('#structure').css('word-spacing', '-0.1vw')
  $('#structure').css('transition', 'all .25s ease')
  $('#heart').css('color', 'white')
  $('#heart').css('transition', 'all 1s ease')
  $('body').css('background-color', '#C0C0C0')
  $('body').css('transition', 'all 1s ease')
 })

 $('#heart').hover(function(){
  $('#heart').css('color','darkred')
  $('#bitch').css('color','grey')
 });

$('#heart').click(function(){
  $('#structure').css('letter-spacing', '1vw')
  $('#structure').css('word-spacing', '0.25vw')
  $('#structure').css('font-size', '6vw')
  $('#structure').css('text-align', 'left')
  $('#structure').css('line-height', '1.1vw')
  $('#endings').css('color', 'white')
  $('#endings').css('font-size', '16vw')
  $('#bitch').css('color','grey')
  $('#heart').css('transition', 'none')
  $('#endings').css('transition', 'all 0.5s ease')
  $('body').css('background-color', '#A9A9A9')
  $('body').css('transition', 'all 1s ease')
 })

 $('#endings').hover(function(){
  $('#endings').css('color','darkred')
  $('#bitch').css('color','grey')
  $('#heart').css('color','grey')
 })

$('#endings').click(function(){
  $('#structure').css('letter-spacing', '1.25vw')
  $('#structure').css('word-spacing', '0.75vw')
  $('#structure').css('font-size', '15px')
  $('#structure').css('line-height', '20px')
  $('#structure').css('text-align', 'right')
  $('#endings').css('color', 'darkred')
  $('#heart').css('color','grey')
  $('#heat').css('color','white')
  $('#endings').css('transition', 'none')
  $('#endings').css('font-size', '15px')
  $('#heat').css('transition', 'all 2s ease')
  $('body').css('background-color', '#C0C0C0')
  $('body').css('transition', 'all 1s ease')
})

$('#heat').click(function(){
   $('#structure').css('letter-spacing', '1.25vw')
    $('#structure').css('word-spacing', '0.75vw')
    $('#structure').css('font-size', '15px')
    $('#structure').css('line-height', '22px')
    $('#structure').css('text-align', 'right')
    $('#endings').css('color', 'darkred')
    $('#heart').css('color','grey')
    $('#heat').css('color','white')
    $('#endings').css('transition', 'none')
    $('#endings').css('font-size', '15px')
    $('#heat').css('transition', 'all 2s ease')
    $('body').css('background-color', '#C0C0C0')
    $('body').css('transition', 'all 1s ease')
})

$('#heat').hover(function(){
  $('#heat').css('color','darkred')
  $('#endings').css('color','grey')
 })

$('#heat').click(function(){
  $('#structure').css('letter-spacing', '0.11vw')
  $('#structure').css('word-spacing', '0.11vw')
  $('#structure').css('font-size', '15px')
  $('#structure').css('line-height', '22px')
  $('#structure').css('text-align', 'center')
  $('#heat').css('color', 'darkred')
  $('#endings').css('color','grey')
  $('#bitch').css('font-style','italic')
  $('#bitch').css('transition', 'all 2s ease')
  $('#heat').text('love')
  $('#heat').css('transition', 'none')
  $('body').css('background-color', '#dbdbdb')
  $('body').css('transition', 'all 1s ease')
 })

})