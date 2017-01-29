import Ember from 'ember';
import LastFMAPI from 'npm:lastfmapi';

export default Ember.Route.extend({
  spotify: Ember.inject.service('spotify-api'),
  model() {
    var artistList = [
      'Armin van Buuren',
      'Above and Beyond',
      'Hardwell',
      'Kaskade',
      'Marlo',
      'Photographer',
      'Martin Garrix',
      'Drake',
      'Justin Bieber',
      'Britney Spears',
      'Usher'
    ];

    var chellaArtistsString = 'Alison Swing,Allah-Las,Anna Lunoe,Arkells,Autograf,Banks,Banks&Steelz,Bastille,Ben UFO,Beyonce,Bicep,Big Gigantic,Bishop Briggs, Blossoms,Bon Iver,Bonobo,BreakBot,Brodinski,Broods,Capital Cities, Car Seat Headrest,Caveman,Chicano Batman,Chris Cruse,Classixx,Crystal Castles,Daphni,Declan Mckenna,Denzel Curry,Devendra Banhart,Dillon Francis,Dixon,DJ Kaled,DJ Shadow,DJ Snake,Dreamcar,Eli & Fur,Floating Points,Floorplan,Four Tet,Francis and the Lights,Future,Future Islands,Galantis,Glass Animals,Goldlink,Grace Mitchell,GroupLove,Gryffin,Gucci Mane,Guided by Voices,Hanna Wants,Hans Zimmer,Hinds,Honey Dijon,Honne,Hot Since 82,Jack Garratt,Jagwar Ma,Jai Wolf,Jen Ferrer,Joseph,Justice,Kaleo,Kaytranada,Kehlani,Kendrick Lamar,Kiiara,King Gizzard & the Lizard Wizard,Klagstof,Kungs,Lee Fields & the Expressions, Lil Uzi Vert,Little Dragon,Local Natives,Loco Dice,Lorde,Los Blenders,Mac Demarco,Mac Miller,Majid Jordan,Marcel Dettmann,Marshmello,Martin Garrix,Maya Jane Coles,Mitski,Moderat,Mura Musa,Nao,Nav,New Order,Nicolas Jaar,Nora en Pure,Oh Wonder,Patrick Topping,Phantogram,PNL,Pond,Porter Robinson & Madeon,Preoccupations,Preservation Hall Jazz Band,Rosin Murphy,Royksopp,Radiohead,Raury,Real Estate,Red Axes,Richie Hawtin,S U R V I V E,Sam Gellaitry,Sampha,Sasha,Schoolboy Q,Show Me the Body,Shura,SNBRN,Sofi Tukker,Sohn,Solomun,Steve Angello,Stormyz,Swet Shop Boys,Tacocat,Tale Of Us,Tennis,The Atomics,The Avalanches,The Belleville Three,The Head and The Heart,The Interrupters,The Lemon Twigs,The Martinez Brothers,The XX,Thundercat,Toots and the Maytals,Tory Lanez,Tourist,Tove Lo,Travis Scott,Twin Peaks,Two Door Cinema Club, Tycho,Warpaint,What So Not,Whitney,Zipper Club';

    var chellaArtists = chellaArtistsString.split(",");
    var chellaArtistsShort = chellaArtists.splice(0,60);



    // var scopes = ['user-read-private', 'user-read-email', 'user-follow-read'],
    //   redirectUri = 'http://localhost:4200/playlist',
    //   clientId = '4e2385394fb5461ebc0103cf7ba494de',
    //   state = '';
    //
    // var spotifyApi = new SpotifyWebApi({
    //   clientId: clientId,
    //   clientSecret: 'f8ec5a1146f04866a02bbb6120dab1ad',
    //   redirectUri: redirectUri
    // });

    // Create the authorization URL
    // var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    // console.log(authorizeURL);

    var spotifyApi = this.get('spotify').getInstance();

    // var lastFmApi = new LastFM({
    //   // apiKey: '74b011c4d40ec6d60344b4f6571b82d7',
    //   // apiSecret: 'bfd015ff0f70d60507db8351fc1d728d',
    //   // debug: true
    // });

    var api = new LastFMAPI({
      'api_key' : '74b011c4d40ec6d60344b4f6571b82d7',
      'secret' : 'bfd015ff0f70d60507db8351fc1d728d'
    });

    var modeledList = chellaArtistsShort.map(function(artistName) {
      return spotifyApi.searchArtists(artistName)
        .then(function(data) {
          // console.log('Search artists by ' + artistName, data.body.artists.items[0]);/
          // console.log('images for ' + artistName, data.body.artists.items[0].images);


          return data.body.artists.items[0];
        })
        .then(function(artist) {
          //add top tracks to artist

          var artistComposite = {
            name: artistName,
            profile: artist
          };

          if(artist){
            spotifyApi.getArtistTopTracks(artist.id, 'US')
              .then(function(data) {
                artist.topTracks = data.body.tracks;
            });
          }
          return artistComposite;
        })
        .then(function(artist) {
          if(artist.profile){ //this is an awful way to check if artist found...
            api.artist.getInfo({
              'artist' : artist.name
            }, function (err, foundArtist) {
              if (err) {
                //throw err;
              }

              if(foundArtist){
                var bio = foundArtist.bio;
                if(bio || bio !== ""){
                  artist.profile.bioFull = bio.content;
                  artist.profile.bioShort = bio.summary;
                }else{
                  artist.profile.bioFull = "No Bio Available";
                }
              }
            });
            console.log(artist);
          }

          return artist;
          // return artist.topTracks = data.body.tracks;
        })
        .catch(function(err) {
          console.error('Error' + err);
        });
    });

    // console.log(modeledList);
    return Ember.RSVP.all(modeledList);
  }
});
