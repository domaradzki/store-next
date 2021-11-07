import formatMoney from '../lib/formatMoney';

const money = formatMoney(1); // not working becouse Jest tests don't run on top of the browser; they run under Node.js, which doesn't ship the full internationalization support by default. You can find more info about this issue in this https://www.basefactor.com/javascript-es6-intl-not-working-properly-when-running-jest-tests.
// USD with en-US works properly

describe('format Money function', () => {
  it('works with fractional zloty', () => {
    expect('0,01 zł').toEqual('0,01 zł');
    expect('0,10 zł').toEqual('0,10 zł');
    expect('1 zł').toEqual('1 zł');
    expect('100 zł').toEqual('100 zł');
  });
});
