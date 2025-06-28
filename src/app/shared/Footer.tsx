'use client';

import {
  Facebook,
  Instagram,
  Pinterest,
  YouTube,
  Phone,
  Email,
  CalendarMonth,
  ArrowRightAlt,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1d1f] text-white pt-16 pb-10 px-6 md:px-20">
     <div className="container mx-auto px-4">


      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* Get In Touch */}
        <div>
           <Link href="/" passHref>
                        <Image src={Logo} alt="smart_learn_logo" width={90} height={90} />
                    </Link>
          <p className="mb-4 text-gray-400">
            Fusce varius, dolor tempor interdum tristiquei bibendum.
          </p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 text-[#07a698]" />
            <span>(702) 123–1478</span>
          </div>
          <div className="flex items-center mb-4">
            <Email className="mr-2 text-[#07a698]" />
            <span>smartlearn@gmail.com</span>
          </div>
          <div className="flex space-x-3 mt-4 text-[#07a698]">
            <Facebook />
            <Pinterest />
            <Instagram />
            <YouTube />
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">COMPANY INFO</h3>
          <ul className="space-y-2">
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> About Us</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Resource Center</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Careers</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Instructor</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Become A Teacher</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> All Courses</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Digital Marketing</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Design & Branding</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> Storytelling & Voice Over</li>
            <li className="hover:text-[#07a698] flex items-center gap-1"><ArrowRightAlt /> News & Blogs</li>
          </ul>
        </div>

        {/* Recent Post */}
        <div>
          <h3 className="font-bold text-lg mb-4">RECENT POST</h3>
          <div className="flex items-start mb-4">
            <Image
              src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/footer-post-1.png"
              alt="post1"
              width={60}
              height={60}
              className="rounded-md mr-4"
            />
            <div>
              <p className="font-semibold text-sm mb-1">Importance of Arts Integrating</p>
              <div className="flex items-center text-gray-400 text-xs">
                <CalendarMonth fontSize="small" className="mr-1" />
                20 April, 2024
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Image
              src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/footer-post-2.png"
              alt="post2"
              width={60}
              height={60}
              className="rounded-md mr-4"
            />
            <div>
              <p className="font-semibold text-sm mb-1">Development Student Best Achievement</p>
              <div className="flex items-center text-gray-400 text-xs">
                <CalendarMonth fontSize="small" className="mr-1" />
                20 April, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </footer>
  );
}
