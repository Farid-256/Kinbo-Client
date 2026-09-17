import Image from "next/image";

const Bannar = () => {
    return (
        <div>
            <Image src='/assets/bannar.jpg' width={1200} height={200} className="w-full h-auto"priority
                quality={85} alt="bannar"/>
        </div>
    );
};

export default Bannar;