// import { useEffect, useState } from "react";

// export function TranslationOverlay() {
//   const [text, setText] = useState<string>("");
//   const [isVisible, setIsVisible] = useState<boolean>(false);

//   console.log("TranslationOverlay component rendered");

//   useEffect(() => {
//     console.log("Listening for translation-request events");

//     const handleTranslationRequest = (
//       event: CustomEvent<{
//         text: string;
//         sendResponse: (response?: { text?: string; error?: string }) => void;
//       }>
//     ) => {
//       const { text: receivedText, sendResponse } = event.detail;
//       console.log("Translation request received in React:", receivedText);

//       // Set the text and show the overlay
//       setText(receivedText);
//       setIsVisible(true);

//       // Send a simple response back
//       sendResponse({ text: `[Mock translation of: ${receivedText}]` });
//     };

//     // Add event listener
//     window.addEventListener("translation-request", handleTranslationRequest as EventListener);

//     // Cleanup
//     return () => {
//       window.removeEventListener("translation-request", handleTranslationRequest as EventListener);
//     };
//   }, []);

//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <div className="fixed top-4 right-4 z-999999 min-w-[200px] max-w-[400px] rounded-lg border-2 border-blue-500 bg-white p-4 shadow-lg">
//       <div className="space-y-2">
//         <p className="text-sm font-bold text-gray-800">Selected Text:</p>
//         <p className="text-sm text-gray-600">{text}</p>
//         <button
//           onClick={() => {
//             setIsVisible(false);
//             setText("");
//           }}
//           className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
