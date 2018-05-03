import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import PaymentMethods from './PaymentMethods';


const PaymentMethodsDemo = () => <div style={{margin: 'auto', width: '800px'}}><PaymentMethods /></div>

export default storiesOf('Profile', module)
.addDecorator(withKnobs)
.add('PaymentMethods', PaymentMethodsDemo);
