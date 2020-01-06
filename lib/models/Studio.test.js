const Studio = require('./Studio');

//everything commented out would be necessary to test a virtual 
// const Film = require('./Film');

describe('tests for the Studio model', () => {
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


  it('has a required name field', () => {
    const studio = new Studio(); 
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

}); 
