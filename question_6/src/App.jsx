import React, { useState, useEffect, useRef } from "react";

const ZenosParadox = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [achillesPos, setAchillesPos] = useState(0);
  const [tortoisePos, setTortoisePos] = useState(200);
  const [paradoxSteps, setParadoxSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const animationRef = useRef();
  const startTimeRef = useRef();

  const ROAD_LENGTH = 500;
  const ANIMATION_DURATION = 20000;
  const ACHILLES_SPEED = 25;
  const TORTOISE_SPEED = 10;
  const TORTOISE_HEAD_START = 200;

  const calculateParadoxSteps = () => {
    const steps = [];
    let achillesStart = 0;
    let tortoiseStart = TORTOISE_HEAD_START;

    for (let i = 0; i < 8; i++) {
      const timeToReach =
        (tortoiseStart - achillesStart) / (ACHILLES_SPEED - TORTOISE_SPEED);
      const achillesEnd = achillesStart + ACHILLES_SPEED * timeToReach;
      const tortoiseEnd = tortoiseStart + TORTOISE_SPEED * timeToReach;

      steps.push({
        step: i + 1,
        achillesStart,
        tortoiseStart,
        achillesEnd,
        tortoiseEnd,
        timeToReach,
        distance: tortoiseStart - achillesStart,
      });

      achillesStart = achillesEnd;
      tortoiseStart = tortoiseEnd;

      if (timeToReach < 0.01) break;
    }

    return steps;
  };

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    const newAchillesPos = ACHILLES_SPEED * (elapsed / 1000);
    const newTortoisePos =
      TORTOISE_HEAD_START + TORTOISE_SPEED * (elapsed / 1000);

    setAchillesPos(Math.min(newAchillesPos, ROAD_LENGTH));
    setTortoisePos(Math.min(newTortoisePos, ROAD_LENGTH));

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  };

  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    setAchillesPos(0);
    setTortoisePos(TORTOISE_HEAD_START);
    setCurrentStep(0);
    startTimeRef.current = null;

    animationRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAchillesPos(0);
    setTortoisePos(TORTOISE_HEAD_START);
    setCurrentStep(0);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    setParadoxSteps(calculateParadoxSteps());

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // const demonstrateParadoxStep = () => {
  //   if (currentStep < paradoxSteps.length) {
  //     const step = paradoxSteps[currentStep];
  //     setAchillesPos(step.achillesEnd);
  //     setTortoisePos(step.tortoiseEnd);
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  return (
    <div className="p-8 bg-gradient-to-b from-sky-200 to-green-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Zeno's Paradox: Achilles and the Tortoise
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          According to Zeno's paradox, Achilles can never overtake the tortoise
          because by the time he reaches where the tortoise was, it has moved a
          little further ahead.
        </p>

        <div className="relative bg-gray-800 h-36 rounded-lg mb-8 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-1 bg-yellow-400"
                style={{
                  left: `${i * 10}%`,
                  animation: "dash 1s linear infinite",
                }}
              />
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white opacity-80">
            <div
              className="h-full bg-black"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, black 0, black 10px, white 10px, white 20px)",
              }}
            />
          </div>

          {[0, 100, 200, 300, 400, 500].map((distance) => (
            <div
              key={distance}
              className="absolute bottom-2 text-white text-xs font-mono"
              style={{ left: `${(distance / ROAD_LENGTH) * 100}%` }}
            >
              {distance}px
            </div>
          ))}

          <div
            className="absolute top-7 transition-all duration-100 ease-linear"
            style={{ left: `${(achillesPos / ROAD_LENGTH) * 100}%` }}
          >
            <div className="text-4xl">🏃🏾‍♂️‍➡️</div>
            <div className="text-xs text-white font-bold">Achilles</div>
            <div className="text-xs text-white">
              {Math.round(achillesPos)}px
            </div>
          </div>

          <div
            className="absolute bottom-7 transition-all duration-100 ease-linear"
            style={{ left: `${(tortoisePos / ROAD_LENGTH) * 100}%` }}
          >
            <div className="text-4xl">🐢</div>
            <div className="text-xs text-white font-bold">Tortoise</div>
            <div className="text-xs text-white">
              {Math.round(tortoisePos)}px
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800">🏃‍♂️ Achilles</h3>
            <p className="text-sm text-blue-600">Speed: 25px/second</p>
            <p className="text-sm text-blue-600">Starting position: 0px</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold text-green-800">🐢 Tortoise</h3>
            <p className="text-sm text-green-600">Speed: 10px/second</p>
            <p className="text-sm text-green-600">Head start: 200px</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isAnimating ? "Racing..." : "Start Race"}
          </button>

          <button
            onClick={resetAnimation}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-purple-800">
            The Paradox Explained
          </h3>
          <p className="mb-4 text-gray-700">
            Zeno argued that Achilles must first reach where the tortoise
            currently is, but by then the tortoise has moved further ahead. This
            creates infinite steps:
          </p>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {paradoxSteps.slice(0, currentStep).map((step, index) => (
              <div key={index} className="p-3 bg-purple-50 rounded text-sm">
                <strong>Step {step.step}:</strong> When Achilles reaches{" "}
                {Math.round(step.tortoiseStart)}px (where tortoise was),
                tortoise is now at {Math.round(step.tortoiseEnd)}px. Gap
                remaining: {Math.round(step.tortoiseEnd - step.achillesEnd)}px
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              <strong>The Resolution:</strong> Zeno's PAradox has been
              disproved. While the paradox creates infinite steps, their
              durations form a geometric series that converges to a finite time.
              In reality, Achilles will overtake the tortoise at around 333px
              after about 13.3 seconds!
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-bold">Distance Gap</div>
              <div
                className={`text-lg ${
                  tortoisePos > achillesPos ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(Math.round(tortoisePos - achillesPos))}px
              </div>
            </div>
            <div>
              <div className="font-bold">Race Status</div>
              <div className="text-lg">
                {achillesPos >= tortoisePos
                  ? "🏃🏾‍♂️‍➡️ Achilles Wins!"
                  : achillesPos >= ROAD_LENGTH
                  ? "🏁 Race Over"
                  : isAnimating
                  ? "🏃🏾‍♂️‍➡️ Racing..."
                  : "⏸️ Paused"}
              </div>
            </div>
            <div>
              <div className="font-bold">Time to Catch Up</div>
              <div className="text-lg text-blue-600">
                {tortoisePos > achillesPos
                  ? `~${Math.max(
                      0,
                      (tortoisePos - achillesPos) /
                        (ACHILLES_SPEED - TORTOISE_SPEED)
                    ).toFixed(1)}s`
                  : "Caught up!"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenosParadox;
