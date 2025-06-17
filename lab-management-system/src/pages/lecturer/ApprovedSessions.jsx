/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUsers, FaFlask, FaSearch, FaFilePdf, FaFileExcel, FaFileDownload, FaPrint, FaEye } from "react-icons/fa";

// Sample approved sessions data
const initialSessions = [
  {
    id: 1,
    lab: "Physics Lab",
    course: "PHY301: Advanced Physics",
    date: "2025-06-22",
    time: "10:00 - 12:00",
    studentCount: 25,
    purpose: "Practical demonstration of wave properties",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench"],
    approvedBy: "Admin",
    approvedOn: "2025-06-16",
    notes: "Please arrive 15 minutes early to set up equipment."
  },
  {
    id: 3,
    lab: "Chemistry Lab",
    course: "CHM202: Organic Chemistry",
    date: "2025-06-28",
    time: "09:00 - 11:00",
    studentCount: 20,
    purpose: "Experiment on organic compounds",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge"],
    approvedBy: "Admin",
    approvedOn: "2025-06-15",
    notes: "Safety goggles and lab coats required for all students."
  },
  {
    id: 5,
    lab: "Physics Lab",
    course: "PHY301: Advanced Physics",
    date: "2025-07-10",
    time: "09:00 - 11:00",
    studentCount: 25,
    purpose: "Electromagnetism experiment",
    equipment: ["Oscilloscope", "Multimeter", "Power Supply"],
    approvedBy: "Admin",
    approvedOn: "2025-06-21",
    notes: null
  },
  {
    id: 6,
    lab: "Computer Lab A",
    course: "CS202: Database Systems",
    date: "2025-07-15",
    time: "13:00 - 15:00",
    studentCount: 30,
    purpose: "Database design workshop",
    equipment: ["Desktop Computers", "Database Software", "Projector"],
    approvedBy: "Admin",
    approvedOn: "2025-06-22",
    notes: "Please ensure all students have their database accounts set up beforehand."
  }
];

