import Image from "next/image";


const Bannar = () => {
    return (
        <div>
            <Image src='/public/assets/bannar.jpg' height={100} width={120} alt="bannar"></Image>
        </div>
    );
};

export default Bannar;