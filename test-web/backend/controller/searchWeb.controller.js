import {tavily} from '@tavily/core'; 

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})


export const searchWeb = async (req , res) => {
    try {
        
        const {query} = req.body; 

        if(!query || !query.trim()){
            return res.status(400).json({
                success  : false, 
                message: "search query is required"
            })
        }

        const res = await tvly.search(query.trim() , {
            searchDepth: "basic",
            maxResults: 5
        })

        return res.status(200).json({
            success: true,
            query: query.trim(),
            results : response.results
        })


    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}