import yts from 'yt-search';

export const searchYt = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "search query is required"
            });
        }

        const ytResponse = await yts(query.trim());

        // Limit results to only top 5 videos
        const results = (ytResponse.videos || []).slice(0, 5).map((video) => ({
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            duration: video.timestamp,
            views: video.views,
            channel: video.author?.name,
            content: video.description
        }));

        return res.status(200).json({
            success: true,
            query: query.trim(),
            results
        });

    } catch (error) {
        console.error("YouTube Search Error:", error);

        return res.status(500).json({
            success: false,
            message: "YouTube search failed"
        });
    }
};