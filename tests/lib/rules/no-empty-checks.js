'use strict';

const rule = require('../../../lib/rules/no-empty-checks');
const {RuleTester} = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run('no-empty-checks', rule, {
  valid: [{
    code: `
      it("works as expected", function() {
        expect(str).to.contain('abc');
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        expect(str).to.equal('def');
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return expect(str).to.equal('');
      });
    `
  }],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(str).to.contain('');
      });
    `,
    errors: [{
      message: '`expect` contain(...) expressions cannot be empty strings'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        return expect(str).to.contain();
      });
    `,
    errors: [{
      message: '`expect` contain(...) expressions cannot be empty'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        return expect(str).to.equal();
      });
    `,
    errors: [{
      message: 'The `expect` equal(...) expressions cannot be empty'
    }]
  }]
});
