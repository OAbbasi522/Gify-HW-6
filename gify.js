$(document).ready(function(){ 
    var cars = ["Porsche", "Honda", "Ford", "Corvette"]

    function populateButtons(arr, classtoAdd, areatoaddTo){
$(areatoaddTo).empty()
for(i = 0; i < arr.length; i ++){
    var button = $("<button>")
    button.addClass(classtoAdd)
    button.attr("data-type", arr [i])
    button.text(arr[i])
    $(areatoaddTo).append(button)

}
    }
    $(document).on("click", ".car-button", function(){
        console.log("Hello")
        $("#cars").empty()
        $(".car-button").removeClass("active")
        $(this).addClass("active")
        
    var apiKey = "ADoJYQEC8J2iJEC1TeZTRSmYUD342t13"
    var type = $(this).attr("data-type")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey + "&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET",

    })
    .then(function(response){
        var results = response.data;
        console.log(response)
        for(i = 0; i < results.length; i++){
            var carDiv = $("<div class=\"car-item\">")
            var rating = results[i].rating
            var p = $("<p>").text("rating: " + rating)
            var animated = results[i].images.fixed_height.url
            var still = results[i].images.fixed_height_still.url
            var carImage = $("<img>")
        carImage.attr("src", still)
        carImage.attr("data-still", still)
        carImage.attr("data-animate", animated)
        carImage.attr("data-state", "still")
        carImage.addClass("car-image")

        carDiv.append(p)
        carDiv.append(carImage)
        $("#cars").append(carDiv)
        
        }
    })

    })
    $(document).on("click", ".car-image", function(){
        var state = $(this).attr("data-state")
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animated")
        }
        
        else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")
        }
    })
    $("#add-car").on("click", function(event){
    event.preventDefault()
    var newCar = $("input").val()
    console.log(newCar)
    if(newCar.length > 2){
    cars.push(newCar)
    }
    populateButtons(cars, "car-button", "#car-buttons") 

    }) 


    populateButtons(cars, "car-button", "#car-buttons") 
})