import PropertyClient from "./propertyClient";

const PropertyDetails = async ({ params }) => {
    const { id } = await params;
    console.log("Property ID:", id);

    return (
        <PropertyClient id={id} />
    );
};
export default PropertyDetails;

