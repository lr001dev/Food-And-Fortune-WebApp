////////////////////////////////////////
/// Lets Create City Search Class /////
//////////////////////////////////////

class SearchCity {
  constructor(city) {
    this.cityName = ``
    this.cityID = ``
    this.foodCollections = []
    this.restaurantSelection = []
  }
  //////////////////////////////////////////////////////////
  /// Method Connecting To Zomato API To Find City Id /////
  ////////////////////////////////////////////////////////

  //Connect to Zomato API and find city
  findCity (event) {
    const $doesDivExist = $(`.city div`)

    if($doesDivExist.length === 0 ) {

      ///////////////////////////////////
      ////Lets Build Our Ajax Call To API
      //////////////////////////////////

      const baseURL = `https://developers.zomato.com/api/v2.1/cities?`
      const apiKey = `apikey=6500da95eb7ae54c977d83022574f182`
      const queryType = `q=`
      const countQuery = `count=3`
      //Grabbing value from input on form
      let $loadCityQuery = $(`#inputBox`).val()
      let $encodedCityQuery = encodeURI($(`#inputBox`).val())
      //Constructing our ajax url
      let queryURL = baseURL + apiKey + `&` + queryType + $encodedCityQuery + `&` + countQuery
      console.log(queryURL)

      /////////////////////////
      ////Here's Our Ajax Call
      ////////////////////////

      $.ajax({
        url: queryURL
      }).then((cityResponse) => {
        console.log(cityResponse)
        //Add City name to SearchCity Instance
        this.cityName = cityResponse.location_suggestions[0].name
        // console.log(this.cityName)
        this.cityID = cityResponse.location_suggestions[0].id
        // console.log(this.cityID)
        //Lets append the new city value into the DOM
        $(`<h2>`).text(`${ this.cityName }`).appendTo($(`<div>`).appendTo(`.city`))

      }, (error) => {
        console.error(error)
        alert(`No Results Found. Please Try Again.`)
      })
      //Clear previous spin
      this.setupSpin(this.clearSpin)

      //Reset Input box and prevent page refresh
      $('.head-mid form').trigger('reset')
      event.preventDefault()
      // console.log(event)
    } else if ($doesDivExist.length === 0  && this.cityName === undefined ) {
        alert(`Please Enter Your City To Begin Your Food Search`)
    } else {
        alert(`Please Reset Your Seach Below`)
    }
  }
  ////////////////////////////////////////////////////////////////////////
  /// Method To Simulating Rotation Of Wheel By Toggling CSS Classes /////
  ///////////////////////////////////////////////////////////////////////

  //Toggle classes to simulate spin in with 100ms intervals
  rotateSelector (currentLoop,selectTheSlice,callback) {
    setTimeout(() => {
      console.log(`loop `  + currentLoop)
      console.log(`index is `  + selectTheSlice)
      $(`#bleepFx`).trigger('play')
      $(`.wheel-slice`).eq(selectTheSlice).toggleClass(`spin-selector`)
      $(`.wheel-slice`).eq(selectTheSlice).toggleClass(`wheel-select`)
      $(`.circle-button`).toggleClass(`spin-selector`)
      $(`.circle-button-tiny`).toggleClass(`spin-selector`).css(`visibility`, `visible`)
      $(`.wheel-slice`).eq(selectTheSlice-1).toggleClass(`spin-selector`)
      $(`.wheel-slice`).eq(selectTheSlice-1).toggleClass(`wheel-select`)
    }, 100 * currentLoop)
  }
  ///////////////////////////////////////////////////////////////////
  /// Method To Calculate Random Number Of Rotating Selections  /////
  //////////////////////////////////////////////////////////////////

  //Calculate the number of selections in a spin
  calculateSelections () {
    return  Math.floor(Math.random() * 80)+24
  }
  /////////////////////////////////////////////////////
  /// Method To Calculate Total Number Of Spins  /////
  ///////////////////////////////////////////////////

  //Calculating total # of rotating selections
  spinWheel (spins, sliceSelector) {
    console.log(spins)
    //Category Ids from Zomato API
    const myArray = [0,1,2,3,4,5,6,7,8,9,10,11]
    let num = ``
    let slice = ``
    //Looping based on number of random number of spins
    for(let i = 0; i <= spins; i++) {
      slice = Math.round( ((i/myArray.length) - Math.floor(i/myArray.length)) * myArray.length )
      //Calling sliceSelector callback which really is this.rotateSelector ... Big on on/off switch
      sliceSelector(i,slice)
      num = i
    }
    console.log(slice)
    //Disable orb `hide` css class and display orb pop up after set interval
    setTimeout(() => {
      // $(`.orb`).toggleClass(`hide`)
    }, 100 *  num)
    // return slice
  }
  //////////////////////////////////////
  /// Method To Trigger The Spin  /////
  ////////////////////////////////////

  //Lets trigger the spin
  setupSpin () {
    //Create click listener for beginning spin
    $(`.circle-button`).text(`S`).on(`click`, () => {
      //Lets spin the wheel
      this.spinWheel(this.calculateSelections(),this.rotateSelector)
      this.clearSpin()
    })
  }
  ///////////////////////////////////////////
  /// Method To Clear The Current Spin /////
  /////////////////////////////////////////

  //Lets clear the css classes for the selector on the wheel
  clearSpin () {
    $(`.wheel-slice`).removeClass(`spin-selector wheel-select`)
    $(`.circle-button-tiny`).removeClass(`spin-selector`).css(`visibility`, `none`)
    $(`.circle-button`).removeClass(`spin-selector`)
    $(`.wheel-slice`).eq(11).toggleClass(`spin-selector`)
    $(`.wheel-slice`).eq(11).toggleClass(`wheel-select`)
  }
}
