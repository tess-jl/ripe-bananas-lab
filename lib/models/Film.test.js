const Film = require('./Film');

describe('tests for the Film model', () => {

  it('has a required title field', () => {
    const film = new Film(); 
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a required studio field', () => {
    const film = new Film(); 
    const { errors } = film.validateSync();

    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('has a required released field', () => {
    const film = new Film(); 
    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  it('has a field called cast that is an array with a required actor field', () => {
    const film = new Film({ cast: [{}] }); 

    const { errors } = film.validateSync();

    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });

}); 
