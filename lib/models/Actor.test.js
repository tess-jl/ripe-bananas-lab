const Actor = require('./Actor');

//everything commented out would be necessary to test a virtual 
// const Film = require('./Film');

describe('tests for the Actor model', () => {
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
    const actor = new Actor(); 
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

}); 
