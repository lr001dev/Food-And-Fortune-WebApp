/////////////////////////////////////
/// Lets create the Front End UI //
//////////////////////////////////


const createUI = (numOfSlices) => {

  //////////////////////////
  /// Creating Header /////
  ////////////////////////

  $(`<div>`).addClass(`flex-head`).addClass(`head-left`).text(`Food Fortune`)
  .appendTo($(`<div>`).addClass(`flex-header`).appendTo(`header`))

  $(`<div>`).addClass(`flex-head`).addClass(`head-mid`).appendTo(`.flex-header`)
  $(`<div>`).addClass(`flex-head`).addClass(`head-right`).appendTo(`.flex-header`)

  /////////////////////////////////////////////
  /// Creating Main & Container Elements /////
  ///////////////////////////////////////////

  $(`<main>`).appendTo(`body`)
  $(`<div>`).addClass(`city`).appendTo(`main`)
  $(`<div>`).addClass(`flex-container`).appendTo(`main`)

  ////////////////////////////////////////////
  /// Lets Begin Constructing Our Wheel /////
  //////////////////////////////////////////

  //Creating ul element that will container our inner wheel
  $(`<ul>`).attr(`id`, `inner-wheel`).addClass(`the-wheel`).appendTo(`main .flex-container`)
  //Looping here to create the inner wheel elements
  //That we will construct into selectable slices
  for(let i = 0; i < numOfSlices; i++) {
    $(`<li>`).appendTo(`#inner`)
    const $selectLiTag = $('li').eq(i)
    $(`<div>`).addClass(`wheel-slice`).text(`${i}`).appendTo($selectLiTag)
  }
  //Create center of circle elements
  $(`<div>`).addClass(`circle-button`).appendTo(`#inner-wheel`)
  $(`<div>`).addClass(`circle-button-small`).appendTo(`#inner-wheel`)
  $(`<div>`).addClass(`circle-button-tiny`).appendTo(`#inner-wheel`)

  //Create our orb pop up element for restaurant display
  $(`<div>`).addClass(`orb`).appendTo(`#inner`)
  //Create our outter wheel element
  $(`<ul>`).attr(`id`, `outter-wheel`).addClass(`the-wheel`).appendTo(`.flex-container`)

  ///////////////////////////////////
  /// Creating Footer Elements /////
  /////////////////////////////////

  $(`<div>`).addClass(`flex-foot`).addClass(`foot-left`)
    .appendTo( $(`<div>`).addClass(`flex-footer`).appendTo($(`<footer>`).appendTo(`body`)))

  $(`<div>`).addClass(`flex-foot`).addClass(`foot-mid`).appendTo(`.flex-footer`)
  $(`<div>`).addClass(`flex-foot`).addClass(`foot-right`).appendTo(`.flex-footer`)

  ////////////////////////////////////////////////
  /// Creating Audio Players For Music & FX /////
  //////////////////////////////////////////////

  //Creating Music Player
  $(`<audio controls loop>`).attr(`id`, `fortuneMusic`).css(`display`, `none`)
    .attr(`src`, `audio/file_example_MP3_700KB.mp3`)
    .attr(`id`, `musicMain`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

  //Creating FX Player
  $(`<audio controls>`).attr(`id`, `wheelFx`).css(`display`, `none`)
    .attr(`src`, `audio/bleep.mp3`)
    .attr(`id`, `bleepFx`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)
}

$(() => {

createUI(12)

})
