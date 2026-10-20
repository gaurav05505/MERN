/**
 * Utility to detect and filter out roadmap videos from YouTube search results.
 */

// Matches "roadmap", "roadmaps", "road map", "road maps", "road-map", "road_map", "roadmapping", or hashtag variants
const ROADMAP_REGEX = /(?:\broad\s*[-_ ]*maps?(?:ping)?\b|#\w*road\s*[-_ ]*maps?)/i;

/**
 * Checks whether a video object represents a roadmap video.
 * @param {Object} video - Video object returned by yt-search or similar
 * @returns {boolean}
 */
export const isRoadmapVideo = (video) => {
    if (!video) return false;

    const title = (video.title || '').trim();
    if (ROADMAP_REGEX.test(title)) {
        return true;
    }

    const description = (video.description || video.content || '').trim();
    if (ROADMAP_REGEX.test(description)) {
        // Also check if description starts with or heavily emphasizes roadmap
        const descFirstLines = description.split('\n').slice(0, 3).join(' ');
        if (ROADMAP_REGEX.test(descFirstLines)) {
            return true;
        }
    }

    return false;
};

/**
 * Sanitizes a user search query by removing roadmap keywords so YouTube
 * returns actual learning/tutorial videos instead of roadmap results.
 * @param {string} query
 * @returns {string}
 */
export const sanitizeRoadmapQuery = (query = '') => {
    if (typeof query !== 'string') return '';

    const cleaned = query
        .replace(/(?:\broad\s*[-_ ]*maps?(?:ping)?\b|#\w*road\s*[-_ ]*maps?)/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

    return cleaned || query.trim();
};

