import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

interface LoaderWithLottieProps {
    width?: number;
}

const LoaderWithLottie: React.FC<LoaderWithLottieProps> = ({ width }) => {
    const animationContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load the Lottie animation
        const animation = lottie.loadAnimation({
            container: animationContainer.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/lottieJson/loaderLottie.json'
        });

        // Clean up by destroying the animation when the component unmounts or on re-render
        return () => {
            animation.destroy();
        };
    }, []); // Empty dependency array to ensure this effect runs only once

    return (
        <div

            style={{ width: width ? `${width}rem` : '10rem' }}
            className='w-40' ref={animationContainer}></div>
    );
};

export default LoaderWithLottie;
