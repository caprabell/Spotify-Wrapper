import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbum, searchArtist, searchPlaylist, searchTrack } from '../src/main.js';

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {

    //search generico - + de 1 tipo
    //seachAlbuns
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('should exist the method `search`', () => {
      expect(search).to.exist;
    })

    it('should exist the method `searchAlbuns`', () => {
      expect(searchAlbum).to.exist;
    })

    it('should exist the method `searchArtists`', () => {
      expect(searchArtist).to.exist;
    })

    it('should exist the method `searchTracks`', () => {
      expect(searchTrack).to.exist;
    })

    it('should exist the method `searchPlaylists`', () => {
      expect(searchPlaylist).to.exist;
    })

  });

  describe('Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive correct url to fetch', () => {
      context('passing one type',()=>{
        const artists = search('Dream Theater', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Dream Theater&type=artist');

        const albums = search('Dream Theater', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Dream Theater&type=album');
      });

      context('passing more than one type', ()=> {
        const artistandalbum = search('Dream Theater', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Dream Theater&type=artist,album');
      });

    });
  });
});
