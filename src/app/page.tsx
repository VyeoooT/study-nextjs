import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex gap-20 w-full">
        <div className="w-1/2 h-svh bg-red-300">
          {/* use image local */}
          <Image
            src="/images/suffer.png"
            alt="img"
            width={200}
            height={200}
            quality={100}
            title="image local"
            className="w-[500px] h-[500px]"
          />
        </div>

        <div>
          {/* use image remote */}
          <Image
            src="https://images.pexels.com/photos/27559006/pexels-photo-27559006/free-photo-of-nha-hang-khach-s-n-ban-sang-tr-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="img remote domain pixel"
            width={900}
            height={400}
            quality={100}
            title="image remote pixel"
          />
        </div>

        <div>
          {/* use image remote */}
          <Image
            src="https://i.pinimg.com/564x/4a/93/ae/4a93ae0e9fbf96e68a84b4fad16ef748.jpg"
            alt="img remote domain printerest"
            width={400}
            height={400}
            quality={100}
            title="image remote printerest"
          />
        </div>
      </div>
    </main>
  );
}
