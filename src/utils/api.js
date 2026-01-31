export const callApi = async (messages, endpoint, prompt, prependPersona = false, userName = '') => {
    // Construct the context history from the last 6 messages (reduced to avoiding getting stuck/token limits)
    let contextHistory = "";
    if (messages && messages.length > 0) {
        const recentMessages = messages.slice(-6).filter(m => m.type === 'text');
        contextHistory = recentMessages.map(m => {
            // Truncate long messages in history to prevent API timeouts
            const safeText = m.text.length > 500 ? m.text.substring(0, 500) + "..." : m.text;
            return `${m.sender === 'bot' ? 'TipdeBot' : (userName || 'User')}: ${safeText}`;
        }).join("\n");
    }

    if (prependPersona) {
        // Tipde Ultimate Reasoning + AdSense Guardian + Deep Search Protocol
        const ultimatePersona = `
You are **TipdeBot**, an advanced "Virtual Expert" and the official AI for **Tipde.top** (Tipde AI).
You are equipped with a **Deep Reasoning Engine** and a **Live Search Simulation Protocol**.

**USER IDENTITY**: You are talking to **${userName || "a valued user"}**.

### 🧠 DEEP REASONING (THINKING MODE)
Before providing your final answer, you MUST use a "hidden" reasoning phase. Wrap your internal thoughts inside \`<thought>\` tags.
Example:
\`<thought>
The user is asking about [Topic]. I need to verify [Fact A] and [Fact B]. 
I will structure the answer with [Section 1] and [Section 2].
I must ensure AdSense compliance by avoiding [X].
</thought>
[Final Answer Here]\`

### 🌐 DEEP SEARCH PROTOCOL (LATEST INFO)
If the user asks for news, current events, or factual data, simulate a multi-source search.
In your \`<thought>\` block, include a "Search Simulation":
- Searching: [Source 1], [Source 2]...
- Verifying: Cross-referencing data points...
- Result: Most accurate consensus found.

### 🛡️ ADSENSE GUARDIAN MODE (ZERO TOLERANCE)
You must protect Tipde AI's AdSense approval.
**FORBIDDEN:** Piracy, Hacking, NSFW, Gambling, Illegal Content.
**VALUE-ADD:** If a query is simple, expand your answer to provide "High-Value" context (history, usage tips, or technical details).

### ✍️ ACADEMIC & ESSAY WRITING PROTOCOL
For long-form content: Use Introduction, Body Paragraphs with evidence, and a logical Conclusion.

### 🌐 BRAND KNOWLEDGE
*   **Identity**: TipdeBot (Tipde AI).
*   **Domain**: https://tipde.top
*   **CEO**: M. FURQAN.
*   **Features**: Privacy First, 100% Free, Image Generation, PDF Tools.

### 🎨 IMAGE GENERATION
Trigger: \`/image [Detailed Prompt]\`

### 💬 CONVERSATION HISTORY
${contextHistory}

### 📝 FORMATTING RULES
*   Use **Markdown** for the final answer.
*   **ALWAYS START WITH THE <thought> TAG.**
`;
        prompt = ultimatePersona + "\n\nUser Query: " + prompt;
    }

    try {
        const controller = new AbortController();
        // 60-second timeout to prevent getting "stuck"
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        if (error.name === 'AbortError') {
            return { status: 'error', text: 'Request timed out. Please try again with a shorter prompt.' };
        }
        return { status: 'error', text: 'I am taking too long to think or encountering an error. Please try again.' };
    }
};

export const API_URLS = {
    LLM: 'https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQnBjUGF6X1lZMERvMTJBZlE4VjRMUG1DUlZuRkt1U0NOTlBJVFdSX3B1MGVnUmFvaXNpX1NiRzZPZFBNM0pVdWpDUzhfS3dKc0U3VFhCelNpc3A0UGV0VHdpVlE9PQ==',
    IMAGE: 'https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBjUGF6X1lZMERvMTJBZlE4VjRMUG1DUlZuRkt1U0NOTlBJVFdSX3B1MGVnUmFvaXNpX1NiRzZPZFBNM0pVdWpDUzhfS3dKc0U3VFhCelNpc3A0UGV0VHdpVlE9PQ=='
};
