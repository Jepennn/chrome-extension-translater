import { useEffect, useState } from "react";

interface UseSpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    rate = 0.8, // Slightly slower for language learning
    pitch = 0.7,
    volume = 1,
  } = options;

  const speak = (text: string, lang: string) => {
    if (!text || isSpeaking) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set the language for proper pronunciation
    utterance.lang = lang;

    // Configure voice parameters
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Handle speech events
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.error("Speech synthesis error:", event.error);
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Cleanup: cancel any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return { speak, cancel, isSpeaking };
}
