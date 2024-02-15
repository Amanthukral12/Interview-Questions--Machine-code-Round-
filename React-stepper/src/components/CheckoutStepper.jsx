import { useState, useRef, useEffect } from "react";
import propTypes from "prop-types";

const CheckoutStepper = ({ stepConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepConfig.length]);

  console.log(`calc(100%-${margins.marginLeft + margins.marginRight}px)`);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepConfig.length - 1)) * 100;
  };

  if (!stepConfig.length) {
    return <></>;
  }
  const ActiveComponent = stepConfig[currentStep - 1]?.Component;
  return (
    <>
      <div className="stepper">
        {stepConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <ActiveComponent />
      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

CheckoutStepper.propTypes = {
  stepConfig: propTypes.array,
};

export default CheckoutStepper;
