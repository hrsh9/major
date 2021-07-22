// Funtion for triggering search button by clicking enter
document.getElementById("title")
    .addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.keyCode === 13)
        {
            document.getElementById("submit").click();
        }
    });
// ~~~~~~~~~~~~~~~~~~~~~~~END~~~~~~~~~~~~~~~~~~~~~~~~~

//Function triggered after clicking on search button
$(document).ready(() => {

    $("#submit").click(()=>{

        event.preventDefault();

        let searchByTitle=document.getElementById("title").value;
        let searchByYear=document.getElementById("year").value;

        if(searchByTitle!="" && searchByYear!="")
        {
            getMovieDetails(searchByTitle,searchByYear);
            getYtTrailer(searchByTitle);
        }
        else if(searchByTitle!="")
        {
            getMovieDetails(searchByTitle);
            getYtTrailer(searchByTitle);
        }
        else
        {
            alert("First Input Some Data");
        }

    });

});
//~~~~~~~~~~~~~~~~~~~~~~~END~~~~~~~~~~~~~~~~~~~~~~~~~~~

// fUNCTION FOR FETCHING DETAILS FROM imdb API
let getMovieDetails = (searchByTitle,searchByYear) => {

    console.log("making request")

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async:true,
        url:'https://www.omdbapi.com/?t='+searchByTitle+'&y='+searchByYear+'&apikey=df789615 ', // URL of getting data
        success: (data) => {
                        let response = data.Response;

                        if (response == "True") {
                            let poster
                            if (data.Poster != "N/A")
                                poster = data.Poster;
                            else
                                poster = "image_not_found.png";

                                //selected fields whose that we want to fetch

                                responseData = `
                                    <tr><td></td><td style="text-align: center;"><img src="${poster}" height="250px" width="250px"></td></tr>
                                    <tr><td><b>Title</td><td><b>${data.Title}</td></tr>
                                    <tr><td><b>Year</td><td><b>${data.Year}</td></tr>
                                    <tr><td><b>imdbID</td><td><b>${data.imdbID}</td></tr>
                                    <tr><td><b>Rated</td><td><b>${data.Rated}</td></tr>
                                    <tr><td><b>Released</td><td><b>${data.Released}</td></tr>
                                    <tr><td><b>Runtime</td><td><b>${data.Runtime}</td></tr>
                                    <tr><td><b>Genre</td><td><b>${data.Genre}</td></tr>
                                    <tr><td><b>Director</td><td><b>${data.Director}</td></tr>
                                    <tr><td><b>Actors</td><td><b>${data.Actors}</td></tr>
                                    <tr><td><b>Plot</td><td><b>${data.Plot}</td></tr>
                                    <tr><td><b>imdbRating</td><td><b>${data.imdbRating}</td></tr>`;
                        }
                        else if (response == "False") {
                            alert("No Movie Found With The Given Details");
                        }


            $("#infoTable").html(responseData);


        },
        error: (data) => { // in case of error response

            alert("ERROR");

        },

        timeout:9999 // this is in milli seconds

    }); // end of AJAX request
}// END OF FUNCTION WHICH FETCH DATA FROM API

