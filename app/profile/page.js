import ProfileClient from './profileclient';

const Profile = async ({ params, searchParams }) => {
    const searchparams = await searchParams;
    const key = searchparams?.section;
    const id = await params?.id;

    return <ProfileClient userId={id} section={key || ''} />;
};

export default Profile;
