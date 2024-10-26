import { type ClassValue, clsx } from 'clsx';
import mongoose from 'mongoose';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to transform the _id field from mongoDB to id : string
 */
export function replaceIdDoc(doc: mongoose.mongo.BSON.Document | null) {
  if (!doc) {
    return null;
  }
  doc.id = doc._id.toString();
  delete doc._id;
  return doc;
}

/**
 * Utility function to transform the _id field from mongoDB to id : string
 */
export function replaceIdFromAccount(doc: mongoose.mongo.BSON.Document | null) {
  if (!doc) {
    return null;
  }
  doc.id = doc._id.toString();
  doc.userId = doc.userId.toString();
  delete doc._id;
  return doc;
}
/**
 * Function to dynamically generate URLs for variants of the products
 */
export const generateVariantUrl = (variant: any) => {
  //console.log('GENERATE VARIANT URL: ', variant);
  const queryParams = new URLSearchParams(variant.properties).toString();
  /*console.log(
    'GENERATE VARIANT URL: ',
    `/product/${variant.productId}?${queryParams}`
  );*/

  return `/product/${variant.productId}?${queryParams}`;
};
