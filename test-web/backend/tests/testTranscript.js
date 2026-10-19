
import { fetchTranscript } from "youtube-transcript-plus";

const videoId = "XFvNd4ozvqk";

async function getTranscript(videoId) {
    try {
        
        const transcript = await fetchTranscript(videoId, {
            lang: "en"
        });

        return {
            text: transcript.map(s => s.text).join(" "),
            language: "en"
        };
    } catch (error) {
        console.log("English captions unavailable. Trying default transcript...");

        try {
            
            const transcript = await fetchTranscript(videoId);

            return {
                text: transcript.map(s => s.text).join(" "),
                language: "default"
            };
        } catch (fallbackError) {
            console.log("No accessible transcript for this video.");

            return null;
        }
    }
}

const result = await getTranscript(videoId);

if (result) {
    console.log("Language requested:", result.language);
    console.log(result.text);
} else {
    console.log("Skip transcript scoring for this video.");
}
