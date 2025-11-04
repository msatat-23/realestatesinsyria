"use server"
import { changePassword } from "@/data/user/change-password";
import { changePrivacySettings, updateUserImage } from "@/data/user/update-user";
import { updateuser } from "@/data/user/user";

export const updateUserByUserId = async (id, data) => {
    console.log("IAM IN SERVER TRYING TO UPDATE USER BY USER ID!!");
    const res = await updateuser(id, data);
    return res;
};
export const updatePassword = async (oldpassword, newpassword) => {
    console.log("IAM IN SERVER TRYING TO UPDATE USER PASSWORD!!");
    const res = await changePassword(oldpassword, newpassword);
    return res;
};
export const updatePrivacy = async (privacy) => {
    console.log("IAM IN SERVER TRYING TO UPDATE USER'S PRIVACY SETTINGS!!");
    const res = await changePrivacySettings(privacy);
    return res;
}
export const updateImage = async (secure_url, public_id) => {
    console.log("IAM IN SERVER TRYING TO UPDATE USER IMAGE IN DB!!");
    const res = await updateUserImage(secure_url, public_id);
    return res;
};