const ApprovedSessions = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(null);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  // Sort and filter sessions
  const filteredSessions = sessions
    .filter(session => {
      const searchLower = searchTerm.toLowerCase();
      return (
        session.lab.toLowerCase().includes(searchLower) ||
        session.course.toLowerCase().includes(searchLower) ||
        session.purpose.toLowerCase().includes(searchLower) ||
        session.date.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "lab":
          comparison = a.lab.localeCompare(b.lab);
          break;
        case "course":
          comparison = a.course.localeCompare(b.course);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle sort change
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  // Generate iCalendar file content
  const generateICalEvent = (session) => {
    const startDateTime = new Date(session.date + "T" + session.time.split(" - ")[0] + ":00");
    const endDateTime = new Date(session.date + "T" + session.time.split(" - ")[1] + ":00");
    
    const formatICalDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };
    
    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lab Reservation System//EN",
      "BEGIN:VEVENT",
      `UID:${session.id}@labreservation.campus.edu`,
      `DTSTAMP:${formatICalDate(new Date())}`,
      `DTSTART:${formatICalDate(startDateTime)}`,
      `DTEND:${formatICalDate(endDateTime)}`,
      `SUMMARY:${session.course} - ${session.lab}`,
      `DESCRIPTION:${session.purpose}${session.notes ? "\\n\\nNotes: " + session.notes : ""}`,
      `LOCATION:${session.lab}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    
    return icalContent;
  };

  // Download calendar event
  const downloadCalendarEvent = (session) => {
    const icalContent = generateICalEvent(session);
    const blob = new Blob([icalContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lab-session-${session.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Approved Lab Sessions</h1>
      <p className="mb-6 text-gray-700">View your upcoming approved lab sessions and download session details.</p>

      {/* Controls Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex gap-2">
            <button
              className="bg-[#042E6F] text-white px-3 py-2 rounded-lg hover:bg-[#021E47] transition flex items-center text-sm"
              onClick={() => window.print()}
              title="Print schedule"
            >
              <FaPrint className="mr-1" /> Print
            </button>
            <button
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex items-center text-sm"
              onClick={() => alert("Export to Excel")}
              title="Export to Excel"
            >
              <FaFileExcel className="mr-1" /> Excel
            </button>
            <button
              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition flex items-center text-sm"
              onClick={() => alert("Export to PDF")}
              title="Export to PDF"
            >
              <FaFilePdf className="mr-1" /> PDF
            </button>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#042E6F] text-center">
          <FaCalendarAlt className="text-[#042E6F] text-4xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Approved Sessions Found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms." : "You don't have any approved lab sessions yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Sort Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 hidden sm:grid sm:grid-cols-4 text-sm font-medium text-gray-600">
            <button 
              className="flex items-center text-left hover:text-[#042E6F]"
              onClick={() => handleSort("date")}
            >
              Date & Time {getSortIndicator("date")}
            </button>
            <button 
              className="flex items-center text-left hover:text-[#042E6F]"
              onClick={() => handleSort("lab")}
            >
              Lab {getSortIndicator("lab")}
            </button>
            <button 
              className="flex items-center text-left hover:text-[#042E6F]"
              onClick={() => handleSort("course")}
            >
              Course {getSortIndicator("course")}
            </button>
            <div className="text-right">Actions</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredSessions.map(session => (
              <div key={session.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <div className="sm:hidden font-semibold text-gray-500 mb-1">Date & Time:</div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#042E6F] mr-2" />
                      <div>
                        <div className="font-medium">{formatDate(session.date)}</div>
                        <div className="text-sm text-gray-600">{session.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="sm:hidden font-semibold text-gray-500 mb-1">Lab:</div>
                    <div className="flex items-center">
                      <FaFlask className="text-[#042E6F] mr-2" />
                      <div className="font-medium">{session.lab}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="sm:hidden font-semibold text-gray-500 mb-1">Course:</div>
                    <div className="flex items-center">
                      <FaUsers className="text-[#042E6F] mr-2" />
                      <div>
                        <div className="font-medium">{session.course}</div>
                        <div className="text-sm text-gray-600">{session.studentCount} students</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:justify-end items-center">
                    <button
                      onClick={() => setModal(session)}
                      className="bg-[#042E6F] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#021E47] transition flex items-center"
                    >
                      <FaEye className="mr-1" /> View
                    </button>
                    <button
                      onClick={() => downloadCalendarEvent(session)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition flex items-center"
                    >
                      <FaFileDownload className="mr-1" /> Calendar
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm">
                    <span className="font-medium">Purpose:</span> {session.purpose}
                  </div>
                  {session.notes && (
                    <div className="mt-2 text-sm bg-yellow-50 p-2 rounded-lg border-l-2 border-yellow-500">
                      <span className="font-medium text-yellow-700">Note:</span> {session.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Session Details</h3>
              <button
                onClick={() => setModal(null)}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#042E6F]">{modal.lab}</h2>
                  <p className="text-gray-600">{modal.course}</p>
                </div>
                <button
                  onClick={() => downloadCalendarEvent(modal)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition flex items-center"
                >
                  <FaFileDownload className="mr-2" /> Add to Calendar
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#042E6F] mb-3">Session Information</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <div className="w-1/3 text-gray-500">Date:</div>
                      <div className="w-2/3 font-medium">{formatDate(modal.date)}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 text-gray-500">Time:</div>
                      <div className="w-2/3 font-medium">{modal.time}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 text-gray-500">Students:</div>
                      <div className="w-2/3 font-medium">{modal.studentCount}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 text-gray-500">Approved By:</div>
                      <div className="w-2/3 font-medium">{modal.approvedBy}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 text-gray-500">Approved On:</div>
                      <div className="w-2/3 font-medium">{formatDate(modal.approvedOn)}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#042E6F] mb-3">Purpose</h3>
                  <p className="bg-gray-50 p-4 rounded-lg mb-4">{modal.purpose}</p>
                  
                  {modal.notes && (
                    <>
                      <h3 className="font-semibold text-[#042E6F] mb-2">Special Notes</h3>
                      <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-yellow-800">{modal.notes}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {modal.equipment.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-[#042E6F] mb-3">Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {modal.equipment.map((item, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaPrint className="mr-2" /> Print Details
                </button>
                <button
                  onClick={() => setModal(null)}
                  className="bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedSessions;
