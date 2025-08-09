import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const MentorGallery = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // Example: taking something from local storage
                const payload = localStorage.getItem("userData");
                const userData = JSON.parse(payload)
                console.log(userData);

                const res = await fetch("http://127.0.0.1:8000/api/searchMentor/", {
                    method: "POST", // assuming POST request
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData), // string from localStorage
                });

                const data = await res.json();
                console.log("Mentors fetched:", data);
                if (data.status === "success") {
                    setMentors(data.results);
                }
            } catch (error) {
                console.error("Error fetching mentors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading mentors...</div>;
    }

    return (
        <>
            <Navigation />
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Mentor Gallery</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={mentor.profilePhoto}
                                alt={mentor.fullName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{mentor.fullName}</h2>
                                <p className="text-sm text-gray-500">{mentor.jobRole}</p>
                                <p className="mt-2 text-gray-700 text-sm">{mentor.bio}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {mentor.mentorshipTopics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                    <span>Score: {mentor.score.toFixed(4)}</span>
                                    <a
                                        href={mentor.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MentorGallery;
