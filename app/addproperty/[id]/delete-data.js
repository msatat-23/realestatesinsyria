"use server"

import { deleteSavedProperty, fetchSavedPropertiesByUserId } from "@/data/property/saved-properties";

const { deleteImageByPublicId, deleteVideoByPropertyId, deletePropertyById } = require("@/data/property/delete-proprety");

export const deleteProperty = async (id) => {
    console.log("IAM IN SERVER TRYING TO DELETE PROPERTY!!!");
    const res = await deletePropertyById(id);
    return res;
};

export const deleteImageFromDB = async (public_id) => {
    console.log("IAM IN SERVER TRYING TO DELETE IMAGE BY PUBLIC_ID!!!");
    const res = await deleteImageByPublicId(public_id);
    return res;
};

export const deleteVideoFromDB = async (id) => {
    console.log("IAM IN SERVER TRYING TO DELETE VIDEO FROM DB!!");
    const res = await deleteVideoByPropertyId(id);
    return res;
};

export const fetchSavedProperties = async (userId) => {
    console.log("IAM IN SERVER TRYING TO FETCH SAVEDPROPRETIES BY USER ID!!!");
    const res = await fetchSavedPropertiesByUserId(userId);
    return res;
};

export const deleteSavedPropertyForUser = async (userId, propertyId) => {
    const res = deleteSavedProperty(userId, propertyId);
    return res;

};