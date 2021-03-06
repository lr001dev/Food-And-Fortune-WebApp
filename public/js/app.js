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

  //////////////////////////////////////////////////
  /// //Create Modal Elements & Attach To Body /////
  /////////////////////////////////////////////////

  //Create Modal & Modal Close Button
  $(`<button>`).attr(`id`, `modal-close`).text(`Close`)
  .appendTo($(`<div>`).attr(`id`, `modal`).appendTo(`body`))

  //Create Fortune Cookike Container
  $(`<div>`).attr(`id`, `fortune`).css(`visibility`, `hidden`).appendTo(`#modal`)

  //Create Restaurant Container Header Containers
  $(`<div>`).attr(`class`,`res-collection`).appendTo($(`<div>`).attr(`class`, `res-head`)
  .appendTo($(`<div>`).attr(`id`, `resId-0`).attr(`class`, `listings`).appendTo(`#modal`)))

  $(`<div>`).attr(`class`, `res-name`).appendTo(`.res-head`)
  $(`<div>`).attr(`class`, `res-ratings`).appendTo(`.res-head`)

  //Create Restaurant Body Container
  $(`<div>`).attr(`class`, `res-body`).appendTo(`#resId-0`)

  //Creating H2 Tags For Later Use
  $(`<h2>`).attr(`class`, `cuisines`).appendTo(`#resId-0 .res-body`)
  $(`<h2>`).attr(`class`, `average_cost`).appendTo(`#resId-0 .res-body`)
  $(`<h2>`).attr(`class`, `address`).appendTo(`#resId-0 .res-body`)

  //Create our orb pop up element for restaurant display
  $(`<div>`).addClass(`orb`).appendTo(`#modal`)

  //Create Intro Modal On Page Load
  $(`<button>`).attr(`id`, `modal-close-intro`).text(`Close`)
    .appendTo($(`<div>`).attr(`id`, `modal-intro`).appendTo(`body`))

  $(`<div>`).attr(`class`, `intro-modal`).appendTo(`#modal-intro`)

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
  $(`<i>`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`).appendTo(`.circle-button`)
  $(`<div>`).addClass(`circle-button-small`).appendTo(`#inner-wheel`)
  $(`<div>`).addClass(`circle-button-tiny`).appendTo(`#inner-wheel`)

  //Create our outter wheel element
  $(`<ul>`).attr(`id`, `outter-wheel`).addClass(`the-wheel`).appendTo(`.flex-container`)

  $(`<div>`).addClass(`swipe-container`).appendTo(`.flex-container`)
  $(`<div>`).addClass(`swipe`).css(`background`, `rgba(0, 0, 0, 0.5)`).css(`padding`, `1em`)
  .css(`border-radius`, `1em`).css(`visibility`, `hidden`).appendTo(`.swipe-container`)
  $(`<h3>`).addClass(`text-swipe`).text(`Swipe here to spin`).css(`color`, `ghostwhite`).appendTo(`.swipe`)

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
  $(`<audio preload="auto" controls loop>`).attr(`id`, `fortuneMusic`).css(`display`, `none`)
    .attr(`src`, `audio/msx/master_food_fortune_msx.mp3`)
    .attr(`id`, `musicMain`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

  //Creating FX For Wheel Beeps Player
  $(`<audio preload="auto" controls>`).attr(`id`, `wheelFx`).css(`display`, `none`)
    .attr(`src`, `audio/fx/master_food_fortune_fx_bleep.mp3`)
    .attr(`id`, `bleepFx`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

  //Creating FX For Player Button Clicks
  $(`<audio preload="auto" controls>`).attr(`id`, `buttonFx`).css(`display`, `none`)
    .attr(`src`, `audio/fx/master_food_fortune_fx_click.mp3`)
    .attr(`id`, `clickFx`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

    //Creating Player FX For Food & Fortune Vox
  $(`<audio preload="auto" controls>`).attr(`id`, `crowdFx`).css(`display`, `none`)
    .attr(`src`, `audio/vox/master_food_fortune_vox.mp3`)
    .attr(`id`, `voxFx`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

    //Creating Player FX For Spin Button Press V1
  $(`<audio preload="auto" controls>`).attr(`id`, `spinFx01`).css(`display`, `none`)
    .attr(`src`, `audio/fx/master_food_fortune_fx_press_01.mp3`)
    .attr(`id`, `pressFx01`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)

    //Creating Player FX For Spin Button Press V2
  $(`<audio preload="auto" controls>`).attr(`id`, `spinFx02`).css(`display`, `none`)
    .attr(`src`, `audio/fx/master_food_fortune_fx_press_02.mp3`)
    .attr(`id`, `pressFx02`).attr(`type`, `audio/mpeg`)
    .appendTo(`.foot-left`)
}

////////////////////////////////////////////////////
/// Creating Button Controls & Event Listeners /////
///////////////////////////////////////////////////

const createControls = (citySearch, numOfCollections) => {

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
      $(`#clickFx`).trigger('play')
      const $doesDivExist = $(`.city div`)
      let $inputExist = $(`#inputBox`).val()
      console.log($doesDivExist.length)
      if($doesDivExist.length === 0 && $inputExist === '') {

          alert(`Please Enter Your City To Begin Your Food Fortune`)

      } else if ($doesDivExist.length === 0) {

        // findCity() method located in our SearchCity class triggering our api call
        // Also passing loadCityCollections() method as a callback
        // that will make our 2nd API Call to retrieve City's Food Collections
        citySearch.findCity(event, citySearch.loadCityCollections, numOfCollections, citySearch)

      } else {

        alert(`Reset Your Seach Below To Load Another City`)

      }
    }).appendTo(`.head-right`)

    /////////////////////////
    /// Audio Controls /////
    ///////////////////////

  //Create button for overall audio control global mute on or off
  $(`<button>`).attr(`id`, `muteAudio`).text(`Mute Audio`)
    .on(`click`, () => {

      $(`#clickFx`).trigger('play')

      const muteMusic= document.getElementById("musicMain")
      const muteBleep = document.getElementById("bleepFx")
      const muteFx01 = document.getElementById("pressFx01")
      const muteFx02 = document.getElementById("pressFx02")

      if( muteMusic.muted !== true) {
          muteMusic.muted = true
          muteBleep.muted = true
          muteFx01.muted = true
          muteFx02.muted = true

      } else {
          muteMusic.muted = false
          muteBleep.muted = false
          muteFx01.muted = false
          muteFx02.muted = false
      } })
    .appendTo(`.foot-left`)

    //////////////////////////////
    /// Reset Search & Wheel /////
    /////////////////////////////

  //Create button to reset the search query & wheel
  $(`<button>`).attr(`id`, `wheelReset`).text(`Reset Wheel`).on(`click`, () => {
    $(`#clickFx`).trigger('play')
   citySearch.resetSearch(citySearch)
   // location.reload()

 })
    .appendTo(`.foot-mid`)

    ///////////////////////
    /// Modal Control/////
    /////////////////////

  //Create button for modal control
  $(`<button>`).attr(`id`, `modalControl`).text(`My Fortunes`).on(`click`, () => {

    $(`#clickFx`).trigger('play')
    $(`#modal`).css(`display`, `block`)

    if($(`.res-collection`).children().length === 0) {
      $(`.res-collection`).append($(`<h1>`).attr(`class`, `no-listings`).text(`You have no Fortunes yet ... Spin The Wheel`))
    }
    // alert( citySearch.cityName + citySearch.cityID + citySearch.foodCollections)
  })
    .appendTo(`.foot-right`)

    //Create Event For Closing Modal
    $(`#modal-close`).on(`click`, () => {
      $(`#clickFx`).trigger('play')
      $(`#modal`).css(`display`, `none`)
    })

    /////////////////////////////
    /// Modal Intro Control/////
    ///////////////////////////
    $(`#modal-close-intro`).on(`click`, () => {
      $(`#clickFx`).trigger('play')
      $(`#modal-intro`).css(`display`, `none`)
    })
}

$(() => {
let citySearch = new SearchCity()
// console.log(citySearch)
// console.log(citySearch.cityName)
const totalSlices = 12
createUI(totalSlices)
createControls(citySearch, totalSlices)
const $startModal = $(`#modal-intro div`)

$(`<h2>`).text(`Welcome to Food and Fortune`).appendTo($startModal)

$(`<p>`).text(`Don't know where to eat? Spin the Food And Fortune Wheel!`)
.css(`padding-bottom`, `1em`).appendTo($startModal)

$(`<h3>`).text(`Load City ex: Denver, CO`).appendTo($startModal)

$(`<h3>`).text(`If City is found, the wheel loads 12 Food Collections specific to your city`)
.appendTo($startModal)

$(`<i>`).attr(`class`, `fas fa-sync-alt`).appendTo($(`<h3>`)
.text(`Click this icon to spin wheel & get your food fortunes: `).appendTo($startModal))

$(`<h3>`).text(`Scroll down on app for options`).appendTo($startModal)
$(`<h3>`).text(`Start over? Simply refresh your browser`).appendTo($startModal)

$(`<h2>`).text(`READY? LET'S GO FOR A SPIN!`).css(`margin-top`, `1em`).appendTo($startModal)
$(`<p>`).text(`Click "Close" above to begin`).appendTo($startModal)

$startModal.appendTo(`#modal-intro`)

$(`#modal-intro`).css(`display`, `block`)

})
