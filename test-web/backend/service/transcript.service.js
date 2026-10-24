import { fetchTranscript } from 'youtube-transcript-plus';

const withTimeout = (promise, ms = 5000) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Transcript fetch timed out')), ms);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export const getTranscript = async (videoId) => {
    if (!videoId) {
        return null;
    }

    // Try English transcript first with 5s timeout
    try {
        const segments = await withTimeout(fetchTranscript(videoId, { lang: 'en' }), 5000);

        if (segments?.length) {
            return segments
                .map(segment => segment.text)
                .join(' ')
                .trim();
        }
    } catch {
        // Fall back to default available captions track with 4s timeout
        try {
            const segments = await withTimeout(fetchTranscript(videoId), 4000);
            if (segments?.length) {
                return segments
                    .map(segment => segment.text)
                    .join(' ')
                    .trim();
            }
        } catch {
            return null;
        }
    }

    return null;
};
