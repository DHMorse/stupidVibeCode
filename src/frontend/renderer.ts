document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('inputText') as HTMLTextAreaElement;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  const responseDiv = document.getElementById('response') as HTMLDivElement;

  submitButton.addEventListener('click', async () => {
    const text = inputText.value;
    if (!text) return;

    try {
      const response = await fetch('http://localhost:8080/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      responseDiv.textContent = data.message;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      responseDiv.textContent = `Error: ${errorMessage}`;
    }
  });
}); 