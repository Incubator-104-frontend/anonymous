/*import React from 'react/addons';
import TextFeild from '../index.js';

const chai = require("chai");
const expect = chai.expect;

module.exports = describe("React Tesrt", () => {
	 it("should render something", () => {  
		let foo = React.addons.TestUtils.renderIntoDocument(<TextFeild />);
		expect(foo.getDOMNode()).to.exist; // 看有沒有 render 出 DOM
	});
})*/

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TextFeild from '../index.js';

describe( 'GUI testing' ,function(){
	it('should render a input element')
})