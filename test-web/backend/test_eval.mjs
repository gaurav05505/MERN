import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1'
});

console.log('Model in env:', process.env.NVIDIA_MODEL);
console.log('API key prefix:', process.env.NVIDIA_API_KEY?.slice(0, 10));

try {
  const t0 = Date.now();
  console.log('Sending request to NVIDIA...');
  const r = await client.chat.completions.create({
    model: process.env.NVIDIA_MODEL,
    messages: [{ role: 'user', content: 'Say hello in 5 words' }],
    max_tokens: 20
  });
  console.log('Took:', Date.now() - t0, 'ms');
  console.log('Response:', r.choices[0].message.content);
} catch (e) {
  console.error('Error status:', e.status, 'Message:', e.message);
}
