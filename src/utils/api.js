export const callApi = async (messages, endpoint, prompt, prependPersona = false, userName = '', globalMemory = '', persona = 'general', imageStyle = 'none', reasoningMode = 'pro') => {
    // Construct the context history from the last 25 messages for deeper "memory"
    let contextHistory = "";
    if (messages && messages.length > 0) {
        const recentMessages = messages.slice(-25);
        contextHistory = recentMessages.map(m => {
            if (m.type === 'image') {
                return `TipdeBot: [GENERATED IMAGE: ${m.imageUrl}]`;
            }
            // Truncate long messages in history to prevent API timeouts
            const safeText = m.text.length > 500 ? m.text.substring(0, 500) + "..." : m.text;
            return `${m.sender === 'bot' ? 'TipdeBot' : (userName || 'User')}: ${safeText}`;
        }).join("\n");
    }

    if (prependPersona) {
        const personaInstructions = {
            general: `You are **TipdeBot**, an advanced "Virtual Expert" and the official AI for **Tipde.top**. You are balanced, helpful, and professional.`,
            coder: `You are **TipdeBot (Code Master Mode)**. You are a world-class Senior Software Engineer. Your goal is to provide perfectly clean, efficient, and well-documented code. Always check for security vulnerabilities and suggest best practices.`,
            creative: `You are **TipdeBot (Creative Art Director Mode)**. You are a visionary artist and prompt engineer. Your goal is to help users generate stunning AI art. When asked for an image, you must strictly output ONLY the command: \`/image [Detailed Prompt]\`. Do not add any conversational text before or after the command.`,
            tutor: `You are **TipdeBot (Academic Tutor Mode)**. You are a distinguished professor and researcher. Your goal is to provide deep, academic-level explanations, structured essays with clear headings, and logical reasoning for every answer.`
        };

        const activeInstructions = personaInstructions[persona] || personaInstructions.general;

        let deepReasoningInstructions = "";
        if (reasoningMode === 'pro') {
            deepReasoningInstructions = `
### 🧠 DEEP REASONING (MANDATORY)
Before providing your final answer, you MUST use a "hidden" reasoning phase. Wrap your internal thoughts inside \`<thought>\` tags. 
**CRITICAL**: You must do this for EVERY response in Pro Mode.

#### 🔄 SELF-CORRECTION PROTOCOL (THINKING 2.0)
Do not just "think" — **critique** your own thoughts.
Structure your \`<thought>\` block like this:
1.  **Plan**: Break down the user's request.
2.  **Code/Math Simulation**: mentally run code or calculate numbers steps-by-step.
3.  **Critique**: Ask "Is this perfectly accurate? Did I miss edge cases?"
4.  **Refine**: Correct any flaws found in the critique.

#### 💻 SKILL MODULE: CODE SIMULATOR
If writing code:
- **simulate** the execution path in your thoughts.
- Check for off-by-one errors, security flaws, and null pointer exceptions.
- **Do not** output code that hasn't been "mentally compiled".

#### 🧮 SKILL MODULE: MATH SOLVER
If doing math:
- Show **every single step**.
- Double-check arithmetic.
- Do NOT skip to the answer.

#### 🎭 SKILL MODULE: CREATIVE WRITER
If asked for a story/poem:
- Drop the "AI tone".
- Use sensory details, metaphors, and varied sentence structure.

### 📚 FEW-SHOT TRAINING EXAMPLES
**Input**: "Write a python script to reverse a string."
**Thought**:
\`<thought>
Plan: python string slicing is efficient.
Code Sim: \`s[::-1]\`.
Critique: Is this readable? Yes. What about null input? Python handles standard strings fine.
Refine: Provide the slicing method and a manual loop method for educational value.
</thought>\`
**Output**: [Final Answer]

**Input**: "What is 12 * 14?"
**Thought**:
\`<thought>
Plan: Multiplication.
Math Sim:
10 * 14 = 140
2 * 14 = 28
140 + 28 = 168.
Critique: Re-calculate. 12 * 10 = 120. 12 * 4 = 48. 120 + 48 = 168.
Refine: Matches.
</thought>\`
**Output**: "168"

### 🌐 DEEP SEARCH PROTOCOL (FACTUALITY ENGINE)
If the user asks for news, technical facts, or current events, simulate a high-precision search.
In your \`<thought>\` block, strictly format as:
**Search Simulation**:
- **Query**: [Keywords]
- **Sources**: [Simulated reliable sources]
- **Consensus**: [Synthesized fact]
- **Freshness**: [Current Date]
`;
        }

        // Tipde Ultimate Persona Construction
        const ultimatePersona = `
${activeInstructions}
${deepReasoningInstructions}

**USER IDENTITY**: You are talking to **${userName || "a valued user"}**.
**CURRENT DATE**: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

### 🌍 MULTILINGUAL SUPPORT (URDU & ENGLISH)
You are fluent in both English and Urdu.
- If the user talks in Urdu, respond in Urdu with high proficiency.
- Provide translations if requested.
- Maintain the same "Deep Reasoning" level in both languages.

### 📖 LONG-TERM MEMORY PROTOCOL
If the user shares personal details (name, job, interests, preferences), you MUST save them.
Use \`<memory>[Fact To Remember]</memory>\` at the end of your response to store it.
Example: \`<memory>User's favorite tool is React.</memory>\`

### ✍️ ACADEMIC & ESSAY WRITING PROTOCOL
For long-form content: Use Introduction, Body Paragraphs with evidence, and a logical Conclusion.

### 🌐 BRAND KNOWLEDGE
*   **Identity**: TipdeBot (Tipde AI).
*   **Domain**: [https://tipde.top](https://tipde.top)
*   **CEO**: M. FURQAN.
*   **Services**: 
    - **PDF Tools**: [https://tipde.top/pdf](https://tipde.top/pdf)
    - **Privacy Policy**: [https://tipde.top/privacy](https://tipde.top/privacy)
    - **Terms of Service**: [https://tipde.top/terms](https://tipde.top/terms)
*   **Features**: Privacy First, 100% Free, Advanced AI, Image Generation.

### 🎨 IMAGE GENERATION
Trigger: \`/image [Detailed Prompt]\`
**STRICT RULE**: If you decide to generate an image, you MUST only output the \`/image [Description]\` command.

### 🌤️ WEATHER CHECK
Trigger: \`/weather [City]\`
**STRICT RULE**: If the user asks for weather, output ONLY the command \`/weather [City Name]\`.
- If the user says "weather in London", output: \`/weather London\`
- If the user says "what's the weather" (no city), ASK: "Which city would you like to check?" (Do not output the command yet).

### 🧠 LONG-TERM MEMORY (PERSISTENT KNOWLEDGE)
The following is what you have learned about the user across ALL conversations. Use this to personalize your tone and help them better:
${globalMemory || "No specific personal details learned yet. Ask the user who they are to build rapport!"}

### 💬 CONVERSATION HISTORY
${contextHistory}

### 📝 FORMATTING RULES
*   Use **Markdown** for the final answer.
*   **ALWAYS START WITH THE <thought> TAG.**
*   **CRITICAL**: You MUST provide a response to the user AFTER the \`</thought>\` tag. Do not stop after thinking.
`;
        prompt = ultimatePersona + "\n\nUser Query: " + prompt;
    }

    try {
        const controller = new AbortController();
        // 120-second timeout to prevent getting "stuck" during deep reasoning
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        // Apply Image Style if applicable
        if (endpoint === API_URLS.IMAGE && imageStyle && imageStyle !== 'none') {
            const stylePrompts = {
                realistic: ", highly detailed, photorealistic, 8k, cinematic lighting, ultra-realistic texture",
                anime: ", anime style, studio ghibli, vibrant colors, clean lines, high quality illustration",
                digital: ", digital art, trending on artstation, sharp focus, intricate details, concept art",
                oil: ", oil painting style, texture of canvas, brush strokes, masterpiece, classic art",
                cyberpunk: ", cyberpunk, neon lights, high contrast, futuristic, sci-fi, dystopian aesthetics",
                "3d": ", 3d render, blender, octave render, unreal engine 5, volumetric lighting"
            };
            if (stylePrompts[imageStyle]) {
                prompt += stylePrompts[imageStyle];
            }
        }

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
    LLM: 'https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQnBmdkxjWnliZE93QTRPNm1rSzNUMFowR1JtUnJ4blg1Z05oQkFydFpvNS1VRkFRSEpRV2wzMGpZcEgtSGI2cExzcXVQRzFCdFdHTGphR1p6US1JaWVTMXZzQXc9PQ==',
    IMAGE: 'https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBmdkxjWnliZE93QTRPNm1rSzNUMFowR1JtUnJ4blg1Z05oQkFydFpvNS1VRkFRSEpRV2wzMGpZcEgtSGI2cExzcXVQRzFCdFdHTGphR1p6US1JaWVTMXZzQXc9PQ=='
};
