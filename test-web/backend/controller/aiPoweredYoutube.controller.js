import yts from 'yt-search'
import {getTranscript} from '../service/transcript.service.js'
import {evaluateTranscript} from '../service/aiEvaluation.service.js'
import { isRoadmapVideo, sanitizeRoadmapQuery } from '../utils/roadmapFilter.js'


const normalize = (text = '') =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

const getRelevanceScore = (query, video) => {
    const queryWords = normalize(query).split(/\s+/).filter(Boolean);

    if (!queryWords.length) return 0;

    const title = normalize(video.title || '');
    const description = normalize(video.description || '');

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

const getPopularityScore = (views) => {
    if (!Number.isFinite(views) || views <= 0) return 0;

    return Math.min(100, (Math.log10(views) / 7) * 100);
};

const getDurationScore = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return 0;

    if (seconds >= 300 && seconds <= 3600) return 100;
    if (seconds < 300) return (seconds / 300) * 100;

    return Math.max(0, 100 - ((seconds - 3600) / 3600) * 50);
};

export const searchAIPoweredYT = async (req, res) => {
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

        const videos = (ytResponse.videos || [])
            .filter(video => video.title && video.url && !isRoadmapVideo(video))
            .slice(0, 5);

        if (!videos.length) {
            return res.status(200).json({
                success: true,
                query: searchQuery,
                results: []
            });
        }

        const evaluatedVideos = await Promise.all(
            videos.map(async video => {
                const videoId =
                    video.videoId ||
                    video.url.match(
                        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
                    )?.[1];

                let transcript = null;
                let aiEvaluation = null;
                let aiEvaluationError = null;

                if (videoId) {
                    try {
                        transcript = await getTranscript(videoId);
                    } catch (error) {
                        console.error(
                            `Transcript failed for ${videoId}:`,
                            error.message
                        );
                    }
                }

                if (transcript) {
                    try {
                        aiEvaluation = await evaluateTranscript(
                            searchQuery,
                            transcript
                        );
                    } catch (error) {
                        aiEvaluationError = error.message;

                        console.error(
                            `AI evaluation failed for ${videoId}:`,
                            error.message
                        );
                    }
                }

                const relevance = getRelevanceScore(searchQuery, video);
                const popularity = getPopularityScore(video.views);
                const duration = getDurationScore(video.seconds);

                let qualityScore;
                let rankingMethod;

                if (aiEvaluation) {
                    qualityScore = Math.round(
                        aiEvaluation.qualityScore * 0.60 +
                        relevance * 0.25 +
                        popularity * 0.10 +
                        duration * 0.05
                    );

                    rankingMethod = 'ai-transcript-ranking';
                } else {
                    // Fallback if captions or AI evaluation are unavailable.
                    qualityScore = Math.round(
                        relevance * 0.60 +
                        popularity * 0.25 +
                        duration * 0.15
                    );

                    rankingMethod = 'metadata-fallback';
                }

                return {
                    title: video.title,
                    url: video.url,
                    thumbnail: video.thumbnail,
                    duration: video.timestamp,
                    views: video.views,
                    channel: video.author?.name,
                    content: video.description,

                    transcriptAvailable: Boolean(transcript),
                    aiEvaluated: Boolean(aiEvaluation),
                    aiEvaluation,
                    aiEvaluationError,

                    qualityScore,
                    rankingMethod,

                    scoreBreakdown: {
                        relevance: Math.round(relevance),
                        popularity: Math.round(popularity),
                        duration: Math.round(duration),
                        aiQuality: aiEvaluation?.qualityScore ?? null
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
            rankingMethod: 'ai-transcript-ranking-with-fallback',
            results
        });

    } catch (error) {
        console.error('AI YouTube Search Error:', error);

        return res.status(500).json({
            success: false,
            message: 'AI-powered YouTube search failed'
        });
    }
};