import { compose, withProps, toClass } from 'recompose';
import { searchBusiness } from './yelpClient';
import has from 'lodash/has';
import ReviewInfo from './ReviewInfo'

const enhance = compose(
  toClass,  
  withProps(({ value }) => ({
    searchYelpBusiness: searchBusiness,
    hasGoogleInfo: has(value, 'googleInfo'),
    hasYelpInfo: has(value, 'yelpInfo'),
    google: window.google
  })),
);

export default enhance(ReviewInfo);