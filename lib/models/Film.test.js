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

  describe('tests for the released field', () => {
    it('has a required released field', () => {
      const film = new Film(); 
      const { errors } = film.validateSync();
  
      expect(errors.released.message).toEqual('Path `released` is required.');
    });

    it('has a release date of at least 1880', () => {
      const film = new Film({ released: 1879 }); 
      const { errors } = film.validateSync();
  
      expect(errors.released.message).toEqual('Path `released` (1879) is less than minimum allowed value (1880).');
    });

    it('has a release date that is less than 5 digits', () => {
      const film = new Film({ released: 10000 }); 
      const { errors } = film.validateSync();
  
      expect(errors.released.message).toEqual('Path `released` (10000) is more than maximum allowed value (9999).');
    });
  });

  it('has a field called cast that is an array with a required actor field', () => {
    const film = new Film({ cast: [{}] }); 

    const { errors } = film.validateSync();

    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });

}); 
