import yts from 'yt-search'

const normalize = (text = "") => 
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim(); 

const getRelevanceScore = (query , video )=> {
    const queryWords = normalize(query).split(/\s+/).filter(Boolean); 
    const title = normalize(video.title); 
    const description = normalize(video.description); 
    const searchableText = `${title} ${description}`; 

    if(queryWords.length === 0 ){
        return 0; 
    }

    const titleMatches = queryWords.filter(word => 
        title.includes(word)
    ).length; 

    const descriptionMatches = queryWords.filter(word => 
        description.includes(word)
    ).length; 


    return Math.min(
        100,
        (titleMatches/queryWords.length)*70 +
        (descriptionMatches / queryWords.length) * 30
    ); 

}

const getTitleScore = (title = '') =>{
    const text = normalize(title); 

    const usefulSignals = [
        'tutorial',
        'explained',
        'complete course',
        'beginner',
        'step by step',
        'with examples',
        'lecture',
        'full course'
    ];

    const signalsFound = usefulSignals.filter(signal => 
        text.includes(signal)
    ).length
}

const getDurationScore = (sec) => {
    if(!Number.isFinite(sec) || sec <= 0 ){
        return 0 ;
    }

    if(sec >= 300 && sec <= 3600){
        return 100; 
    }
    if(sec < 300 )return (sec / 300) * 100; 

    return Math.max(0 , 100- ((sec - 3600)/3600)*50); 

}

const getPopularityScore = (views) => {
    if(!Number.isFinite(views) || views <= 0){
        return 0; 
    }

    return Math.min(100 , (Math.log10(views)/7) *100); 
}

export const searchYt = async (req , res ) => {
    try {
        
        const {query} = res.body; 

        if(typeof query !== 'string' || !query.trim()){
            return res.status(400).json({
                success: false, 
                Message: 'search query is required'
            })
        }

        const searchQuery = query.trim(); 
        const ytResponse = await yts(searchQuery); 

        const results = (ytResponse.videos || [])
            .filter(video => video.title && video.url)
            .map(video => {
                const relevance = getRelevanceScore(searchQuery, video);
                const titleScore = getTitleScore(video.title);
                const popularity = getPopularityScore(video.views);
                const durationSeconds = video.seconds;
                const duration = getDurationScore(durationSeconds);

                const qualityScore = Math.round(
                    relevance * 0.50 +
                    popularity * 0.20 +
                    titleScore * 0.20 +
                    duration * 0.10
                );

                return {
                    title: video.title,
                    url: video.url,
                    thumbnail: video.thumbnail,
                    duration: video.timestamp,
                    views: video.views,
                    channel: video.author?.name,
                    content: video.description,
                    qualityScore,
                    scoreBreakdown: {
                        relevance: Math.round(relevance),
                        popularity: Math.round(popularity),
                        titleSignals: Math.round(titleScore),
                        duration: Math.round(duration)
                    }
                };
            })
            .sort((a, b) => b.qualityScore - a.qualityScore)
            .slice(0, 5);

        return res.status(200).json({
            success: true,
            query: searchQuery,
            rankingMethod: 'heuristic-v1',
            results
        });



    } catch (error) {
        console.error('YouTube Search Error:', error);

        return res.status(500).json({
            success: false,
            message: 'YouTube search failed'
        });
    }
}