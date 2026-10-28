
import yts from 'yt-search';
import { fetchTranscript } from 'youtube-transcript-plus';
import { isRoadmapVideo, sanitizeRoadmapQuery } from '../utils/roadmapFilter.js';

const normalize = (text = '') =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

const getRelevanceScore = (query, video) => {
    const queryWords = normalize(query).split(/\s+/).filter(Boolean);
    const title = normalize(video.title || '');
    const description = normalize(video.description || '');

    if (queryWords.length === 0) return 0;

    const titleMatches = queryWords.filter(word =>
        title.includes(word)
    ).length;

    const descriptionMatches = queryWords.filter(word =>
        description.includes(word)
    ).length;

    return Math.min(
        100,
        (titleMatches / queryWords.length) * 70 +
        (descriptionMatches / queryWords.length) * 30
    );
};

const getTranscript = async (videoId) => {
    try {
        const segments = await fetchTranscript(videoId, { lang: 'en' });
        return segments.map(segment => segment.text).join(' ');
    } catch {
        try {
            const segments = await fetchTranscript(videoId);
            return segments.map(segment => segment.text).join(' ');
        } catch {
            return null;
        }
    }
};

const getTranscriptScore = (transcript, query) => {
    if (!transcript || !transcript.trim()) return null;

    const text = normalize(transcript);
    const words = text.split(/\s+/).filter(Boolean);

    const lengthScore = Math.min(100, (words.length / 1000) * 100);

    const teachingSignals = [
        'for example',
        'example',
        'step by step',
        'let us understand',
        'because',
        'therefore',
        'in other words',
        'the reason',
        'how it works',
        'definition',
        'in conclusion'
    ];

    const signalCount = teachingSignals.filter(signal =>
        text.includes(normalize(signal))
    ).length;

    const teachingScore = Math.min(100, signalCount * 15);

    const queryWords = normalize(query)
        .split(/\s+/)
        .filter(word => word.length > 2);

    const matchedWords = queryWords.filter(word =>
        text.includes(word)
    ).length;

    const topicScore = queryWords.length
        ? (matchedWords / queryWords.length) * 100
        : 0;

    return Math.round(
        lengthScore * 0.25 +
        teachingScore * 0.35 +
        topicScore * 0.40
    );
};

const getDurationScore = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return 0;

    if (seconds >= 300 && seconds <= 3600) return 100;

    if (seconds < 300) {
        return (seconds / 300) * 100;
    }

    return Math.max(0, 100 - ((seconds - 3600) / 3600) * 50);
};

const getPopularityScore = (views) => {
    if (!Number.isFinite(views) || views <= 0) return 0;

    return Math.min(100, (Math.log10(views) / 7) * 100);
};

export const searchYt = async (req, res) => {
    try {
        const query =
            req.body?.query ||
            req.query?.q ||
            req.query?.query;

        if (typeof query !== 'string' || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const searchQuery = query.trim();
        const effectiveSearchQuery = sanitizeRoadmapQuery(searchQuery);
        const ytResponse = await yts(effectiveSearchQuery);

        // Filter out roadmap videos, evaluate up to 10 candidates, then return the top 5.
        const videos = (ytResponse.videos || [])
            .filter(video => video.title && video.url && !isRoadmapVideo(video))
            .slice(0, 10);

        if (!videos.length) {
            return res.status(200).json({
                success: true,
                query: searchQuery,
                rankingMethod: 'transcript-heuristic-v1',
                results: []
            });
        }

        const evaluatedVideos = await Promise.all(
            videos.map(async (video) => {
                
                const videoId =
                    video.videoId ||
                    video.url.match(
                        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
                    )?.[1];

                const transcript = videoId
                    ? await getTranscript(videoId)
                    : null;

                const relevance = getRelevanceScore(searchQuery, video);
                const transcriptScore = getTranscriptScore(
                    transcript,
                    searchQuery
                );
                const popularity = getPopularityScore(video.views);
                const duration = getDurationScore(video.seconds);

                let qualityScore;

                if (transcriptScore !== null) {
                    qualityScore = Math.round(
                        transcriptScore * 0.50 +
                        relevance * 0.25 +
                        popularity * 0.15 +
                        duration * 0.10
                    );
                } else {
                    // Fall back to metadata when captions are unavailable.
                    qualityScore = Math.round(
                        relevance * 0.50 +
                        popularity * 0.30 +
                        duration * 0.20
                    );
                }

                return {
                    title: video.title,
                    url: video.url,
                    thumbnail: video.thumbnail,
                    duration: video.timestamp,
                    views: video.views,
                    channel: video.author?.name,
                    content: video.description,
                    transcriptAvailable: transcript !== null,
                    transcriptScore,
                    qualityScore,
                    scoreBreakdown: {
                        transcript: transcriptScore,
                        relevance: Math.round(relevance),
                        popularity: Math.round(popularity),
                        duration: Math.round(duration)
                    }
                };
            })
        );

        const results = evaluatedVideos
            .sort((a, b) => b.qualityScore - a.qualityScore)
            .slice(0, 5);

        return res.status(200).json({
            success: true,
            query: searchQuery,
            rankingMethod: 'transcript-heuristic-v1',
            results
        });

    } catch (error) {
        console.error('YouTube Search Error:', error);

        return res.status(500).json({
            success: false,
            message: 'YouTube search failed'
        });
    }
};