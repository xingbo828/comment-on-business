import {
  auth,
  storage,
  firestore
} from '../../firebaseClient';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';

const providerCollectionRef = firestore.collection('providers');
const userCollectionRef = firestore.collection('users');


const _randomFileName = (originalName) => {
  const index = originalName.lastIndexOf('.');
  const ext = originalName.slice(index);
  const originalNameWithoutExt = originalName.slice(0, index);
  return `${originalNameWithoutExt}_${Math.floor(Date.now() / 1000)}${ext}`;
};

const _uploadPhoto = async (photo, providerId) => {
  const imgStorageRef = storage.ref();
  if (isUndefined(photo) || typeof photo === 'string') {
    return photo;
  }
  const imageName = _randomFileName(photo.name);
  const imgRef = imgStorageRef.child(`images/provider/${providerId}/${imageName}`);
  if(photo.originFileObj) {
    const result = await imgRef.put(photo.originFileObj);
    return result.downloadURL;
  }
  const result = await imgRef.put(photo);
  return result.downloadURL;
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


const _mapPhotoGalleryToUrls = async (photoGallery, providerId) => {
  const promises = photoGallery.map(c => _uploadPhoto(c, providerId));
  return Promise.all(promises);
};

const _updateProviderProfile = async (providerId, providerInfo, dispatch) => {
  const logo = await _uploadPhoto(providerInfo.logo, providerId); 
  
  const coverPhoto = await _uploadPhoto(providerInfo.coverPhoto, providerId);
  let updatedProviderInfo = isUndefined(logo) ? omit(providerInfo, ['logo']) : Object.assign(providerInfo, {
    logo
  });
  updatedProviderInfo = isUndefined(coverPhoto) ? omit(providerInfo, ['coverPhoto']) : Object.assign(providerInfo, {
    coverPhoto
  });
  const photoGallery = await _mapPhotoGalleryToUrls(providerInfo.photoGallery || [], providerId);
  updatedProviderInfo = Object.assign(updatedProviderInfo, { photoGallery });
  const providerDocRef = providerCollectionRef.doc(providerId);
  const updatedProviderInfoWithoutUndefined = omitBy(updatedProviderInfo, isUndefined);
  providerDocRef.update(updatedProviderInfoWithoutUndefined);
  await _updateUserProviders(providerDocRef);
  const providerDataPromise = await providerDocRef.get();
  const providerData = providerDataPromise.data();
  return dispatch({
    type: UPDATE_PROFILE,
    data: {
      providerId: providerId,
      providerInfo: { ...providerData, id: providerId }
    }
  })
}

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const createProvider = providerInfo => async dispatch => {
  const providerDocRef = await providerCollectionRef.add({});
  const providerId = providerDocRef.id;
  await _updateProviderProfile(providerId, providerInfo, dispatch);
  return await setDefaultProvider(providerId)(dispatch)
};

export const editProvider = (providerId, providerInfo) => async dispatch => {
  return await _updateProviderProfile(providerId, providerInfo, dispatch);
}


export const DEFAULT_PROVIDER_CHANGE = 'DEFAULT_PROVIDER_CHANGE';
export const setDefaultProvider = providerId => async dispatch => {
  const uid = auth.currentUser.uid;
  const userDocRef = userCollectionRef.doc(uid);
  await userDocRef.update({ defaultProvider: providerId });
  dispatch({
    type: DEFAULT_PROVIDER_CHANGE,
    data: providerId
  })
}

