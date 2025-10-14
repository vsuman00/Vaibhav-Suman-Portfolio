// Querying with "createClient" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity for more information.
import { createClient } from "next-sanity";
import { client } from './client'

// Comment out the live functionality for now as it's changed in the latest version
// We'll use the regular client instead
export const sanityClient = createClient({
  projectId: client.config().projectId,
  dataset: client.config().dataset,
  apiVersion: '2023-05-03', // Use a stable API version
  useCdn: false,
});

// Placeholder for SanityLive to prevent build errors
export const SanityLive = () => null;
export const sanityFetch = async (query: string, params = {}) => {
  return sanityClient.fetch(query, params);
};
