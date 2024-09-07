import Image from "next/image";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-inter flex min-h-screen w-full justify-between">
      {children}
      <div className="auth-asset">
        <div>
          <Image src='/icons/auth-image.svg' alt='img' height={500} width={500}/>
        </div>
      </div>
    </main>
  );
};

export default layout;
