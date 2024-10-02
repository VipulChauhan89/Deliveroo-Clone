import { createClient } from "@sanity/client";
import imageURLBuilder from "@sanity/image-url";

const client=createClient({
    projectId: "sindr0ku",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07",
});

const builder=imageURLBuilder(client);
export const urlFor = (source:any) => {
    return builder.image(source);
};

export default client;