const rewire = require("rewire");
const addFunc = rewire("../func");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

describe("Test Suite", function () {
    const add = addFunc.__get__('add')
    // it("to be", function () {
    //     const spyMan = sinon.spy();
    //     spyMan(addFunc.__get__('sayHello'))
    //     add(2, 4)
    //     // expect(addFunc.add(2,4)).to.be.equal(6);
    //     expect(spyMan.calledOnce).to.be.true;
    // })
    it("to be called", function () {
        const spyMan = sinon.stub();
        addFunc.__set__({ sayHello: spyMan });
        spyMan.returns(10)
        expect(add(2, 4)).to.be.equal(14);
    })
})