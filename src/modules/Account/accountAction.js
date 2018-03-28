import {
  auth,
  storage,
  firestore
} from '../../firebaseClient';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

const providerCollectionRef = firestore.collection('providers');
const userCollectionRef = firestore.collection('users');


const _randomFileName = (originalName) => {
  const index = originalName.lastIndexOf('.');
  const ext = originalName.slice(index);
  const originalNameWithoutExt = originalName.slice(0, index);
  return `${originalNameWithoutExt}_${Math.floor(Date.now() / 1000)}${ext}`;
};

const _uploadLogo = async (logo, providerId) => {
  const imgStorageRef = storage.ref();
  if (isUndefined(logo) || typeof logo === 'string') {
    return logo;
  }
  const imageName = _randomFileName(logo.name);
  const imgRef = imgStorageRef.child(`images/provider/${providerId}/${imageName}`);
  const result = await imgRef.put(logo);
  return result.downloadURL.replace(imageName, `thumb_${imageName}`);
};

const _updateUserProviders = async providerRef => {
  const uid = auth.currentUser.uid;
  const userDocRef = userCollectionRef.doc(uid);
  const user = await userDocRef.get();
  const existingProviders = user.data().providers || {};
  const providers = Object.assign({
    [providerRef.id]: providerRef
  }, existingProviders)
  await userDocRef.update({ providers });
  return providers;
};

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const createProvider = providerInfo => async dispatch => {
  const providerDocRef = await providerCollectionRef.add({});
  const providerId = providerDocRef.id;
  const logo = await _uploadLogo(providerInfo.logo, providerId);
  const updatedProviderInfo = isUndefined(logo) ? omit(providerInfo, ['logo']) : Object.assign(providerInfo, {
    logo
  });
  providerDocRef.update(updatedProviderInfo);
  await _updateUserProviders(providerDocRef);
  const providerDataPromise = await providerDocRef.get();
  const providerData = providerDataPromise.data();
  return dispatch({
    type: UPDATE_PROFILE,
    field: 'providers',
    data: {providers: [{ ...providerData, id: providerId }]}
  })
};

export const DEFAULT_PROVIDER_CHANGE = 'DEFAULT_PROVIDER_CHANGE';
export const setDefaultProvider = providerId => async dispatch => {
  const uid = auth.currentUser.uid;
  const userDocRef = userCollectionRef.doc(uid);
  await userDocRef.update({ defaultProvider: providerId });
  dispatch({
    type: DEFAULT_PROVIDER_CHANGE
  })
}

