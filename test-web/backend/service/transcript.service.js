
import { fetchTranscript } from 'youtube-transcript-plus';

export const getTranscript = async (videoId) => {
    if (!videoId) {
        return null;
    }

    // Try English captions first.
    try {
        const segments = await fetchTranscript(videoId, {
            lang: 'en'
        });

        if (segments?.length) {
            return segments
                .map(segment => segment.text)
                .join(' ')
                .trim();
        }
    } catch (error) {
        console.warn(
            `English transcript unavailable for ${videoId}:`,
            error.message
        );
    }

    // Fall back to the default available transcript.
    try {
        const segments = await fetchTranscript(videoId);

        if (segments?.length) {
            return segments
                .map(segment => segment.text)
                .join(' ')
                .trim();
        }
    } catch (error) {
        console.warn(
            `Transcript unavailable for ${videoId}:`,
            error.message
        );
    }

    // No accessible transcript.
    return null;
};
