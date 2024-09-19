import React from 'react';
import Lottie from 'react-lottie';
import animationData from './hourglass.json'; // Replace './hourglass.json' with the path to your Lottie animation JSON file

const AnimatedHourglass = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default AnimatedHourglass;