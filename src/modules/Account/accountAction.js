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


export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const createProvider = providerInfo => async dispatch => {
  const providerDocRef = await providerCollectionRef.add({});
  const providerId = providerDocRef.id;
  await _updateBasicProfile(dispatch)(providerId, providerInfo, true);
  return await setDefaultProvider(providerId)(dispatch)
};

export const editProvider = (config) => async dispatch => {
  const { type, providerId } = config;
  if (type === 'basic') {
    return await _updateBasicProfile(dispatch)(providerId, omit(config, ['type', 'providerId']), false);
  } else if (type === 'payment-methods') {
    return await _updatePaymentMethods(dispatch)(providerId, omit(config, ['type', 'providerId']))
  } else if(type === 'review-services') {
    return await _updateReviewServices(dispatch)(providerId, omit(config, ['type', 'providerId']))
  } else if (type === 'photo-gallery') {
    return await _updatePhotoGallery(dispatch)(providerId, omit(config, ['type', 'providerId']))
  } else {
    throw new Error('unknown type');
  }
}

const _updateStorePostEdit = (dispatch) => async (providerDocRef, providerId) =>{
  const providerDataPromise = await providerDocRef.get();
  const providerData = providerDataPromise.data();
  return dispatch({
    type: UPDATE_PROFILE,
    data: {
      providerId,
      providerInfo: { ...providerData, id: providerId }
    }
  })
}

const _updateBasicProfile = dispatch => async (providerId, profile, newProfile=false) => {
  const logo = await _uploadPhoto(profile.logo, providerId); 
  const coverPhoto = await _uploadPhoto(profile.coverPhoto, providerId);
  const providerDocRef = providerCollectionRef.doc(providerId);
  const updatedProviderInfoWithoutUndefined = omitBy(Object.assign(profile, { logo, coverPhoto }), isUndefined);
  await providerDocRef.update(updatedProviderInfoWithoutUndefined);
  
  if(newProfile) {
    await _updateUserProviders(providerDocRef);
  }
  return await _updateStorePostEdit(dispatch)(providerDocRef, providerId)
}

const _updatePaymentMethods = dispatch => async (providerId, profile) => {
  const providerDocRef = providerCollectionRef.doc(providerId);
  await providerDocRef.update(profile);
  return await _updateStorePostEdit(dispatch)(providerDocRef, providerId)
};

const _updateReviewServices = dispatch => async (providerId, profile) => {
  const providerDocRef = providerCollectionRef.doc(providerId);
  await providerDocRef.update(profile);
  return await _updateStorePostEdit(dispatch)(providerDocRef, providerId)
};

const _updatePhotoGallery = dispatch => async (providerId, profile) => {
  const providerDocRef = providerCollectionRef.doc(providerId);
  const promises = profile.photoGallery.map(c => _uploadPhoto(c, providerId));
  const photoGallery = await Promise.all(promises);
  await providerDocRef.update({ photoGallery });
  return await _updateStorePostEdit(dispatch)(providerDocRef, providerId)
};



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

