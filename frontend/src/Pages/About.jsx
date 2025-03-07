import React from 'react'

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">About Us</h1>
            <p className="text-blue-100 mt-1">Learn more about our learning platform</p>
          </div>
          
          <div className="p-6">
            {/* Mission Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We're dedicated to making quality education accessible to everyone. Our platform connects learners with expert instructors in a collaborative environment designed to foster growth and innovation.
              </p>
            </section>
            
            {/* History Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2023, we started with a simple idea: create a learning platform that adapts to how people actually learn. Since then, we've grown to serve thousands of students across various disciplines.
              </p>
            </section>
            
            {/* Team Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h3 className="font-medium text-gray-800">Jane Doe</h3>
                  <p className="text-gray-500 text-sm">Founder & CEO</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h3 className="font-medium text-gray-800">John Smith</h3>
                  <p className="text-gray-500 text-sm">Head of Content</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h3 className="font-medium text-gray-800">Emily Chen</h3>
                  <p className="text-gray-500 text-sm">Lead Developer</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}