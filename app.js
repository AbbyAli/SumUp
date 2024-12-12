async function summarize() {
    const notes = document.getElementById("notes").value; // Get the text from textarea
    function clearNotes() {
        document.getElementById("notes").value = "";
        document.getElementById("summary").textContent = "Your summary will appear here.";
    }
    if (!notes.trim()) {
        document.getElementById("summary").textContent = "Please write some notes!";
        return;
    }

    const apiKey = "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"; // Replace with your OpenAI API key

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`, // Authenticate with your API key & added quotes around authorization - Syntax error
            },
            body: JSON.stringify({
                model: "gpt-4", // Model for summarization
                messages: [{ "role": "user", "content": `Summarize the following text:\n\n${notes}` }], // changed "prompt" to message because prompt would require a "back and forth communication insteadof just summarizing content."
                max_tokens: 150, // Adjust token length for the summary
                temperature: 0.7, // Creativity level
            }),

        });
        console.log(apiKey)
        console.log(notes)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse the API response
        console.log(data)
        document.getElementById("summary").textContent =
            data.choices[0].message.content.trim() || "No summary returned."; // data formatting was incorrect so added message.content to export the intended message. Wihtout these I was trying to access a field that doesn't exist.
    } catch (error) {
        console.error("Error:", error); // Log any errors
        document.getElementById("summary").textContent =
            `An error occurred: ${error.message}`;
    }
}
