import Image from 'next/image';
import spinner from '../../../../public/loaderInitial.gif';

interface LoaderWithLottieProps {
    width?: number;
    height?: number;
}

const LoaderWithLottie: React.FC<LoaderWithLottieProps> = ({ width, height }) => {

    return (
        <>
            <Image src={spinner} alt='Loader' width={150} height={150} />
        </>
    );
};

export default LoaderWithLottie;
