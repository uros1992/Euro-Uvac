/**
 * Generates an optimized Cloudinary srcSet and fallbacks for dynamic images.
 */
export function getCloudinarySrcSet(url: string, widths = [500, 800, 1200, 1600, 2000]): { srcSet: string | undefined; src: string } {
  if (!url || !url.includes('cloudinary.com')) {
    return { srcSet: undefined, src: url };
  }

  // Remove existing width parameters (like ,w_700, /w_1200/ or /w_1200) to allow clean dynamic inserts
  const sanitizedUrl = url
    .replace(/,w_\d+/g, '')
    .replace(/\/w_\d+\//g, '/')
    .replace(/\/w_\d+$/g, '');

  const srcSet = widths
    .map((w) => {
      if (sanitizedUrl.includes('/upload/')) {
        const parts = sanitizedUrl.split('/upload/');
        const nextSegment = parts[1].split('/')[0];
        // If the segment doesn't start with 'v' and is not purely a numeric version number, it's a transformation
        const isTransformation = nextSegment && !nextSegment.startsWith('v') && isNaN(Number(nextSegment));

        if (isTransformation) {
          // Append w_w to the existing transformation segment
          const updatedTransformation = nextSegment.includes('f_auto')
            ? `${nextSegment},w_${w}`
            : `f_auto,q_auto:good,w_${w}`;
          const rest = parts[1].slice(nextSegment.length);
          return `${parts[0]}/upload/${updatedTransformation}${rest} ${w}w`;
        } else {
          return `${parts[0]}/upload/f_auto,q_auto:good,w_${w}/${parts[1]} ${w}w`;
        }
      }
      return `${url} ${w}w`;
    })
    .join(', ');

  // Generate a fallback optimized src URL (defaulting to 1200px width)
  let defaultSrc = url;
  if (sanitizedUrl.includes('/upload/')) {
    const parts = sanitizedUrl.split('/upload/');
    const nextSegment = parts[1].split('/')[0];
    const isTransformation = nextSegment && !nextSegment.startsWith('v') && isNaN(Number(nextSegment));

    if (isTransformation) {
      const updatedTransformation = nextSegment.includes('f_auto')
        ? `${nextSegment},w_1200`
        : `f_auto,q_auto:good,w_1200`;
      defaultSrc = `${parts[0]}/upload/${updatedTransformation}${parts[1].slice(nextSegment.length)}`;
    } else {
      defaultSrc = `${parts[0]}/upload/f_auto,q_auto:good,w_1200/${parts[1]}`;
    }
  }

  return { srcSet, src: defaultSrc };
}
