import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  
  // User and settings states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  
  // Settings categories
  const [activeTab, setActiveTab] = useState('account')
  
  // Individual settings states
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  })
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorBlindMode: false
  })
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showEnrolledCourses: true,
    showProfileToPublic: true
  })
  
  const [learningSettings, setLearningSettings] = useState({
    autoplayVideos: true,
    showSubtitles: true,
    downloadMaterials: true,
    languagePreference: 'english'
  })
  
  // Save button states
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSetSaveError] = useState(null)

  // Fetch user data and settings on component mount
  useEffect(() => {
    const fetchUserSettings = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('You must be logged in to view settings')
        setLoading(false)
        return
      }
      
      try {
        // Decode JWT to get user ID
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        setUserId(tokenData.id)
        
        // Ideally, you would fetch user settings here
        // For now, we'll use default values
        // Example API call would be:
        /*
        const response = await axios.get(`http://localhost:5500/api/users/${userId}/settings`, {
          headers: {
            'Authorization': token
          }
        })
        setAccountSettings(response.data.accountSettings)
        setAppearanceSettings(response.data.appearanceSettings)
        setPrivacySettings(response.data.privacySettings)
        setLearningSettings(response.data.learningSettings)
        */
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError('Failed to load settings. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchUserSettings()
  }, [])

  // Handle input changes for account settings
  const handleAccountSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setAccountSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle input changes for appearance settings
  const handleAppearanceSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle input changes for privacy settings
  const handlePrivacySettingsChange = (e) => {
    const { name, checked } = e.target
    setPrivacySettings(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  // Handle input changes for learning settings
  const handleLearningSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setLearningSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Save all settings
  const saveSettings = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setSetSaveError(null)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token || !userId) {
        throw new Error('Authentication required')
      }
      
      // Ideally, you would save settings to your API here
      // For now, we'll just simulate a successful save
      // Example API call would be:
      /*
      await axios.put(
        `http://localhost:5500/api/users/${userId}/settings`,
        {
          accountSettings,
          appearanceSettings,
          privacySettings,
          learningSettings
        },
        {
          headers: {
            'Authorization': token
          }
        }
      )
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSaveSuccess(true)
      setIsSaving(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Error saving settings:', err)
      setSetSaveError('Failed to save settings. Please try again.')
      setIsSaving(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your settings...</p>
        </div>
      </div>
    )
  }

  // Error state
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">Settings</h1>
            <p className="text-blue-100 mt-1">Customize your learning experience</p>
          </div>
          
          {/* Success Message */}
          {saveSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">Your settings have been saved successfully.</p>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {saveError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">{saveError}</p>
              </div>
            </div>
          )}
          
          <div className="md:flex">
            {/* Settings Navigation */}
            <div className="md:w-64 bg-gray-50 md:bg-white border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-3 py-3 rounded-md flex items-center ${
                    activeTab === 'account' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full text-left px-3 py-3 rounded-md flex items-center ${
                    activeTab === 'appearance' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Appearance
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full text-left px-3 py-3 rounded-md flex items-center ${
                    activeTab === 'privacy' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab('learning')}
                  className={`w-full text-left px-3 py-3 rounded-md flex items-center ${
                    activeTab === 'learning' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Learning
                </button>
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-grow p-6">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Email Notifications</h4>
                            <p className="text-sm text-gray-500">Receive updates, course announcements, and messages via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="emailNotifications"
                              checked={accountSettings.emailNotifications}
                              onChange={handleAccountSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">SMS Notifications</h4>
                            <p className="text-sm text-gray-500">Receive important notifications and reminders via SMS</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="smsNotifications"
                              checked={accountSettings.smsNotifications}
                              onChange={handleAccountSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Security</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="twoFactorAuth"
                              checked={accountSettings.twoFactorAuth}
                              onChange={handleAccountSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Linked Accounts</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700">Facebook</h4>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 font-medium">Connect</button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700">Twitter</h4>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 font-medium">Connect</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Theme Preferences</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Theme Mode</label>
                          <div className="flex items-center space-x-4">
                            <label className={`relative p-2 rounded-md ${appearanceSettings.theme === 'light' ? 'bg-white border-2 border-blue-500 shadow-sm' : 'bg-white border border-gray-200'}`}>
                              <input
                                type="radio"
                                name="theme"
                                value="light"
                                checked={appearanceSettings.theme === 'light'}
                                onChange={handleAppearanceSettingsChange}
                                className="sr-only"
                              />
                              <div className="flex flex-col items-center">
                                <div className="h-16 w-20 border rounded-md bg-white flex flex-col">
                                  <div className="h-3 bg-gray-100 w-full rounded-t-md"></div>
                                  <div className="flex-1 p-1">
                                    <div className="h-2 bg-gray-200 rounded-sm w-full mb-1"></div>
                                    <div className="h-2 bg-gray-200 rounded-sm w-2/3"></div>
                                  </div>
                                </div>
                                <span className="mt-1 text-sm">Light</span>
                              </div>
                            </label>
                            
                            <label className={`relative p-2 rounded-md ${appearanceSettings.theme === 'dark' ? 'bg-white border-2 border-blue-500 shadow-sm' : 'bg-white border border-gray-200'}`}>
                              <input
                                type="radio"
                                name="theme"
                                value="dark"
                                checked={appearanceSettings.theme === 'dark'}
                                onChange={handleAppearanceSettingsChange}
                                className="sr-only"
                              />
                              <div className="flex flex-col items-center">
                                <div className="h-16 w-20 border rounded-md bg-gray-800 flex flex-col">
                                  <div className="h-3 bg-gray-700 w-full rounded-t-md"></div>
                                  <div className="flex-1 p-1">
                                    <div className="h-2 bg-gray-600 rounded-sm w-full mb-1"></div>
                                    <div className="h-2 bg-gray-600 rounded-sm w-2/3"></div>
                                  </div>
                                </div>
                                <span className="mt-1 text-sm">Dark</span>
                              </div>
                            </label>
                            
                            <label className={`relative p-2 rounded-md ${appearanceSettings.theme === 'system' ? 'bg-white border-2 border-blue-500 shadow-sm' : 'bg-white border border-gray-200'}`}>
                              <input
                                type="radio"
                                name="theme"
                                value="system"
                                checked={appearanceSettings.theme === 'system'}
                                onChange={handleAppearanceSettingsChange}
                                className="sr-only"
                              />
                              <div className="flex flex-col items-center">
                                <div className="h-16 w-20 border rounded-md overflow-hidden">
                                  <div className="h-full w-1/2 bg-white float-left flex flex-col">
                                    <div className="h-3 bg-gray-100 w-full"></div>
                                    <div className="flex-1 p-1">
                                      <div className="h-1.5 bg-gray-200 rounded-sm w-full mb-1"></div>
                                      <div className="h-1.5 bg-gray-200 rounded-sm w-2/3"></div>
                                    </div>
                                  </div>
                                  <div className="h-full w-1/2 bg-gray-800 float-right flex flex-col">
                                    <div className="h-3 bg-gray-700 w-full"></div>
                                    <div className="flex-1 p-1">
                                      <div className="h-1.5 bg-gray-600 rounded-sm w-full mb-1"></div>
                                      <div className="h-1.5 bg-gray-600 rounded-sm w-2/3"></div>
                                    </div>
                                  </div>
                                </div>
                                <span className="mt-1 text-sm">System</span>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                          <select
                            name="fontSize"
                            value={appearanceSettings.fontSize}
                            onChange={handleAppearanceSettingsChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Accessibility</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Color Blind Mode</h4>
                            <p className="text-sm text-gray-500">Adjust colors for better visibility</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="colorBlindMode"
                              checked={appearanceSettings.colorBlindMode}
                              onChange={handleAppearanceSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Visibility</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Show Online Status</h4>
                            <p className="text-sm text-gray-500">Let others know when you're active on the platform</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="showOnlineStatus"
                              checked={privacySettings.showOnlineStatus}
                              onChange={handlePrivacySettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Show Enrolled Courses</h4>
                            <p className="text-sm text-gray-500">Display your enrolled courses on your public profile</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="showEnrolledCourses"
                              checked={privacySettings.showEnrolledCourses}
                              onChange={handlePrivacySettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Show Profile to Public</h4>
                            <p className="text-sm text-gray-500">Make your profile visible to non-registered users</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="showProfileToPublic"
                              checked={privacySettings.showProfileToPublic}
                              onChange={handlePrivacySettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Data Usage</h3>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          We collect data to improve your learning experience. You can manage how your data is used below.
                        </p>
                        
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          Manage Cookie Preferences
                        </button>
                        
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm block">
                          Download Your Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Learning Settings */}
              {activeTab === 'learning' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Video Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Autoplay Videos</h4>
                            <p className="text-sm text-gray-500">Automatically play the next video in a series</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="autoplayVideos"
                              checked={learningSettings.autoplayVideos}
                              onChange={handleLearningSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Show Subtitles</h4>
                            <p className="text-sm text-gray-500">Display subtitles on videos when available</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="showSubtitles"
                              checked={learningSettings.showSubtitles}
                              onChange={handleLearningSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Content Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700">Download Materials</h4>
                            <p className="text-sm text-gray-500">Automatically download course materials when available</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="downloadMaterials"
                              checked={learningSettings.downloadMaterials}
                              onChange={handleLearningSettingsChange}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Language Preference</label>
                          <select
                            name="languagePreference"
                            value={learningSettings.languagePreference}
                            onChange={handleLearningSettingsChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="chinese">Chinese</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}