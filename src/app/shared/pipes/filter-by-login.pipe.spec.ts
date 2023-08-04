// import { FilterByIdPipe } from './filter-by-login.pipe';

// describe('FilterByIdPipe', () => {
//   it('create an instance', () => {
//     const pipe = new FilterByIdPipe();
//     expect(pipe).toBeTruthy();
//   });
// });
import { FilterByLoginPipe } from './filter-by-login.pipe';

describe('FilterByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByLoginPipe();
    expect(pipe).toBeTruthy();
  });
});
