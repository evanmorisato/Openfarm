var APIKey = "58944daba347098d464f8de4da9b4020";
var cityName = "Honolulu";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
  "q="+cityName+",US&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    //example on pulling specific parts of response
    console.log(response.list[0].main.temp);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);

    
  });

    // IMPORTANT: Fill in your client key
    var clientKey = "js-HcyB8lrvGFI2fZW0GZo95P5lLK0jc3YQRMmA4mL79E6PTgWTumaoYldUe5kKXqWU";
    //var zipAPI = "js-glhiZj22D73XBkeorCrlxvKtBtRrM7BbvV5nWImgiwcYzby5eGfCOlf3969Fh5vu"
    var cache = {};
    var container = $("#example1");
    var errorDiv = container.find("div.text-error");
    
    /** Handle successful response */
    function handleResp(data)
    {
        // Check for error
        if (data.error_msg)
            errorDiv.text(data.error_msg);
        else if ("city" in data)
        {
            // Set city and state
            container.find("input[name='city']").val(data.city);
            container.find("input[name='state']").val(data.state);
            console.log(data.city);
            console.log(data.state);
        }
    }
    
    // Set up event handlers
    container.find("input[name='zipcode']").on("keyup change", function() {
        // Get zip code
        var zipcode = $(this).val().substring(0, 5);
        if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
        {
            // Clear error
            errorDiv.empty();
            
            // Check cache
            if (zipcode in cache)
            {
                handleResp(cache[zipcode]);
            }
            else
            {
                // Build url
                //var ZIPurl = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/degrees";
               var ZIPurl = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/"+zipcode+"/degrees"
                // Make AJAX request
                console.log(ZIPurl)
                $.ajax({
                    url: ZIPurl,
                    method: "GET",
                    "dataType": "json"
                }).done(function(data) {
                    handleResp(data);
                    console.log(data);
                    
                    // Store in cache
                    cache[zipcode] = data;
                }).fail(function(data) {
                    if (data.responseText && (json = $.parseJSON(data.responseText)))
                    {
                        // Store in cache
                        cache[zipcode] = json;
                        
                        // Check for error
                        if (json.error_msg)
                            errorDiv.text(json.error_msg);
                    }
                    else
                        errorDiv.text('Request failed.');
                });
            }
        }
    }).trigger("change");
