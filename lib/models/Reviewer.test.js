const Reviewer = require('./Reviewer');

describe('tests for the Reviewer model', () => {

  it('has a required name field', () => {
    const studio = new Reviewer(); 
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required company field', () => {
    const studio = new Reviewer(); 
    const { errors } = studio.validateSync();

    expect(errors.company.message).toEqual('Path `company` is required.');
  });

}); 
