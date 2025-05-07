
const Navbar = () => {

    const menus = [
        { title: 'ক্লাস ৬-১২' },
        { title: 'ক্লাস' },
        { title: 'ভর্তি পরীক্ষা' },
        { title: 'অনলাইন ব্যাচ' },
        { title: 'ইংলিশ সেন্টার' },
    ];

    return (
        <section className='bg-white shadow-md'>
            <nav className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <h2 className='text-lg font-bold text-red-500'><span className='text-3xl'>Smart</span>Learn</h2>
                </div>

                {/* Search bar */}
                <div className="flex-1 max-w-xl mx-4 relative">
                    <input
                        type="text"
                        placeholder="স্কিলস কোর্স, স্কুল প্রোগ্রাম সার্চ করুন..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#f87652]"
                    />
                </div>

                {/* Menus */}
                <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700">
                    {menus.map((menu, i) => (
                        <div key={i} className="flex items-center gap-1 cursor-pointer hover:text-[#f87652]">
                            {menu.title}
                        </div>
                    ))}
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
