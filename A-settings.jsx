import React from "react";
import AdminPanel from "./A-panel";

const Settings = () => {
  return (
    <section className="w-full flex h-screen">
      <AdminPanel />
      <div className="w-[70%] p-20">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">Settings</h2>
        <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">
            Here you can manage admin preferences, update password, or configure dashboard options.
            </p>
        </div>
        </div>
    </section>
  );
};

export default Settings;
