export const search = (query, type) => fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`).then(data => data.json());

export const searchAlbum = () => {};

export const searchArtist = () => {};

export const searchPlaylist = () => {};

export const searchTrack = () => {};
