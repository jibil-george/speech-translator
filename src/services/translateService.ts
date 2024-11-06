export const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    // Using browser's built-in language detection
    const sourceLang = 'auto';
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang === 'en-US' ? 'en' : 'de'}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error('Translation error:', error);
    return `Translation failed: ${text}`;
  }
};