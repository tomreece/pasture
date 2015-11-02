global.proxyquire = require('proxyquire').noCallThru();
global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');
global.sinonAsPromised = require('sinon-as-promised');
global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-as-promised'));

require('babel/register');

beforeEach(function() {
    this.sandbox = global.sinon.sandbox.create();
    global.stub = this.sandbox.stub.bind(this.sandbox);
    global.spy = this.sandbox.spy.bind(this.sandbox);
});

afterEach(function () {
    delete global.stub;
    delete global.spy;
    this.sandbox.restore();
});
