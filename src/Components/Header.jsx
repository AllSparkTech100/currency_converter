import { useState, useEffect } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";



function Header() {
    const [isMenu, setIsMenu] = useState(false);

    const menuToggle = () => {
        setIsMenu(!isMenu);
    };

    useEffect(() => {
        if (isMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden")
        }
        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isMenu])
    return (
        <>
            <header className="sticky top-0 z-10 bg-white text-black">
                <div className="flex gap-5 justify-between h-20 items-center p-4 lg:p-2">

                    {/* <img href='/' src="/mhslogo.webp" alt="Logo" className="w-15 h-10 lg:ml-4" /> */}
                    <h3 className='text-black font-bold text-xl'>Current Exchanges</h3>

                    <div className="mx-auto text-black ">
                        <nav
                            className="hidden md:hidden lg:block sm:block basis-1/2 sm:text-lg text-xl"
                            aria-label="main">
                            {" "}
                            <ul className="flex uppercase font-medium items-center gap-5">
                                <li className=" lg:hover:text-black/50 lg:hover:transition-all"> <a href="/">Home</a></li>

                                <li className=" lg:hover:text-black/50 lg:hover:transition-all"><a href="/exchange">Exchanges</a></li>
                                <li className=" lg:hover:text-black/50 lg:hover:transition-all"> <a href="/history"> Historical Data</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center flex-row justify-center">
                        <button
                            onClick={menuToggle}
                            className="text-2xl text-black md:block lg:hidden sm:hidden focus:outline-none"
                        >
                            {isMenu ? <IoClose size={28} /> : <IoMenuSharp size={28} />}
                        </button>
                    </div>
                </div>{" "}
                {isMenu && (
                    <div className="sm:hidden md:block lg:hidden min-h-screen fixed w-full text-white fill-transparent bg-emerald-950 transition-colors ease-linear duration-100">
                        <div className="bg-slate-800 absolute z-10 transition-colors ease-linear duration-300 min-h-screen w-80 pt-5">
                            <div className=" text-white p-5">
                                <nav
                                    className="uppercase  text-xl">
                                    {" "}
                                    <ul className="text-left flex flex-col items-start gap-5">
                                        <li className=""> <a href="/">Home</a></li>

                                        <li className=""><a href="/exchange">Exchange Rates</a></li>
                                        <li className=""> <a href="/history"> Historical Data</a></li>
                                    </ul>

                                </nav>
                            </div>
                        </div>
                    </div>
                )}

            </header>

        </>
    );
}

export default Header;