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
    this.myRestaurantListings = []
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
      console.log( `Our new find city query url is ` + queryURL )

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
        this.updateInstanceCity(cityName,cityID, theCurrentInstance)
        //Calling our callback funtion to trigger 2nd API Call. City ID Required by API.
        this.loadCityCollections(cityID, apiKey, totalCollections)
        //Lets append the new city value into the DOM
        $(`<h2>`).text(`${ this.cityName }`).appendTo($(`<div>`).appendTo(`.city`))

        //Trigger Vox Fx Playback
        $(`#voxFx`).trigger('play')

        //Trigger music playback when user begins search
        $(`#musicMain`).trigger('play').prop("volume", 0.1)

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
    console.log(`Our new load food collections query url is ` + queryURL)

    /////////////////////////
    ////Here's Our Ajax Call
    ////////////////////////

    $.ajax({
      url: queryURL
    }).then((collectionResponse) => {
      console.log( `Retrieved Food Collections Query ` + collectionResponse )
      console.log( `The length of the Food Collections List is ` + collectionResponse.collections.length )

      //Lets Push All The Food Collections Objects Into This Array
      const foodCollectionsArray = []

      //Looping through the collectionResponse array of objects to construct our new array above
      for(let i = 0; i < collectionResponse.collections.length; i++) {

        //Checking To See If We Have A Result
        console.log(`Looping Through Each Collections Object ` + collectionResponse.collections[i].collection.title)

        //Lets select each collection object and push to foodCollectionsArray
        foodCollectionsArray.push(collectionResponse.collections[i].collection)

        console.log( `Checking foodCollectionsArray. We should see something here ` + foodCollectionsArray )
      }

      //Lets choose random indexes from our foodCollectionsArray and
      //create a new array with collectionsLimit ids

      //We are pushing our chosen ids from below logic to create our food collections choices
      const chosenIndexesArray = []

      //Lets choose random indexes from collectionResponse to create our food categories
      for(let i = 0; i < collectionsLimit; i++) {
        // console.log(Math.floor(Math.random() * 24))
        let randomIndex = Math.floor(Math.random() * collectionResponse.collections.length)
        if(chosenIndexesArray.includes(randomIndex)) {
          let checknumber = 0
          do {
            randomIndex = Math.floor(Math.random() * collectionResponse.collections.length)
            checknumber++
          } while (chosenIndexesArray.includes(randomIndex))

          chosenIndexesArray.push(randomIndex)

        } else {
          chosenIndexesArray.push(randomIndex)
        }
      }
      console.log( `Checking chosenIndexesArray. We should see something here ` + chosenIndexesArray )

      //Lets append to the DOM with chosen response
      this.createWheelFoodCategories(foodCollectionsArray, chosenIndexesArray)

    }, (error) => {
      console.error(error)
      alert(`No Results Found. Please Try Again.`)
    })
  }
  ////////////////////////////////////////////////////////
  /// Method Connecting To Zomato API To Find A Random ///
  //// Restaurant Based On Food Collection ID         ///
  //////////////////////////////////////////////////////

  loadRestaurant(theWinningCollectionId, delay) {
    console.log(`Loading Restaurant List From Collection ID `+ theWinningCollectionId)
    const baseURL = `https://developers.zomato.com/api/v2.1/search?`
    const apiKey = `apikey=6500da95eb7ae54c977d83022574f182`
    const queryEnityID = `entity_id=`
    const queryEnityType = `entity_type=city`
    const queryCollectionID = `collection_id=`

    //Constructing our ajax url
    let queryURL = baseURL + apiKey + `&` + queryEnityID + this.cityID + `&` +
    queryEnityType + `&` + queryCollectionID + theWinningCollectionId
    console.log( `Our new load restaurant query url is ` + queryURL )

    /////////////////////////
    ////Here's Our Ajax Call
    ////////////////////////

    $.ajax({
      url: queryURL
    }).then( (restaurantsResponse) => {
      console.log( `Retrieved Restaurant Query ` + restaurantsResponse )
      console.log( `The length of the returned Restaurant List is ` + restaurantsResponse.restaurants.length)

      //Lets Choose A Random Index From restaurantsResponse
      const randomIndex = Math.floor( Math.random() * restaurantsResponse.restaurants.length )

      //Lets Push All The Restaurant Objects From Our Query Into restaurantsArray
      const restaurantsArray = []
      //Lets Push Winning Restaurant Into winningRestaurantArray

      const winningRestaurantArray = []
      //Looping through the restaurantsResponse array of objects to constructor are new array above
      for(let i = 0; i < restaurantsResponse.restaurants.length; i++) {

        //Checking To See If We Have A Results
        console.log( `Checking Restaurant Names ... Is It Working? `+ restaurantsResponse.restaurants[i].restaurant.name )

        //Lets select each collection object and push to restaurantsArray
        restaurantsArray.push( restaurantsResponse.restaurants[i].restaurant )
      }
      console.log( `Checking restaurantsArray. We should see something here ` + restaurantsArray )

      winningRestaurantArray.push(restaurantsArray[randomIndex])

      console.log( `Checking To See If We Selected A Restaurant...
                    Name here? ${ winningRestaurantArray[0].name}
                    was located at index ${ randomIndex } from restaurantsArray` )

      console.log( `Checking To See If We Restaurant Object...
                    Do We See it here? ${ winningRestaurantArray[0]}` )


      this.updateInstanceRestaurant(winningRestaurantArray[0], delay)
    }, (error) => {
      console.error(error)
      alert(`No Results Found. Please Try Again.`)
    })
  }
  ///////////////////////////////////////////////////////////////////////////
  /// Method To Update Current SearchCity Instance With City Name & ID /////
  /////////////////////////////////////////////////////////////////////////

  updateInstanceCity (theCity,theCityid, theCurrentInstance) {
    this.cityName = theCity
    this.cityID = theCityid
    console.log( `Current City Name For This Instance is ` + this.cityName)
    console.log( `Current City ID For This Instance is ` + this.cityID)
    console.log(`Current Instance Constructor is ` + theCurrentInstance)
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  /// Method To Update Current SearchCity Instance With Selected Restaurant Listings /////
  ////////////////////////////////////////////////////////////////////////////////////////

  updateInstanceRestaurant (myListing, timeDelay) {
    this.myRestaurantListings.push(myListing)

    //Testing the result to make sure we have a listing
    console.log( `Current Instance myRestaurantListings Name is `
    + this.myRestaurantListings[0].name + ` cuisine is ` + this.myRestaurantListings[0].cuisines )

      setTimeout(() => {

        //Lets Loop Through Our myRestaurantListings Array To Retrieve Restaurant Info
        const $checkResBody = $(`.res-body`)
        let currentElement = 0

        for(let i = 0; i < this.myRestaurantListings.length; i++) {
          const $checkFirstListing = $(`#resId-${ i } h1.res-name`).children().length
          console.log(`Any Children? ${ $checkFirstListing }`)

          //Prepare Restaurant Data For DOM
          const name = this.myRestaurantListings[i].name
          const userRating = this.myRestaurantListings[i].user_rating.aggregate_rating
          const userRatingText = this.myRestaurantListings[i].user_rating.rating_text
          const userRatingColor = this.myRestaurantListings[i].user_rating.rating_color
          const averageCost = `$ ${ this.myRestaurantListings[i].average_cost_for_two }`
          const cuisines = this.myRestaurantListings[i].cuisines
          const address = this.myRestaurantListings[i].location.address
          const locality = this.myRestaurantListings[i].location.locality
          const city = this.myRestaurantListings[i].location.city
          const zipCode = this.myRestaurantListings[i].location.zipcode

            if( i === 0 ) {

              console.log($(`#resId-${ i } .res-name`))
              console.log(`The Current Res Name is ${ this.myRestaurantListings[i].name }` )
              console.log( i )

              //Add Data To Restaurant Header
              $(`#resId-${ i } .res-name`).append($(`h1`).text(`${ name }`))
              $(`#resId-${ i } .res-ratings`).append($(`<p>`).text(`${ userRating  }`))
              $(`#resId-${ i } .res-ratings`).append($(`<p>`).text(`${ userRatingText  }`))
              $(`#resId-${ i } .res-ratings`).append($(`<p>`).text(`${ userRatingColor  }`))

              //Add Data Restaurant Body
              $(`#resId-${ i } .cuisines`).text(`Cuisines`).append($(`<p>`).text(`${ cuisines  }`))
              $(`#resId-${ i } .average_cost`).text(`Average Cost For 2`).append($(`<p>`).text(`${ averageCost  }`))
              $(`#resId-${ i } .address`).text(`Address`).append($(`<p>`).text(`${ address }`))
              $(`<p>`).text(`${ locality }`).appendTo(`.address`)
              $(`<p>`).text(`${ city }`).appendTo(`.address`)
              $(`<p>`).text(`${ zipCode }`).appendTo(`.address`)
              
            } else {
              $(`<div>`).attr(`id`, `resId-${ i + 1 }`).addClass(`listings`).appendTo(`#modal`)
            }
              console.log(this.myRestaurantListings[i])
        }
        $(`#modal`).css(`display`, `block`)
      $(`.orb`).toggleClass(`hide`)
      console.log(`I'm The orb`)
    }, 100 *  timeDelay)
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
    $(`#pressFx02`).trigger('play')
    $(`.circle-button`).toggleClass(`center-button`)
    $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `visible`)
    console.log(this.foodCollectionsIDs)
  }
  ///////////////////////////////////////////////////////////////////
  /// Method To Calculate Random Number Of Rotating Selections  /////
  //////////////////////////////////////////////////////////////////

  //Calculate the number of selections in a spin
  calculateSelections () {
    return  Math.floor(Math.random() * 80)+24
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
      $(`#pressFx01`).trigger('play')
      this.spinWheel(this.calculateSelections(),this.rotateSelector)
      this.clearSpin()
      $(`.circle-button`).off(`click`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`)
    })
  }
  /////////////////////////////////////////////////////
  /// Method To Calculate Total Number Of Spins  /////
  ///////////////////////////////////////////////////

  //Calculating total # of rotating selections
  spinWheel (spins, sliceSelector) {
    console.log(spins)
    //Category Ids from Zomato API
    const myArray = this.foodCollectionsIDs
    let num = ``
    let slice = ``
    //Looping based on number of random number of spins
    for(let i = 0; i <= spins; i++) {
      slice = Math.round( ((i/myArray.length) - Math.floor(i/myArray.length)) * myArray.length )
      //Calling sliceSelector callback which really is this.rotateSelector ... Big on on/off switch
      sliceSelector(i,slice)
      num = i
    }
    //(slice) Represents the chosen index of $(`.wheel-slice`) containing
    //Food Collection Category On The Wheel
    console.log(slice)

    //this.foodCollectionsIDs[slice] Grabs the Food Collection ID from the array
    //The this.foodCollectionsIDs array is in the same index order as $(`.wheel-slice`)
    console.log(this.foodCollectionsIDs[slice])
    const winningId = this.foodCollectionsIDs[slice]
    console.log(`The Winning Food Collection ID Before Load @ Index ${ slice }` + winningId)
    //Lets call this function and pass the above as parameters so we can make another
    //API call for this spin. We will locate and actual restaurant and display to user
    //We need varaible num here so we can sync settimeout in this.loadRestaurant()
    //with triggers that occur at the end of the spin
    this.loadRestaurant(winningId,num)

    //Disable orb `hide` css class and display orb pop up after set interval
    setTimeout(() => {
      this.setupSpin ()
      // $(`.orb`).toggleClass(`hide`)
    }, 100 *  num)
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
