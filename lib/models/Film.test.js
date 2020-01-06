const Film = require('./Film');

//everything commented out would be necessary to test a virtual 
// const Film = require('./Film');

describe('tests for the Film model', () => {
  // let maineFilm;
  // // let maineStudio
  // beforeEach(() => {
  //   maineFilm = new Film ({
  //     name: 'maine vacation',
  //     lat: 44, 
  //     long: 120
  //   });
  //   // maineStudio = new ItineraryItem({
  //   //   tripId: maineTrip._id,
  //   //   dateOfEvent: new Date('2014-12-12T00:00:00'),
  //   //   notes: 'It went well',
  //   // });
  // });


  it('has a required title field', () => {
    const film = new Film(); 
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });


  it('has a required released field', () => {
    const film = new Film(); 
    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });

}); 
