import React, { useState, useEffect } from 'react';
import { careersAPI, unwrapResponseList } from '../../api';

const CareerAdmin = () => {
  const [careers, setCareers] = useState([]);
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await careersAPI.getAll();
      setCareers(unwrapResponseList(response));
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await careersAPI.update(editingId, formData);
      } else {
        await careersAPI.create(formData);
      }
      resetForm();
      fetchCareers();
    } catch (error) {
      console.error('Error saving career:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (career) => {
    setFormData({
      position: career.position,
      department: career.department || '',
      description: career.description,
      requirements: career.requirements.join(', '),
      location: career.location || '',
      salary: career.salary || '',
      isActive: career.isActive
    });
    setEditingId(career._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this career posting?')) {
      try {
        await careersAPI.delete(id);
        fetchCareers();
      } catch (error) {
        console.error('Error deleting career:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      position: '',
      department: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
      isActive: true
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24"> {/* ⭐ Added margin-top here */}
      <h1 className="text-3xl font-bold mb-8">Career Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Career Posting' : 'Add New Career Posting'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements (comma-separated)</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Requirement 1, Requirement 2, Requirement 3"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Careers List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Career Postings</h2>
          <div className="space-y-4">
            {careers.map((career) => (
              <div key={career._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{career.position}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      {career.department && (
                        <span className="text-sm text-gray-600">{career.department}</span>
                      )}
                      {career.location && (
                        <span className="text-sm text-gray-600">📍 {career.location}</span>
                      )}
                      {career.salary && (
                        <span className="text-sm text-gray-600">💰 {career.salary}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${career.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {career.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <p className="mt-2 text-gray-700">{career.description}</p>
                
                {career.requirements && career.requirements.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {career.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(career)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(career._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAdmin;
