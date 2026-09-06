// Infinity AI Speech & Voice Service (Web Speech API)

const SpeechService = {
    recognition: null,
    isListening: false,
    ttsEnabled: false,
    selectedVoice: null,

    init(onResultCallback, onEndCallback) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (onResultCallback) onResultCallback(transcript);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                if (onEndCallback) onEndCallback();
            };

            this.recognition.onerror = (err) => {
                console.warn('Speech recognition error:', err);
                this.isListening = false;
                if (onEndCallback) onEndCallback();
            };
        }
    },

    toggleListening(onResultCallback, onEndCallback) {
        if (!this.recognition) {
            alert('Speech Recognition is not supported by your browser. Please try Chrome or Edge.');
            return false;
        }

        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            return false;
        } else {
            this.init(onResultCallback, onEndCallback);
            this.recognition.start();
            this.isListening = true;
            return true;
        }
    },

    speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop current speech

        // Strip code blocks and markdown symbols before reading
        const cleanText = text
            .replace(/```[\s\S]*?```/g, 'Code block omitted.')
            .replace(/`[^`]*`/g, '')
            .replace(/[*#_~>]/g, '')
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    },

    stopSpeaking() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },

    getVoices() {
        if (!('speechSynthesis' in window)) return [];
        return window.speechSynthesis.getVoices();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeechService;
}
