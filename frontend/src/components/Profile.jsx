import React, { useState } from "react";

function Profile() {
  const profile = JSON.parse(localStorage.getItem("userInfo"));
  const [username, setUsername] = useState(profile.data.username);
  const [email, setEmail] = useState(profile.data.email);
  const [image, setImage] = useState(profile?.data?.avtar);
  console.log(image);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="w-[450px] shadow-lg rounded-lg p-14">
        {/* Photo */}
        <form className="flex">
          {/* Image Preview and File Input Trigger */}
          <img
            src={image}
            alt="Profile Thumbnail"
            className="w-52 rounded-full object-cover bg-gray-300"
          />
          <label
            htmlFor="file"
            title="edit image"
            className="cursor-pointer border h-7 w-7 rounded-xl"
          >
            ✏️
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </form>

        {/* Username */}
        <div className="m-4">
          <label className="text-white text-sm font-medium">Username:</label>
          <div className="text-lg font-semibold text-white">{username}</div>
        </div>

        {/* Email */}
        <div className="m-4">
          <label className="text-white text-sm font-medium">Email:</label>
          <div className="text-lg font-semibold text-white">{email}</div>
        </div>

        <div className="m-4">
          <label className="text-white text-sm font-medium">CreatedAt:</label>
          <div className="text-lg font-semibold text-white">
            {profile.data.createdAt.slice(0, 10).split("-").reverse().join("-")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
