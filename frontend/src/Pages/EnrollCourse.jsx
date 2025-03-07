import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EnrollCourse() {
    let { cid } = useParams()
    const navigate = useNavigate()
    
    const [courseData, setCourseData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [enrolling, setEnrolling] = useState(false)
    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)

    useEffect(() => {
        // Fetch Token from local storage:
        let token = localStorage.getItem('token')
        if (!token) {
            setError("Authentication token not found. Please login first.")
            setLoading(false)
            return
        }
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/api/courses/${cid}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                console.log(response.data)  // log the received data in the console.
                setCourseData(response.data.data) // Access the data array from the response
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError("Failed to fetch course details. Please try again later.")
                setLoading(false)
            }
        }
        
        fetchData()
    }, [cid])

    const handleEnrollment = async () => {
        setEnrolling(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setError("Authentication token not found. Please login first.")
                setEnrolling(false)
                return
            }

            // Making the enrollment API call
            await axios.post(`http://localhost:5500/api/enrollments`, 
                { courseId: cid },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            )
            
            setEnrollmentSuccess(true)
            setEnrolling(false)
        } catch (error) {
            console.error(error)
            setError("Failed to enroll in this course. Please try again later.")
            setEnrolling(false)
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-700">Loading course details...</p>
            </div>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <p className="text-lg font-medium text-red-600">{error}</p>
                <button 
                    onClick={() => navigate('/courses')}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
                >
                    Back to Courses
                </button>
            </div>
        </div>
    )

    if (enrollmentSuccess) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
                <div className="text-green-500 text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Enrollment Successful!</h2>
                <p className="text-lg text-gray-600 mb-6">
                    You have successfully enrolled in {courseData?.name}. Happy learning!
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
                    >
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/courses')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded"
                    >
                        Browse More Courses
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="xl:flex-shrink-0">
                        <img 
                            className="h-48 w-full object-cover md:w-64 md:h-full" 
                            src={courseData?.poster || "https://via.placeholder.com/300x500?text=Course+Image"}
                            alt={courseData?.name || "Course"}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x500?text=Course+Image"
                            }}
                        />
                    </div>
                    <div className="p-8 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData?.name}</h1>
                                <div className="flex items-center mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium mr-2">
                                        {courseData?.category || "Course"}
                                    </span>
                                    <span className="text-gray-600 text-sm">{courseData?.duration} hours</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-3xl font-bold text-gray-900">
                                    ₹{courseData?.price?.toLocaleString() || "0"}
                                </div>
                                {courseData?.originalPrice && (
                                    <div className="text-sm text-gray-500 line-through">
                                        ₹{courseData.originalPrice.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">About this course</h2>
                            <p className="text-gray-600">{courseData?.description}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="font-medium text-gray-800">Instructor</h3>
                                <p className="text-gray-600">{courseData?.instructor || "Expert Instructor"}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="font-medium text-gray-800">Level</h3>
                                <p className="text-gray-600">{courseData?.level || "All Levels"}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <button
                                onClick={() => navigate('/courses')}
                                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded"
                            >
                                Back to Courses
                            </button>
                            <button
                                onClick={handleEnrollment}
                                disabled={enrolling}
                                className={`w-full sm:w-auto ${enrolling ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-8 rounded flex items-center justify-center`}
                            >
                                {enrolling ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : "Enroll Now"}
                            </button>
                        </div>
                    </div>
                </div>

                {courseData?.curriculum && (
                    <div className="border-t border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Curriculum</h2>
                        <div className="space-y-4">
                            {courseData.curriculum.map((section, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                                        <h3 className="font-medium text-gray-800">{section.title}</h3>
                                        <span className="text-sm text-gray-500">{section.lectures?.length || 0} lectures</span>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {section.lectures?.map((lecture, idx) => (
                                            <div key={idx} className="px-4 py-3 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-gray-400 mr-2">📝</span>
                                                    <span className="text-gray-700">{lecture.title}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">{lecture.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}