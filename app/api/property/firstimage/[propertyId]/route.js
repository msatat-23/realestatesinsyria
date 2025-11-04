import { getPropertyFirstImage } from "@/data/property/property-details";

export const GET = async (request, { params }) => {
    const { propertyId } = params;
    const image = await getPropertyFirstImage(propertyId);
    if (image) {
        return new Response(JSON.stringify(image), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });
    }
}