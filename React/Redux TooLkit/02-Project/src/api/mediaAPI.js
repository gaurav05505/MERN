import axios from "axios";


const photos = import.meta.env.VITE_UNSPLASH_KEY
const video = import.meta.env.VITE_PEXELS_KEY

export async function fetchPhotos(query , page=1 , per_page=20){
    const res = await axios.get('https://api.unsplash.com/search/photos' , {
        params:{query ,page , per_page }, 
        headers:{Authorization:`Client-ID ${photos}`}
    }); 

   return res.data;
    
}

export async function fetchVideos(query , per_page=20){
    const res = await axios.get('https://api.pexels.com/videos/search' , {
        params:{query , per_page }, 
        headers:{Authorization:video}
    }); 

   return res.data;
    
}