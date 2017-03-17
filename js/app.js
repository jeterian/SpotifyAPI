'use strict';

// wrap JS file and load HTML
$(document).ready(function(){
  $(".search-form").submit(function(e){
    //prevent default form submission
    e.preventDefault();
    var spotifyAPI = "https://api.spotify.com/v1/search"
    var searchAlbums = {
      q: $("#search").val(),
      type: "album"
    };
    var appHTML;

    //function to display results
    function albumsHTML (data){

      // IF the search returns albums
      if(data.albums.items.length > 0){
        //loops through the returned list of albums to build HTML
        $.each(data.albums.items, function(i, album){
          appHTML += '<li><a class="album-link" href=' + album.external_urls.spotify + '>';
          appHTML += '<div class="album-wrap">';
          appHTML += '<img class="album-art" src="'+ album.images[0].url +'"></div>';
          appHTML += '<span class="album-title">'+ album.name + '</span>';
          appHTML += '<span class="album-artist">'+ album.artists[0].name + '</span></a></li>';
          $("#albums").append(appHTML);
        });
        // ELSE you get a message including the failed search term
      }else{
        $("ul li").hide();
        appHTML = "<li class='no-albums desc'>";
        appHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: "+ $("#search").val() +".</li>";
        $("#albums").append(appHTML);
      }
    };
    // use JSON to call API
    $.get(spotifyAPI, searchAlbums, albumsHTML, "json");
  });
});
