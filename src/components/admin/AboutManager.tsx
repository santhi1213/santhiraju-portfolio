import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, User, Briefcase, Award, Clock } from 'lucide-react';

const AboutManager = () => {
  const { aboutInfo, updateAboutInfo } = useData();
  const [formData, setFormData] = useState(aboutInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateAboutInfo(formData);
    setIsSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">About Information</h1>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Update About Section</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Professional Title
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="e.g., MERN Stack Developer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">
              Bio / Description
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
              placeholder="Write a brief description about yourself, your expertise, and what you're passionate about..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Experience
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="e.g., 5+ Years Experience"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Projects Completed
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="projectsCompleted"
                  value={formData.projectsCompleted}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="e.g., 50+ Projects Completed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Availability Status
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                placeholder="e.g., Available for new projects"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Preview</h2>
        
        <div className="space-y-6">
          {/* Hero Preview */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Hero Section Preview</h3>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Hi, I'm <span className="text-blue-400">{formData.name}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-4">{formData.title}</p>
              <p className="text-gray-400 max-w-2xl mx-auto">{formData.bio}</p>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Stats Section Preview</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-500/10 p-3 rounded-lg inline-block mb-2">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-blue-400 font-semibold">{formData.experience}</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/10 p-3 rounded-lg inline-block mb-2">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-green-400 font-semibold">{formData.projectsCompleted}</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/10 p-3 rounded-lg inline-block mb-2">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-purple-400 font-semibold">{formData.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManager;