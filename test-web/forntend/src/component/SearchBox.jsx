import React, { useState } from 'react'
import { Search, History } from 'lucide-react'

const SearchBox = ({ setResults, endpoint = "http://localhost:5000/api/search", placeholder = "Search what ever you want...." }) => {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: query.trim()
                })
            });

            const data = await response.json();
            setResults(data.results || []);

        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSearch} className='flex items-center gap-3 w-full'>
        {/* Search Input Box */}
        <div className='flex-1 flex items-center border border-[#7A7A7A] bg-[#E3E3E3]/60 px-4 py-2.5'>
          <Search size={18} className='text-[#6E6E6E] shrink-0' />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className='w-full bg-transparent text-sm text-[#222] placeholder-[#737373] outline-none ml-3 font-normal'
          />
        </div>

        {/* Search Button */}
        <button 
          type="submit"
          disabled={loading}
          className='bg-[#D17E1C] hover:bg-[#b86d17] disabled:opacity-60 text-white px-7 py-2.5 text-sm font-normal transition-colors cursor-pointer'
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {/* History Button */}
        <button 
          type="button" 
          className='flex items-center gap-2 px-5 py-2.5 text-sm text-[#222] bg-[#DBDBDB] hover:bg-[#D1D1D1] border border-[#C5C5C5] shadow-md transition-all font-normal cursor-pointer'
        >
          <History size={16} className='text-[#333]' />
          <span>History</span>
        </button>
    </form>
  )
}

export default SearchBox
