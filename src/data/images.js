/* The seed's trail covers are GitHub user-attachments URLs that 404 for
   anonymous requests, so every image goes through the same rewrite v1 ships
   (blrhikes-app/src/api/rehypeTransformImageUrls.js): the Cloudflare image
   resizer in front of images.blrhikes.com, keyed by the asset's uuid. */
export function cover(uuid, width = 800) {
  return `https://blrhikes.com/cdn-cgi/image/width=${width},quality=80,format=jpeg/https://images.blrhikes.com/${uuid}`;
}
