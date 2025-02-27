import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Courses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        // Fetch Token from local storage:
        let token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/courses',{
                    headers: {
                        'Authorization': token
                    }
                })
                console.log(response.data)  // log the received data in the console.
                setCourses(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

  return (
    <div>
        <center>
            <h1>Courses</h1>
        {
            courses.map((course, index) => (
                <div key={index}>
                    <h2>{course.name}</h2>
                </div>
            ))
        }
        </center>
    </div>
  )
}
