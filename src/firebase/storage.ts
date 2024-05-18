import { getStorage, ref, uploadString, getDownloadURL, StorageReference } from '@firebase/storage'
import {app} from '@fb/app'

const storage = getStorage(app, 'gs://tummy-develop.appspot.com');

export const uploadImage = async (imageStr: string, id: string) => {
    const storageRef = ref(storage, `recipes/${id}`)

    return await uploadString(storageRef, imageStr, 'data_url')
}

export const getImageURL = async (ref: StorageReference) => {
    return await getDownloadURL(ref)
}

