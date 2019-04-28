/////////////////////////////////////
/// Lets create the Front End UI //
//////////////////////////////////

const createUI = (numOfSlices) => {

  //////////////////////////
  /// Creating Header /////
  ////////////////////////

  $(`<div>`).addClass(`flex-head`).addClass(`head-left`)
    .appendTo($(`<div>`).addClass(`flex-header`).appendTo(`header`))
  $(`<h1>`).text(`Food And Fortune`).appendTo(`.head-left`)

  $(`<div>`).addClass(`flex-head`).addClass(`head-mid`).appendTo(`.flex-header`)
  $(`<div>`).addClass(`flex-head`).addClass(`head-right`).appendTo(`.flex-header`)

  /////////////////////////////////////////////
  /// Creating Main & Container Elements /////
  ///////////////////////////////////////////

  $(`<main>`).appendTo(`body`)
  $(`<div>`).addClass(`city`).appendTo(`main`)
  $(`<div>`).addClass(`flex-container`).appendTo(`main`)

  //////////////////////////////////////
  /// Creating Back Text Elements /////
  ////////////////////////////////////
  for(let i = 1; i <= 6; i++) {
    $(`<div>`).attr(`id`, `back-text-${ i }`).addClass(`back-text`).text(`FOOD AND FORTUNE`).appendTo(`main`)
  }
  ////////////////////////////////////////////
  /// Lets Begin Constructing Our Wheel /////
  //////////////////////////////////////////

  //Creating ul element that will contain our inner wheel
  $(`<ul>`).attr(`id`, `inner-wheel`).addClass(`the-wheel`).appendTo(`main .flex-container`)
  //Looping here to create the inner wheel elements
  //This we will construct into selectable slices
  for(let i = 0; i < numOfSlices; i++) {
    $(`<li>`).appendTo(`#inner-wheel`)
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

////////////////////////////////////////////////////
/// Creating Button Controls & Event Listeners /////
///////////////////////////////////////////////////

const createControls = (citySearch) => {

  /////////////////////////////////////////////
  /// Creating Form For City Search //////////
  ////////////////////////////////////////////
  $(`<form>`).appendTo(`.head-mid`)
  $(`<input>`).attr(`id`, `inputBox`).attr(`type`, `text`).attr(`value`, ``).attr(`placeholder`, `Enter Your City`)
    .appendTo(`form`)

    //////////////////////////
    /// Form Submission /////
    ////////////////////////

  //Create input button for form
  $(`<button>`).attr(`id`, `inputButton`).attr(`type`, `submit`).attr(`value`, `submit`).text(`Load City`)
    .on(`click`, (event) => {
      //findCity() method located in our SearchCity class triggering our api call
      citySearch.findCity(event)
      //Trigger music playback when user begins search
      $(`#musicMain`).trigger('play')

    }).appendTo(`.head-right`)

    /////////////////////////
    /// Audio Controls /////
    ///////////////////////

  //Create button for overall audio control global mute on or off
  $(`<button>`).attr(`id`, `muteAudio`).text(`Mute Audio`)
    .on(`click`, () => {
      const muteAudio = document.getElementById("musicMain")

      if( muteAudio.muted !== true) {
          muteAudio.muted = true
      } else {
          muteAudio.muted = false
      } })
    .appendTo(`.foot-left`)

    //////////////////////////////
    /// Reset Search & Wheel /////
    /////////////////////////////

  //Create button to reset the search query & wheel
  $(`<button>`).attr(`id`, `wheelReset`).text(`Reset Wheel`).on(`click`, () => { resetSearch(citySearch) })
    .appendTo(`.foot-mid`)

    ///////////////////////
    /// Modal Control/////
    /////////////////////

  //Create button for modal control
  $(`<button>`).attr(`id`, `modalControl`).text(`Modal Control`).on(`click`, () => { alert(`Modal Control`) })
    .appendTo(`.foot-right`)
}

$(() => {
let citySearch = new SearchCity()
createUI(12)
createControls(citySearch)

})
