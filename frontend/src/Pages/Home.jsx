import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Sample featured courses - in a real app, you would fetch these
  const featuredCourses = [
    {
      id: "1",
      name: "Mastering JavaScript",
      poster: "https://example.com/images/javascript-course-poster.jpg",
      price: 4999,
      shortDescription: "Master modern JavaScript from basics to advanced concepts"
    },
    {
      id: "2",
      name: "Full-Stack Web Development with MERN",
      poster: "https://example.com/images/mern-course-poster.jpg",
      price: 7999,
      shortDescription: "Build complete web applications with MongoDB, Express, React and Node.js"
    },
    {
      id: "3",
      name: "Python for Data Science",
      poster: "https://example.com/images/python-ds-course-poster.jpg",
      price: 5999,
      shortDescription: "Learn Python programming for data analysis and visualization"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Advance Your Career with Expert-Led Online Courses</h1>
            <p className="text-xl md:text-2xl mb-8">Gain the skills employers are looking for with our industry-focused programming and development courses.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="bg-white text-blue-800 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-center">
                Explore Courses
              </Link>
              <Link to="/signup" className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-center">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">Professional Courses</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Satisfied Students</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img 
                src={course.poster} 
                alt={course.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=Course+Image";
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl text-blue-600">₹{course.price.toLocaleString()}</span>
                  <Link to={`/course/${course.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg inline-block">
            View All Courses
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">Build real-world applications to strengthen your portfolio</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Lifetime Access</h3>
              <p className="text-gray-600">Access course content and updates for life</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Certification</h3>
              <p className="text-gray-600">Earn certificates to showcase your skills to employers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                SK
              </div>
              <div className="ml-4">
                <div className="font-semibold">Sandeep Kumar</div>
                <div className="text-sm text-gray-500">JavaScript Developer</div>
              </div>
            </div>
            <p className="text-gray-600 italic">"The JavaScript course completely transformed my career. I went from knowing basic HTML to building complex web applications in just 3 months!"</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                PR
              </div>
              <div className="ml-4">
                <div className="font-semibold">Priya Reddy</div>
                <div className="text-sm text-gray-500">Full Stack Developer</div>
              </div>
            </div>
            <p className="text-gray-600 italic">"The MERN stack course was comprehensive and practical. I landed my dream job right after completing the course!"</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                AK
              </div>
              <div className="ml-4">
                <div className="font-semibold">Ankit Kumar</div>
                <div className="text-sm text-gray-500">Data Scientist</div>
              </div>
            </div>
            <p className="text-gray-600 italic">"The Python for Data Science course provided me with the skills I needed to transition from finance to tech. The projects were challenging but rewarding."</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students who have advanced their careers with our courses.</p>
          <Link to="/signup" className="bg-white text-blue-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-block">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}