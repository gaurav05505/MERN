import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

const getRelevanceScore = (query, result) => {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const title = normalize(result.title || "");
  const content = normalize(result.content || "");

  if (!words.length) return 0;

  const titleMatches = words.filter((word) => title.includes(word)).length;
  const contentMatches = words.filter((word) => content.includes(word)).length;

  return Math.min(
    100,
    (titleMatches / words.length) * 70 + (contentMatches / words.length) * 30,
  );
};

const getEducationalScore = (result) => {
  const text = normalize(`${result.title || ""} ${result.content || ""}`);

  const signals = [
    "tutorial",
    "explained",
    "guide",
    "examples",
    "step by step",
    "documentation",
    "course",
    "learn",
    "fundamentals",
    "concepts",
  ];

  return Math.min(
    100,
    signals.filter((signal) => text.includes(signal)).length * 20,
  );
};

const getCredibilityScore = (url = "") => {
  let hostname;

  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return 0;
  }

  const trustedDomains = [
    "wikipedia.org",
    "developer.mozilla.org",
    "learn.microsoft.com",
    "docs.python.org",
    "geeksforgeeks.org",
    "freecodecamp.org",
    "coursera.org",
    "mit.edu",
    "stanford.edu",
  ];

  return trustedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  )
    ? 100
    : 40;
};

const getContentDetailScore = (content = "") => {
  const length = content.trim().length;

  if (length >= 300) return 100;
  if (length >= 150) return 75;
  if (length >= 60) return 50;
  if (length > 0) return 25;

  return 0;
};

export const searchWeb = async (req, res) => {
  try {
    const { query } = req.body;

    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchQuery = query.trim();

    // Retrieve more candidates before ranking.
    const response = await tvly.search(searchQuery, {
      searchDepth: "basic",
      maxResults: 10,
    });

    const results = (response.results || [])
      .map((result) => {
        const relevance = getRelevanceScore(searchQuery, result);
        const educational = getEducationalScore(result);
        const credibility = getCredibilityScore(result.url);
        const detail = getContentDetailScore(result.content);

        const qualityScore = Math.round(
          relevance * 0.5 +
            educational * 0.25 +
            credibility * 0.15 +
            detail * 0.1,
        );

        return {
          ...result,
          qualityScore,
          scoreBreakdown: {
            relevance: Math.round(relevance),
            educational: educational,
            credibility,
            detail,
          },
        };
      })
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 5);

    return res.status(200).json({
      success: true,
      query: searchQuery,
      rankingMethod: "heuristic-v1",
      results,
    });
  } catch (error) {
    console.error("Web Search Error:", error);

    return res.status(500).json({
      success: false,
      message: "Web search failed",
    });
  }
};
