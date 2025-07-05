import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LogOut, User, Mail, Lock, UserPen } from "lucide-react";
import AccountNav from "../AccountNav";

const API_BASE = "https://easytostay-backend.onrender.com";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    profilePic: "",
  });

  let { subpage } = useParams();
  if (!subpage) subpage = "profile";

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  async function logout() {
    try {
      await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
      toast.warning("Logged out successfully");
      setUser(null);
      setRedirect("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API_BASE}/profile`, formData, {
        withCredentials: true,
      });
      setUser(data);
      toast.success("Profile updated successfully!");
      setEditProfile(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("photos", file);

    try {
      const response = await axios.post(`${API_BASE}/upload`, uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      const uploadedPath = `/uploads/${response.data[0]}`;
      setFormData({ ...formData, profilePic: uploadedPath });
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image");
    }
  }

  if (!user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center mt-4 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold">Your Profile</h2>

          {editProfile ? (
            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  name="profilePic"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.profilePic && (
                  <label htmlFor="fileUpload">
                    <img
                      src={`${API_BASE}${formData.profilePic}`}
                      alt="Profile Preview"
                      title="Click to update profile"
                      className="w-24 h-24 mx-auto mt-2 cursor-pointer rounded-full object-cover"
                    />
                  </label>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-left">
                  Name
                </label>
                <div className="flex relative items-center gap-2">
                  <User className="absolute left-2 w-5 h-5 stroke-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1 pl-9"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-left">
                  Email
                </label>
                <div className="flex relative items-center gap-2">
                  <Mail className="absolute left-2 w-5 h-5 stroke-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1 pl-9 bg-gray-200 cursor-not-allowed"
                    disabled
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-left">
                  Password
                </label>
                <div className="flex relative items-center gap-2">
                  <Lock className="absolute left-2 w-5 h-5 stroke-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1 pl-9"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
              </div>

              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <img
                src={`${API_BASE}${formData.profilePic}`}
                alt="Profile"
                className="w-16 h-16 mx-auto my-2 rounded-full object-cover"
              />
              <p>
                Logged in as {user.name} ({user.email})
              </p>
              <button
                onClick={() => setEditProfile(true)}
                className="bg-primary text-white px-4 py-2 rounded mt-4 hover:bg-pink-600"
              >
                <div className="flex items-center gap-1">
                  <UserPen className="w-5 h-5" />
                  <span>Edit Profile</span>
                </div>
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-3 hover:bg-red-600"
              >
                <div className="flex items-center gap-1">
                  <LogOut className="inline-block w-5 h-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
