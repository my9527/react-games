import React from 'react';
import CmptNumber from '../components/number';
import renderer from 'react-test-renderer';


test('CmptNumber', () => {

    const n = renderer.create(
        <CmptNumber num={5}/>
    )

    let _n = n.toJSON();
    expect(_n).toMatchSnapshot();
})