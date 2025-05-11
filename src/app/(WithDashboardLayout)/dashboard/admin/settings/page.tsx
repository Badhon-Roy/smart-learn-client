"use client"
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const SiteSettingsDashboardPage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#029bc0');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠️ Site Settings</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">

        {/* Site Title */}
        <div className="form-control">
          <label className="label font-semibold">Site Title</label>
          <input type="text" placeholder="Enter site title" className="input input-bordered" />
        </div>

        {/* Site Description */}
        <div className="form-control">
          <label className="label font-semibold">Site Description</label>
          <textarea placeholder="Enter site description" className="textarea textarea-bordered"></textarea>
        </div>

        {/* Logo Upload */}
        <div className="form-control">
          <label className="label font-semibold">Upload Logo</label>
          <input type="file" className="file-input file-input-bordered w-full" />
        </div>

        {/* Favicon Upload */}
        <div className="form-control">
          <label className="label font-semibold">Upload Favicon</label>
          <input type="file" className="file-input file-input-bordered w-full" />
        </div>

        {/* Primary Color Picker */}
        <div className="form-control">
          <label className="label font-semibold">Primary Color</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full h-12 p-0 border rounded-lg cursor-pointer"
          />
        </div>

        {/* Contact Email */}
        <div className="form-control">
          <label className="label font-semibold">Contact Email</label>
          <input type="email" placeholder="admin@example.com" className="input input-bordered" />
        </div>

        {/* Social Media Links */}
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label font-semibold">Social Media Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FacebookIcon className="text-blue-600" />
              <input type="url" placeholder="Facebook URL" className="input input-bordered w-full" />
            </div>
            <div className="flex items-center gap-2">
              <TwitterIcon className="text-sky-500" />
              <input type="url" placeholder="Twitter URL" className="input input-bordered w-full" />
            </div>
            <div className="flex items-center gap-2">
              <LinkedInIcon className="text-blue-700" />
              <input type="url" placeholder="LinkedIn URL" className="input input-bordered w-full" />
            </div>
            <div className="flex items-center gap-2">
              <InstagramIcon className="text-pink-500" />
              <input type="url" placeholder="Instagram URL" className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        {/* Default Language */}
        <div className="form-control">
          <label className="label font-semibold">Default Language</label>
          <select className="select select-bordered">
            <option value="en">English</option>
            <option value="bn">Bangla</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Theme Mode Toggle */}
        <div className="form-control">
          <label className="label font-semibold">Theme Mode</label>
          <button
            type="button"
            className="btn btn-outline flex items-center gap-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Maintenance Mode Toggle */}
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label font-semibold">Maintenance Mode</label>
          <Switch
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
          />
          <p className="text-sm mt-1">
            {maintenanceMode ? 'Maintenance mode is ON' : 'Maintenance mode is OFF'}
          </p>
        </div>

        {/* Footer Text */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Footer Copyright</label>
          <input type="text" placeholder="© 2025 OnlineCoursePro. All rights reserved." className="input input-bordered" />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="btn btn-primary px-10">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsDashboardPage;
