import { useEffect, useState } from "react";

export default function RepublicDayPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date();
    const isRepublicDay =
      today.getDate() === 26 && today.getMonth() === 0; // Jan = 0

    if (isRepublicDay) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
  onClick={() => setShow(false)}
>
      <div
  className="relative bg-black rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
        {/* Close button */}
        <button
  onClick={() => setShow(false)}
  className="absolute top-2 right-2 bg-white/80 text-black text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-white"
>
  ×
</button>
        {/* Image */}
        <img
          src="/republic-day.jpg"
          alt="Happy Republic Day"
          className="w-full object-cover"
        />

        {/* Text */}
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-yellow-400">
            🇮🇳 Happy Republic Day 🇮🇳
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            ಸಂವಿಧಾನ ನಮ್ಮ ಶಕ್ತಿ, ನಮ್ಮ ಹೆಮ್ಮೆ
          </p>
        </div>
      </div>
    </div>
  );
}
