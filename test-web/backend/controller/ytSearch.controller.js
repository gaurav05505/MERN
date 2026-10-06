export const searchYt = async (res , req ) => {
    try {
        
        const {query} = req.body; 

        if(!query || !query.trim()){
            return res.status(400).json({
                success : false, 
                message: "search query is required"
            }); 
        }

        const res = await yts(query.trim()); 

        const result = res.videos.slice(0 , 5).map((video)=> ({
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            duration: video.timestamp,
            views: video.views,
            channel: video.author?.name
        }))

        return res.status(200).json({
            success: true , 
            query: query.trim(), 
            result
        })

    } catch (error) {
        console.error("YouTube Search Error:", error);

        return res.status(500).json({
            success: false,
            message: "YouTube search failed"
        });

    }
}