import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  
  // User data state
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: ''
  })
  
  // Preview image state
  const [imagePreview, setImagePreview] = useState(null)
  
  // Action states
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('You must be logged in to view this page')
        setLoading(false)
        return
      }
      
      try {
        // Decode JWT to get user ID
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        const userId = tokenData.id
        
        const response = await axios.get(`http://localhost:5500/api/users/${userId}`, {
          headers: {
            'Authorization': token
          }
        })
        
        // Based on your API, the response is in an array, get the first item
        setUserData(response.data[0])
        
        // Initialize form data with user data
        setFormData({
          name: response.data[0].name || '',
          email: response.data[0].email || '',
          age: response.data[0].age || '',
          newPassword: '',
          confirmPassword: '',
          profilePicture: response.data[0].profilePicture || ''
        })
        
        setImagePreview(response.data[0].profilePicture || '')
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load profile data. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Convert to base64 for preview and storing
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    setUpdateError(null)
    
    // Validate passwords if user is trying to change password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setUpdateError('Passwords do not match')
        setUpdateLoading(false)
        return
      }
      
      if (formData.newPassword.length < 6) {
        setUpdateError('Password must be at least 6 characters')
        setUpdateLoading(false)
        return
      }
    }
    
    try {
      const token = localStorage.getItem('token')
      
      // Prepare data for update
      const updateData = {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        profilePicture: formData.profilePicture
      }
      
      // Only include password if a new one was provided
      if (formData.newPassword) {
        updateData.password = formData.newPassword
      }
      
      const response = await axios.put(
        `http://localhost:5500/api/users/${userData._id}`,
        updateData,
        {
          headers: {
            'Authorization': token
          }
        }
      )
      
      // Update the user data state with the response
      setUserData(response.data)
      setUpdateSuccess(true)
      setIsEditing(false)
      setUpdateLoading(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Error updating profile:', err)
      setUpdateError(err.response?.data?.message || 'Failed to update profile. Please try again.')
      setUpdateLoading(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      await axios.delete(`http://localhost:5500/api/users/${userData._id}`, {
        headers: {
          'Authorization': token
        }
      })
      
      // Clear local storage and redirect to login
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      console.error('Error deleting account:', err)
      setDeleteLoading(false)
      setDeleteModalOpen(false)
      setUpdateError('Failed to delete account. Please try again later.')
    }
  }

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      age: userData.age || '',
      newPassword: '',
      confirmPassword: '',
      profilePicture: userData.profilePicture || ''
    })
    setImagePreview(userData.profilePicture || '')
    setIsEditing(false)
    setUpdateError(null)
  }

  // Conditional rendering for loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Conditional rendering for error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-lg text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">My Profile</h1>
          </div>
          
          {/* Success Message */}
          {updateSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mx-6 mt-6">
              <p>Profile updated successfully!</p>
            </div>
          )}
          
          {/* Error Message */}
          {updateError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-6 mt-6">
              <p>{updateError}</p>
            </div>
          )}
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Picture Section */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-4">
                      <img
                        src={imagePreview || "https://via.placeholder.com/128?text=No+Image"}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/128?text=No+Image"
                        }}
                      />
                      {isEditing && (
                        <label
                          htmlFor="profilePicture"
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <input
                            type="file"
                            id="profilePicture"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={!isEditing}
                          />
                        </label>
                      )}
                    </div>
                    
                    <h2 className="text-lg font-semibold">{userData.name}</h2>
                    <p className="text-gray-600">{userData.role || 'Student'}</p>
                    
                    {/* Edit Profile Button (when not editing) */}
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                      >
                        Edit Profile
                      </button>
                    )}
                    
                    {/* Delete Account Button (when not editing) */}
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setDeleteModalOpen(true)}
                        className="mt-2 w-full bg-white hover:bg-red-50 text-red-600 font-medium py-2 px-4 rounded border border-red-300"
                      >
                        Delete Account
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Form fields */}
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    
                    {/* Password fields (only shown when editing) */}
                    {isEditing && (
                      <>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}
                    
                    {/* Action buttons (only shown when editing) */}
                    {isEditing && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="submit"
                          disabled={updateLoading}
                          className={`flex-1 ${updateLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded flex items-center justify-center`}
                        >
                          {updateLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            
            {/* Account stats section */}
            {!isEditing && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium text-gray-900">Today</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-900">{userData.role || 'Student'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className={`flex-1 ${deleteLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} text-white font-medium py-2 px-4 rounded flex items-center justify-center`}
              >
                {deleteLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}