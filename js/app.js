// wrap JS in one function
$('form').submit(function (e) {

  // variables, prevent default and other set up
    e.preventDefault();
    var seaField = $('#search');
    var searchTerm = seaField.val();
    seaField.prop("disabled", true);
    var submit = $('#submit');
    submit.attr("disabled", true).val();
    var spotifyAPI = "https://api.spotify.com/v1/search";
    var searchAlbums = {q: searchTerm,
                type: "album"};

    //
    function albumsHTML(data) {
        // removes the search for your favorite albums images
        $('.desc').remove();
        var appHTML = '';

        // loops through the album results and puts forth the html to render the <li>
        $.each(data.albums.items, function (i,album) {
            appHTML += `
	    			<li>
	    				<a href="${album.external_urls.spotify}" target="_blank" id=${i}>
	    					<div class="album-wrap">
	    						<img class="album-art" src="${album.images[0].url}">
	    					</div>
		    				<span class="album-title">${album.name}</span>
		    				<span class="album-artist">${album.artists[0].name}</span>
	    				</a>
	    			</li>
    			`;
        });
        seaField.prop("disabled", false);
        submit.attr("disabled", false);

        // puts up No albums found if nothing comes back from search
        if(appHTML === '') {
          $("ul li").hide();
            appHTML = "<li class='no-albums desc'>";
            appHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: "+ $("#search").val() +".</li>";

        }
        $('#albums').html(appHTML);
    }

    $.getJSON(spotifyAPI,searchAlbums,albumsHTML);
});
