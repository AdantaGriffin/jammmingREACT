
let accessToken = '';
const clientId = '6c5112f882bf4edb90c6d3085aeb959c';
const redirectURI = 'https://ayegeejammmingproject.surge.sh';


const  Spotify = {

    getAccessToken() {

        if(accessToken){
            return accessToken;
        }
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expTime = window.location.href.match(/expires_in=([^&]*)/);
        
        if(tokenInURL && expTime){
            accessToken = tokenInURL[1];
            const expIn = Number(expTime[1]);
            window.setTimeout(() => (accessToken = ""), expIn * 1000);
            window.history.pushState('Access token', null, '/');
            return accessToken;
        }
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}
`;
        window.location = redirect;
    },
 
    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}
`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${accessToken}`},
})
    .then((response) => response.json())
    .then((jsonResponse) => {
    if(!jsonResponse){
        console.error('response error');
    }
    return jsonResponse.tracks.items.map((t) => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri,
    }));
});

    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris) return;
            const aToken = Spotify.getAccessToken();
            const header = {Authorization: `Bearer ${aToken}`};
            let userId;
            return fetch('https://api.spotify.com/v1/me', {headers: header})
            .then((response) => response.json())
            .then((jsonResponse) => {userId = jsonResponse.id;
                let playlistId;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: header,
                    method: 'post',
                    body: JSON.stringify({name: name}),
                })
                .then((response)=> response.json())
                .then((jsonResponse) => {
                    playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: header,
                        method: 'post',
                        body: JSON.stringify({ uris: trackUris }),
                        }
                    )
                });
            });
        }
    };

export { Spotify };