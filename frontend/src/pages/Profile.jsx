import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setProfile(res.data.user);
        } else {
          console.error("Failed to fetch profile:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="text-center mt-10 text-2xl font-semibold font-sans text-gray-400">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-[#111] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1F1F1F] shadow-lg rounded-2xl p-10 border border-gray-800">
          <div className="mb-8 border-b border-gray-700 pb-6">
            <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide mb-2">👤 Profile</h1>
            <p className="text-lg text-gray-300 font-medium">View and manage your account details below.</p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-base font-semibold text-gray-400 mb-1">Full Name</label>
              <div className="mt-1 text-2xl text-white font-bold">{profile.name}</div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-400 mb-1">Email</label>
              <div className="mt-1 text-2xl text-white font-bold">{profile.email}</div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-400 mb-1">Account Created</label>
              <div className="mt-1 text-lg text-gray-300 font-medium">
                {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-400 mb-1">Last Updated</label>
              <div className="mt-1 text-lg text-gray-300 font-medium">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="mt-10 text-base text-gray-500 border-t border-gray-700 pt-6 font-medium">
            If you have any issues or questions, feel free to reach out to our support team.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;