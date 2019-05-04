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
    this.myFortuneCookie = ''
  }
  //////////////////////////////////////////////////////////
  /// Method Connecting To Zomato API To Find City Id /////
  ////////////////////////////////////////////////////////

  //Connect to Zomato API and find city
  findCity (event, getCityFoodCollections, totalCollections, theCurrentInstance) {

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
        $(`#voxFx`).trigger('play').prop("volume", 0.3)

        //Trigger music playback when user begins search
        $(`#musicMain`).trigger('play').prop("volume", 0.1)

      }, (error) => {
        console.error(error)
        alert(`No Results Found. Please Try Again.`)
      })

      //Reset Input box and prevent page refresh
      $('.head-mid form').trigger('reset')
      event.preventDefault()
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
      let foodCollectionsArray = []

      //Looping through the collectionResponse array of objects to construct our new array above
      for(let i = 0; i < collectionResponse.collections.length; i++) {

        //Checking To See If We Have A Result
        console.log(`Looping Through Each Collections Object for city ${ cityID } ` + collectionResponse.collections[i].collection.title)

        //Lets select each collection object and push to foodCollectionsArray
        foodCollectionsArray.push(collectionResponse.collections[i].collection)

        console.log( `Checking New foodCollectionsArray for city ${ cityID }. We should see something here ` + foodCollectionsArray )
      }

      //Lets choose random indexes from our foodCollectionsArray and
      //create a new array with collectionsLimit ids

      //We are pushing our chosen ids from below logic to create our food collections choices
      let chosenIndexesArray = []

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

      foodCollectionsArray = []
      chosenIndexesArray = []

    }, (error) => {
      console.error(error)
      alert(`No Results Found. Please Try Again.`)
    })

    this.getFortuneCookie()
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
      let restaurantsArray = []
      //Lets Push Winning Restaurant Into winningRestaurantArray

      let winningRestaurantArray = []
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


      this.updateInstanceRestaurant(winningRestaurantArray[0], delay, theWinningCollectionId)
      restaurantsArray = []
      winningRestaurantArray = []
    }, (error) => {
      console.error(error)
      alert(`No Results Found. Please Try Again.`)
    })
  }
  ///////////////////////////////////////////////////////
  ////Method To Request Fortunes From Fortune Cookie API
  //////////////////////////////////////////////////////

  getFortuneCookie() {
    let randomIndex = Math.floor(Math.random() * 544)

    $.ajax({
      url: `https://fortunecookieapi.herokuapp.com/v1/fortunes?limit=544`
    }).then( (fortuneCookie) => {

      console.log(`What does our fortune cookie say? ${fortuneCookie[randomIndex].message}`)
      this.updateInstanceFortune(fortuneCookie[randomIndex])
    }, (error) => {
        console.error(error)
        alert(`No Fortune Cookie Results Found. Please Try Again.`)
    } )
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

  updateInstanceRestaurant (myListing, timeDelay, listingCollection) {
    this.myRestaurantListings.push(myListing)

    //Testing the result to make sure we have a listing
    console.log( `Current Instance myRestaurantListings Name is `
    + this.myRestaurantListings[0].name + ` cuisine is ` + this.myRestaurantListings[0].cuisines )

      //Delay Listing Display For After The Wheel Is Done Spinning
      setTimeout(() => {
        ///////////////////////////////////
        ////Prepare Restaurant Data For DOM
        ///////////////////////////////////

        //Let's Find The Wining Collection & Grab Key Values To Prepare For DOM
        let collectionTitle = ''
        let collectionDescription = ''
        let collectionImageUrl = ''

        this.foodCollections.forEach((object) => {
          if(object.collection_id === listingCollection) {

            collectionTitle = object.title
            console.log(`Checking to see if we can locate winning collection title: ${ collectionTitle }`)

            collectionDescription = object.description
            console.log(`Checking to see if we can locate winning collection description: ${ collectionDescription }`)

            collectionImageUrl = object.image_url
            console.log(`Checking to see if we can locate winning collection image url: ${ collectionImageUrl }`)
          }
        })
        //Lets Grab Last Restaurant Object At Last Index Of Array
        let theLastIndex = this.myRestaurantListings.length - 1
        console.log(`Selecting Last Element: ${ this.myRestaurantListings[theLastIndex].name  }`)

        let name = this.myRestaurantListings[theLastIndex].name
        let userRating = this.myRestaurantListings[theLastIndex].user_rating.aggregate_rating
        let userRatingText = this.myRestaurantListings[theLastIndex].user_rating.rating_text
        let userRatingColor = this.myRestaurantListings[theLastIndex].user_rating.rating_color
        let averageCost = `$ ${ this.myRestaurantListings[theLastIndex].average_cost_for_two }`
        let cuisines = this.myRestaurantListings[theLastIndex].cuisines
        let address = this.myRestaurantListings[theLastIndex].location.address
        let locality = this.myRestaurantListings[theLastIndex].location.locality
        let city = this.myRestaurantListings[theLastIndex].location.city
        let zipCode = this.myRestaurantListings[theLastIndex].location.zipcode

          console.log($(`#resId-${ theLastIndex } .res-name`))
          console.log(`The Current Res Name is ${ this.myRestaurantListings[theLastIndex].name }` )
          console.log( theLastIndex )
          //Lets Check If It's First Listing In DOM
          if(theLastIndex === 0) {

          //Remove Default Message
          $(`.no-listings`).remove()

          //Add Fortune
          $(`#fortune`).css(`visibility`, `hidden`).append($(`<h3>`).text(`Your Fortune Cookie:`))
          .append($(`<p>`).text(`"${ this.myFortuneCookie.message }"`))

          //Add Data To Restaurant Header
          $(`#resId-${ theLastIndex } .res-collection`).append($(`<h1>`)
            .text(`${ collectionTitle } Collection in ${ city }`))

          $(`#resId-${ theLastIndex } .res-collection`).append($(`<img>`).attr(`src`, `${ collectionImageUrl }`))
          $(`#resId-${ theLastIndex } .res-collection`).append($(`<p>`).text(`${ collectionDescription }`))
          $(`#resId-${ theLastIndex } .res-name`).append($(`<h1>`).text(`${ name }`))
          $(`#resId-${ theLastIndex } .res-ratings`).append($(`<p>`).text(`${ userRating  }`))
          $(`#resId-${ theLastIndex } .res-ratings`).append($(`<p>`).text(`${ userRatingText  }`))
          $(`#resId-${ theLastIndex } .res-ratings`).append($(`<p>`).text(`${ userRatingColor  }`))

          //Add Data To Restaurant Body
          $(`#resId-${ theLastIndex } .cuisines`).text(`Cuisines:`).append($(`<p>`).text(`${ cuisines  }`))

          $(`#resId-${ theLastIndex } .average_cost`)
          .text(`Average Cost For 2:`).append($(`<p>`).text(`${ averageCost  }`))

          $(`#resId-${ theLastIndex } .address`).text(`Address:`).append($(`<p>`).text(`${ address }`))
          $(`<p>`).text(`${ locality }`).appendTo(`.address`)
          $(`<p>`).text(`${ city }`).appendTo(`.address`)
          $(`<p>`).text(`${ zipCode }`).appendTo(`.address`)
        }
          else {
            console.log(`this is now true`)

            //Create And Append New Restaurant Data To DOM
            const $modalSelector = $(`#modal`)
            const $resContainer = $(`<div>`).attr(`id`, ` resId-${ theLastIndex } `).attr(`class`, `listings`)
            const $resHead = $(`<div>`).attr(`class`, `res-head`).appendTo($resContainer)
            const $resBody = $(`<div>`).attr(`class`, `res-body`).appendTo($resContainer)

            const $resCollection = $(`<div>`).attr(`class`, `res-collection`).appendTo($resHead)
            $(`<h1>`).text(`${ collectionTitle } Collection in ${ city }`).appendTo($resCollection)
            $(`<img>`).attr(`src`, `${ collectionImageUrl }`).appendTo($resCollection)
            $(`<p>`).text(`${ collectionDescription }`).appendTo($resCollection)

            const $resName =  $(`<div>`).attr(`class`, `res-name`).appendTo($resHead)
            $(`<h1>`).text(`${ name }`).appendTo($resName)

            const $resRatings = $(`<div>`).attr(`class`, `res-ratings`).appendTo($resHead)
            $(`<p>`).text(`${ userRating  }`).appendTo($resRatings)
            $(`<p>`).text(`${ userRatingText  }`).appendTo($resRatings)
            $(`<p>`).text(`${ userRatingColor  }`).appendTo($resRatings)

            const $h2Cuisines = $(`<h2>`).attr(`class`, `cuisines `).text(`Cuisines:`)
            .append($(`<p>`).text(`${ cuisines }`)).appendTo($resBody)

            const $h2Cost = $(`<h2>`).attr(`class`, `average_cost`).text(`Average Cost For 2:`)
            .append($(`<p>`).text(`${ averageCost }`)).appendTo($resBody)

            const $h2Address = $(`<h2>`).attr(`class`, `address`).text(`Address:`).appendTo($resBody)
            $(`<p>`).text(`${ address  }`).appendTo($h2Address)
            $(`<p>`).text(`${ locality }`).appendTo($h2Address)
            $(`<p>`).text(`${ city }`).appendTo($h2Address)
            $(`<p>`).text(`${ zipCode }`).appendTo($h2Address)

            //Lets Finally Instert Into The DOM
            $(`#fortune`).after($resContainer)
            console.log($(`.listings`))
          }
          console.log(`The Current Listing ` + this.myRestaurantListings[theLastIndex])
        $(`#fortune`).css(`visibility`, `visible`)
        $(`#modal`).css(`display`, `block`)
      // $(`.orb`).toggleClass(`hide`)
      console.log(`I'm The orb`)
    } , 100 *  timeDelay)
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
    $(`#pressFx02`).trigger('play').prop("volume", 0.2)
    console.log(`These are the collection ids in an array from the last api call not the indexes array ` + this.foodCollectionsIDs)
    this.setupSpin()
  }
  /////////////////////////////////////////////////////
  ////Updating The Instance With Fortune Cookie Message
  /////////////////////////////////////////////////////

  updateInstanceFortune (theFortuneMessage) {
    this.myFortuneCookie = theFortuneMessage
    console.log(`This is the fortune message: ${ theFortuneMessage }`)
    console.log(`This is the saved fortune message: ${ this.myFortuneCookie.message }`)
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
    const $checkCircleButton = $(`.circle-button .center-button`)
    console.log( `Checking if button is visible, if 0 display button ` + $checkCircleButton.length )
    if($checkCircleButton.length === 0) {
      $(`.circle-button`).toggleClass(`center-button`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `visible`)
    }
    //Create click listener for beginning spin
    $(`.circle-button`).on(`click`, () => {
      //Lets spin the wheel
      $(`#pressFx01`).trigger('play').prop("volume", 0.2)
      this.spinWheel(this.calculateSelections(),this.rotateSelector)
      this.clearSpin()
      $(`.circle-button`).off(`click`)
      $(`#inner-wheel`).unbind(`touchstart`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`)
    })
    //Create Touch Screen Listener
    $(`#inner-wheel`).bind(`touchstart`, (event) => {
      $(`#pressFx01`).trigger('play').prop("volume", 0.2)
      this.spinWheel(this.calculateSelections(), this.rotateSelector)
      this.clearSpin()
      $(`#inner-wheel`).unbind(`touchstart`)
      $(`.circle-button`).off(`click`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`)
    })
  }
  /////////////////////////////////////////////////////
  /// Method To Calculate Total Number Of Spins  /////
  ///////////////////////////////////////////////////

  //Calculating total # of rotating selections
  spinWheel (spins, sliceSelector) {
    console.log(`Total number of spins: ${ spins }`)
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
    console.log(`We are selcting slice# ${ slice }`)

    //this.foodCollectionsIDs[slice] Grabs the Food Collection ID from the array
    //The this.foodCollectionsIDs array is in the same index order as $(`.wheel-slice`)
    console.log(`Checking to see if this mataches what's currently on the wheel ${ this.foodCollectionsIDs[slice] }`)
    let winningId = this.foodCollectionsIDs[slice]
    console.log(`The Winning Food Collection ID Before Load @ Index ${ slice } with id ${ winningId }` )
    //Lets call this function and pass the above as parameters so we can make another
    //API call for this spin. We will locate and actual restaurant and display to user
    //We need varaible num here so we can sync settimeout in this.loadRestaurant()
    //with triggers that occur at the end of the spin
    this.loadRestaurant(winningId,num)

    //Disable orb `hide` css class and display orb pop up after set interval
    setTimeout(() => {
      this.setupSpin ()
      $(`.circle-button`).toggleClass(`center-button`)
      $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `visible`)
      // $(`.orb`).toggleClass(`hide`)
    }, 100 *  num)
  }
  ////////////////////////////////////////////////////////////////////////
  /// Method To Simulating Rotation Of Wheel By Toggling CSS Classes /////
  ///////////////////////////////////////////////////////////////////////

  //Toggle classes to simulate spin in with 100ms intervals
  rotateSelector (currentLoop,selectTheSlice) {
    setTimeout(() => {
      console.log(`loop `  + currentLoop)
      console.log(`index is `  + selectTheSlice)
      $(`#bleepFx`).trigger('play').prop("volume", 0.1)
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
    // $(`.circle-button-tiny`).removeClass(`spin-selector`).css(`visibility`, `none`)
    $(`.circle-button`).removeClass(`spin-selector`)
    $(`.wheel-slice`).eq(11).toggleClass(`spin-selector`)
    $(`.wheel-slice`).eq(11).toggleClass(`wheel-select`)
    console.log(`Clearing Spin`)
  }
  ///////////////////////////////////
  /// Method To Reset The Wheel /////
  //////////////////////////////////

  //Couldn't get this to work
  resetSearch (citySearch) {
    console.log(`alert`)
    //Remove previous city from DOM
    $(`.city`).children().remove()

    //Clear The Wheel
    $(`.wheel-slice`).removeClass(`spin-selector wheel-select`)
    $(`.wheel-slice`).children().remove()

    //Disable spinWheel Click
    $(`.circle-button`).toggleClass(`center-button`)
    $(`i`).attr(`class`, `fas fa-sync-alt`).css(`visibility`, `hidden`)
    $(`.circle-button`).off()

    //Reset Ids array ... Work around, not sure yet why we have to do this here.
    this.foodCollectionsIDs = []

    //Create a new SearchCity instance
    citySearch = new SearchCity()

    //Is Our New Instance Fresh & New?
    console.log(citySearch)
  }
}
