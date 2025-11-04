import UserProfile from "./viewuserdetails";
const ViewDetail = ({ params }) => {
    const id = params.id;
    console.log('owner id : ', id);
    return (<UserProfile id={id} />)
}
export default ViewDetail;