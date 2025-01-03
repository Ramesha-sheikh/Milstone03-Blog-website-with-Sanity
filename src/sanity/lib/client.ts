import { createClient, SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env'; // Import token from env

// Create a Sanity client instance
export const client: SanityClient = createClient({
  projectId,       // Sanity project ID
  dataset,         // Sanity dataset (e.g., 'production')
  apiVersion,      // Sanity API version (e.g., '2024-12-29')
  token,           // Sanity token (for write operations)
  useCdn: true,    // Use CDN for faster read access (set to false for real-time updates)
});
