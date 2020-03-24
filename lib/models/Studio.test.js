const Studio = require('./Studio');

describe('tests for the Studio model', () => {

  it('has a required name field', () => {
    const studio = new Studio(); 
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

}); 
