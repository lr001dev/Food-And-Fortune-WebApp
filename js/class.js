////////////////////////////////////////
/// Lets Create City Search Class /////
//////////////////////////////////////

class SearchCity {
  constructor(city) {
    this.cityName = ``
    this.cityID = ``
    this.foodCollections = []
    this.chosenFoodCollectionsIndexes = []
    this.foodCollectionsIDs = []
    this.restaurantSelection = []
  }
  //////////////////////////////////////////////////////////
  /// Method Connecting To Zomato API To Find City Id /////
  ////////////////////////////////////////////////////////

  //Connect to Zomato API and find city
  findCity (event, getCityFoodCollections, totalCollections, theCurrentInstance) {
    // const $doesDivExist = $(`.city div`)

    // if($doesDivExist.length === 0 ) {

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
        const cityName = cityResponse.location_suggestions[0].name
        // console.log(this.cityName)
        const cityID = cityResponse.location_suggestions[0].id
        // console.log(this.cityID)

        //Update the current instance
        this.updateInstance(cityName,cityID, theCurrentInstance)
        //Calling our callback funtion to trigger 2nd API Call. City ID Required by API.
        this.loadCityCollections(cityID, apiKey, totalCollections)
        //Lets append the new city value into the DOM
        $(`<h2>`).text(`${ this.cityName }`).appendTo($(`<div>`).appendTo(`.city`))
      }, (error) => {
        console.error(error)
        alert(`No Results Found. Please Try Again.`)
      })
      // console.log(this.cityName)
      //Clear previous spin
      // this.setupSpin(this.clearSpin)
      this.setupSpin()

      //Reset Input box and prevent page refresh
      $('.head-mid form').trigger('reset')
      event.preventDefault()
      // console.log(event)
    // } else if ($doesDivExist.length === 0  && this.cityName === undefined ) {
    //     alert(`Please Enter Your City To Begin Your Food Search`)
    // } else {
    //     alert(`Please Reset Your Seach Below`)
    // }
  }
  ////////////////////////////////////////////////////////
  /// Method Connecting To Zomato API To Find City /////
  //// Food Collections Based On City ID            ///
  ////////////////////////////////////////////////////

  loadCityCollections (cityID, key, collectionsLimit) {
    const baseURL = `https://developers.zomato.com/api/v2.1/collections?`
    const queryType = `city_id=`
    let queryURL = baseURL + key + `&` + queryType + cityID
    console.log(queryURL)
    $.ajax({
      url: queryURL
    }).then((collectionResponse) => {

      const foodCollectionsArray = []

      for(let i = 0; i < collectionResponse.collections.length; i++) {
        console.log(collectionResponse.collections[i].collection)
        foodCollectionsArray.push(collectionResponse.collections[i].collection)
      }

      const chosenIndexesArray = []
      console.log(`This the beg of my query` + collectionResponse)
      //Lets choose random indexes from collectionResponse to create our food categories
      for(let i = 0; i < collectionsLimit; i++) {
        // console.log(Math.floor(Math.random() * 24))
        let randomIndex = Math.floor(Math.random() * 25)
        if(chosenIndexesArray.includes(randomIndex)) {
          let checknumber = 0
          do {
            randomIndex = Math.floor(Math.random() * 25)
            checknumber++
          } while (chosenIndexesArray.includes(randomIndex))

          chosenIndexesArray.push(randomIndex)

        } else {
          chosenIndexesArray.push(randomIndex)
        }
      }
      console.log(`My Array ` + foodCollectionsArray)
      this.createWheelFoodCategories(foodCollectionsArray, chosenIndexesArray)
      //Lets append the new city value into the DOM
      // $(`<h2>`).text(`${ this.cityName }`).appendTo($(`<div>`).appendTo(`.city`))
    }, (error) => {
      console.error(error)
      alert(`No Results Found. Please Try Again.`)
    })
  }
  ///////////////////////////////////////////////////////////////////////////
  /// Method To Update Current SearchCity Instance With City Name & ID /////
  /////////////////////////////////////////////////////////////////////////

  updateInstance (theCity,theCityid, theCurrentInstance) {
    this.cityName = theCity
    this.cityID = theCityid
    console.log(this.cityName)
    console.log(this.cityID)
    console.log(theCurrentInstance)
  }
  /////////////////////////////////////////////////////////////////////
  /// Method To Update Current SearchCity Instance's Chosen Food /////
  /// Collections Indexes And Food Collections Array From The Query///
  //////////////////////////////////////////////////////////////////

  createWheelFoodCategories (foodCollections, arrayOfChosenIndexes) {
    this.foodCollections = foodCollections
    this.chosenFoodCollectionsIndexes = arrayOfChosenIndexes

    //console.log(`Array Of Collections ` + this.foodCollections)
    //console.log(`Array Of Chosen Indexes ` + this.chosenFoodCollectionsIndexes)

    for(let i = 0; i < this.chosenFoodCollectionsIndexes.length; i++) {
      let collectionIndex = this.chosenFoodCollectionsIndexes[i]
      this.foodCollectionsIDs.push(this.foodCollections[collectionIndex].collection_id)

      $(`.wheel-slice`).eq(i).text(``)
        .append( $(`<p>`)
        .text(` ${ this.foodCollections[collectionIndex].title } `) )
        .append( $(`<div>`).attr(`class`, `wheel-image`)
        .append( $(`<img>`).attr(`src`, ` ${ this.foodCollections[collectionIndex].image_url } `)
        .css(`width`, `3.5em`).css(`height`, `3.5em`).css(`border-radius`, `50%`) ) )
      // ${ this.foodCollections[this.chosenFoodCollectionsIndexes[i]].title }
      // console.log(this.foodCollections[this.chosenFoodCollectionsIndexes[i]])
    }
    $(`.circle-button`).toggleClass(`center-button`)
    $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `visible`)
    console.log(this.foodCollectionsIDs)
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
      // $(`.circle-button`).toggleClass(`spin-selector`)
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
      this.setupSpin ()
      // $(`.orb`).toggleClass(`hide`)
    }, 100 *  num)
    // return slice
  }
  //////////////////////////////////////
  /// Method To Trigger The Spin  /////
  ////////////////////////////////////

  //Lets trigger the spin
  setupSpin () {
    $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `visible`)
    //Create click listener for beginning spin
    $(`.circle-button`).on(`click`, () => {
      //Lets spin the wheel
      this.spinWheel(this.calculateSelections(),this.rotateSelector)
      this.clearSpin()
      $(`.circle-button`).off(`click`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`)
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
