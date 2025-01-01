export function getAssetUrl(path: string): string {
  try {
    console.log('Input path:', path);
    // Use Vite's @ alias to reference src directory
    const imageUrl = `/src/assets/${path}`;
    console.log(`Resolved asset URL: ${imageUrl}`);
    return imageUrl;
  } catch (error) {
    console.error(`Failed to load asset: ${path}`, error);
    return ''; // Return empty string if asset fails to load
  }
}
