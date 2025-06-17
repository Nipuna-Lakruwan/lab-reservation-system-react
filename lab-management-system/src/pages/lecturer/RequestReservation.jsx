/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import { 
  FaCalendarAlt, FaClock, FaFlask, FaBook, FaUsers, FaInfoCircle, 
  FaCheckCircle, FaArrowLeft, FaArrowRight, FaClipboardCheck, 
  FaMapMarkerAlt, FaDesktop, FaTv, FaChair, FaSearch,
  FaChevronLeft, FaChevronRight, FaCalendarCheck
} from "react-icons/fa";

// Enhanced lab data with more details and images
const labs = [
  { 
    id: 1, 
    name: "Physics Lab", 
    capacity: 30, 
    available: true,
    location: "Science Building, Floor 2, Room 201",
    description: "Fully equipped physics laboratory with equipment for mechanics, electricity, magnetism, and optics experiments.",
    image: "https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench", "Force Sensors", "Electrical Circuit Components"], 
    features: ["Smart Board", "Individual Workstations", "Safety Equipment"],
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-26", slots: ["09:00-11:00", "11:00-13:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["13:00-15:00", "15:00-17:00"] },
    ],
    // New calendar availability data
    calendarAvailability: {
      "2025-06": {
        available: [1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 25, 26, 29, 30],
        booked: [4, 11, 18],
        unavailable: [6, 7, 13, 14, 20, 21, 27, 28] // Weekends or maintenance days
      },
      "2025-07": {
        available: [1, 2, 3, 6, 7, 8, 10, 13, 14, 15, 17, 20, 21, 22, 24, 27, 28, 29, 31],
        booked: [9, 16, 23, 30],
        unavailable: [4, 5, 11, 12, 18, 19, 25, 26] // Weekends or maintenance days
      }
    }
  },
  { 
    id: 2, 
    name: "Chemistry Lab", 
    capacity: 24, 
    available: true,
    location: "Science Building, Floor 1, Room 105",
    description: "Modern chemistry laboratory with fume hoods and specialized equipment for organic and inorganic chemistry experiments.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge", "Spectrometer", "pH Meters"], 
    features: ["Chemical Storage", "Emergency Shower", "Eye Wash Stations"],
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-11:00", "11:00-13:00"] },
      { date: "2025-06-26", slots: ["13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-11:00", "11:00-13:00", "13:00-15:00"] },
    ],
    // New calendar availability data
    calendarAvailability: {
      "2025-06": {
        available: [1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 25, 26, 29, 30],
        booked: [4, 11, 18],
        unavailable: [6, 7, 13, 14, 20, 21, 27, 28] // Weekends or maintenance days
      },
      "2025-07": {
        available: [1, 2, 3, 6, 7, 8, 10, 13, 14, 15, 17, 20, 21, 22, 24, 27, 28, 29, 31],
        booked: [9, 16, 23, 30],
        unavailable: [4, 5, 11, 12, 18, 19, 25, 26] // Weekends or maintenance days
      }
    }
  },
  { 
    id: 3, 
    name: "Computer Lab A", 
    capacity: 40, 
    available: true,
    location: "Technology Building, Floor 3, Room 302",
    description: "High-performance computing lab with the latest hardware and software for programming, networking, and multimedia development.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    equipment: ["Desktop Computers", "Projector", "Networking Equipment", "Development Software", "3D Printers"], 
    features: ["High-Speed Internet", "Dual Monitors", "Specialized Software"],
    availableTimes: [
      { date: "2025-06-25", slots: ["11:00-13:00", "13:00-15:00"] },
      { date: "2025-06-26", slots: ["09:00-11:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-11:00", "11:00-13:00", "15:00-17:00"] },
    ],
    // New calendar availability data
    calendarAvailability: {
      "2025-06": {
        available: [1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 25, 26, 29, 30],
        booked: [4, 11, 18],
        unavailable: [6, 7, 13, 14, 20, 21, 27, 28] // Weekends or maintenance days
      },
      "2025-07": {
        available: [1, 2, 3, 6, 7, 8, 10, 13, 14, 15, 17, 20, 21, 22, 24, 27, 28, 29, 31],
        booked: [9, 16, 23, 30],
        unavailable: [4, 5, 11, 12, 18, 19, 25, 26] // Weekends or maintenance days
      }
    }
  },
  { 
    id: 4, 
    name: "Computer Lab B", 
    capacity: 35, 
    available: false,
    location: "Technology Building, Floor 3, Room 305",
    description: "Specialized lab for VR development, 3D modeling, and advanced computing applications.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    equipment: ["Desktop Computers", "3D Printer", "VR Equipment", "Graphics Tablets", "Audio Equipment"], 
    features: ["Adjustable Workstations", "Collaboration Areas", "Development Tools"],
    availableTimes: [],
    // New calendar availability data
    calendarAvailability: {
      "2025-06": {
        available: [],
        booked: [],
        unavailable: Array.from({length: 30}, (_, i) => i + 1) // All days unavailable
      },
      "2025-07": {
        available: [],
        booked: [],
        unavailable: Array.from({length: 31}, (_, i) => i + 1) // All days unavailable
      }
    }
  },
  { 
    id: 5, 
    name: "Research Laboratory", 
    capacity: 15, 
    available: true,
    location: "Research Building, Floor 1, Room 105",
    description: "Advanced research facility with specialized equipment for in-depth scientific studies and experiments.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    equipment: ["Electron Microscope", "DNA Sequencer", "Thermal Cycler", "Research Computers", "Data Analysis Tools"], 
    features: ["Quiet Environment", "Research Stations", "Conference Area"],
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-13:00", "14:00-17:00"] },
      { date: "2025-06-26", slots: ["09:00-13:00", "14:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-13:00", "14:00-17:00"] },
    ],
    // New calendar availability data
    calendarAvailability: {
      "2025-06": {
        available: [1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 25, 26, 29, 30],
        booked: [4, 11, 18],
        unavailable: [6, 7, 13, 14, 20, 21, 27, 28] // Weekends or maintenance days
      },
      "2025-07": {
        available: [1, 2, 3, 6, 7, 8, 10, 13, 14, 15, 17, 20, 21, 22, 24, 27, 28, 29, 31],
        booked: [9, 16, 23, 30],
        unavailable: [4, 5, 11, 12, 18, 19, 25, 26] // Weekends or maintenance days
      }
    }
  }
];

// Sample course data
const courses = [
  { id: 1, code: "PHY301", name: "Advanced Physics" },
  { id: 2, code: "CHM202", name: "Organic Chemistry" },
  { id: 3, code: "CS101", name: "Introduction to Programming" },
  { id: 4, code: "CS404", name: "Advanced Software Engineering" },
  { id: 5, code: "BIO201", name: "Molecular Biology" }
];

// Time slots for selection
const timeSlots = [
  "09:00-11:00",
  "11:00-13:00",
  "13:00-15:00",
  "15:00-17:00"
];

const RequestReservation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    studentCount: "",
    purpose: "",
    equipment: [],
    additionalInfo: ""
  });
  
  // New state for calendar view
  const [currentMonth, setCurrentMonth] = useState("2025-06");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeForMultipleDays, setSelectedTimeForMultipleDays] = useState("");
  const [calendarView, setCalendarView] = useState(false);
  
  // Filter labs based on search query
  const filteredLabs = labs.filter(lab => 
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to update available dates when a lab is selected
  useEffect(() => {
    if (selectedLab) {
      // Extract unique dates from the selected lab's available times
      const dates = selectedLab.availableTimes.map(item => item.date);
      setAvailableDates(dates);
      setSelectedDate("");
      setSelectedTime("");
      setAvailableTimeSlots([]);
      setSelectedDates([]);
    }
  }, [selectedLab]);

  // Effect to update available time slots when a date is selected
  useEffect(() => {
    if (selectedLab && selectedDate) {
      const dateData = selectedLab.availableTimes.find(item => item.date === selectedDate);
      if (dateData) {
        setAvailableTimeSlots(dateData.slots);
      } else {
        setAvailableTimeSlots([]);
      }
      setSelectedTime("");
    }
  }, [selectedLab, selectedDate]);

  // Handle lab selection
  const handleLabSelect = (lab) => {
    if (!lab.available) return;
    setSelectedLab(lab);
    setCurrentStep(2);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Toggle equipment selection
  const toggleEquipment = (item) => {
    setFormData(prev => {
      const equipment = [...prev.equipment];
      if (equipment.includes(item)) {
        return {
          ...prev,
          equipment: equipment.filter(i => i !== item)
        };
      } else {
        return {
          ...prev,
          equipment: [...equipment, item]
        };
      }
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course) newErrors.course = "Please select a course";
    
    if (!formData.studentCount) {
      newErrors.studentCount = "Please enter expected student count";
    } else if (parseInt(formData.studentCount) <= 0) {
      newErrors.studentCount = "Student count must be greater than 0";
    } else if (selectedLab && parseInt(formData.studentCount) > selectedLab.capacity) {
      newErrors.studentCount = `Maximum capacity for this lab is ${selectedLab.capacity}`;
    }
    
    if (!formData.purpose || formData.purpose.trim().length < 10) {
      newErrors.purpose = "Please provide a purpose (at least 10 characters)";
    }
    
    // For calendar view, validate multiple dates
    if (calendarView && selectedDates.length === 0) {
      newErrors.dates = "Please select at least one date";
    }

    if (calendarView && !selectedTimeForMultipleDays) {
      newErrors.time = "Please select a time slot";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create the final reservation data
    const reservationData = calendarView 
      ? {
          lab: selectedLab.id,
          labName: selectedLab.name,
          dates: selectedDates,
          time: selectedTimeForMultipleDays,
          ...formData
        }
      : {
          lab: selectedLab.id,
          labName: selectedLab.name,
          date: selectedDate,
          time: selectedTime,
          ...formData
        };
    
    // Simulate API call to submit reservation request
    setTimeout(() => {
      console.log("Submitting reservation request:", reservationData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSelectedLab(null);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedDates([]);
        setSelectedTimeForMultipleDays("");
        setFormData({
          course: "",
          studentCount: "",
          purpose: "",
          equipment: [],
          additionalInfo: ""
        });
        setCurrentStep(1);
        setCalendarView(false);
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Reset selections based on the step
      if (currentStep === 3) {
        setSelectedTime("");
        setSelectedDates([]);
        setSelectedTimeForMultipleDays("");
      } else if (currentStep === 2) {
        setSelectedLab(null);
        setSelectedDate("");
        setAvailableDates([]);
        setCalendarView(false);
      }
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // New function to handle calendar date selection
  const handleCalendarDateSelect = (day) => {
    if (!selectedLab) return;
    
    const monthKey = currentMonth;
    const availability = selectedLab.calendarAvailability[monthKey];
    
    // Check if the day is available
    if (availability && availability.available.includes(day)) {
      setSelectedDates(prev => {
        const dateString = `${currentMonth}-${day.toString().padStart(2, '0')}`;
        
        if (prev.includes(dateString)) {
          return prev.filter(d => d !== dateString);
        } else {
          return [...prev, dateString];
        }
      });
    }
  };

  // New function to handle month navigation
  const navigateMonth = (direction) => {
    const [year, month] = currentMonth.split('-').map(Number);
    
    let newYear = year;
    let newMonth = month + direction;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    setCurrentMonth(`${newYear}-${newMonth.toString().padStart(2, '0')}`);
  };

  // New function to toggle between calendar and list view
  const toggleCalendarView = () => {
    setCalendarView(!calendarView);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDates([]);
    setSelectedTimeForMultipleDays("");
  };

  // New function to get day status color for calendar
  const getDayStatusColor = (day) => {
    if (!selectedLab || !currentMonth) return "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50";
    
    const monthKey = currentMonth;
    const availability = selectedLab.calendarAvailability[monthKey];
    
    if (!availability) return "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50";
    
    const dateString = `${currentMonth}-${day.toString().padStart(2, '0')}`;
    
    if (selectedDates.includes(dateString)) {
      return "bg-[#042E6F] text-white font-bold";
    } else if (availability.booked.includes(day)) {
      return "bg-red-100 text-red-800 cursor-not-allowed";
    } else if (availability.unavailable.includes(day)) {
      return "bg-gray-100 text-gray-400 cursor-not-allowed";
    } else if (availability.available.includes(day)) {
      return "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer";
    }
    
    return "bg-gray-100 text-gray-400 cursor-not-allowed";
  };

  // Generate calendar for selected month
  const generateCalendar = () => {
    if (!currentMonth) return [];
    
    const [year, month] = currentMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Create array for days in month plus empty slots for first week
    const calendar = [];
    
    // Add empty slots for first week
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }
    
    return calendar;
  };

  // Render different steps based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderLabSelection();
      case 2:
        return renderTimeSelection();
      case 3:
        return renderReservationForm();
      default:
        return renderLabSelection();
    }
  };

  // Step 1: Lab Selection
  const renderLabSelection = () => {
    return (
      <div>
        <h2 className="text-xl font-bold text-[#042E6F] mb-4">Step 1: Select a Lab</h2>
        
        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search labs by name or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042E6F] bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Lab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map(lab => (
            <div 
              key={lab.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-shadow ${
                lab.available ? "border-gray-200 cursor-pointer" : "border-red-200 opacity-75"
              }`}
              onClick={() => lab.available && handleLabSelect(lab)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={lab.image} 
                  alt={lab.name} 
                  className="w-full h-full object-cover"
                />
                {!lab.available && (
                  <div className="absolute inset-0 bg-red-800 bg-opacity-70 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Currently Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#042E6F] text-lg">{lab.name}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${lab.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {lab.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-1" /> {lab.location}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <FaUsers className="mr-1" /> Capacity: {lab.capacity} students
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{lab.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {lab.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#042E6F] px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                  {lab.features.length > 2 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{lab.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLabs.length === 0 && (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-2" />
            <p className="text-gray-500">No labs match your search criteria.</p>
          </div>
        )}
      </div>
    );
  };

  // Step 2: Time Selection
  const renderTimeSelection = () => {
    if (!selectedLab) {
      return <div>Please select a lab first.</div>;
    }

    return (
      <div>
        <h2 className="text-xl font-bold text-[#042E6F] mb-4">Step 2: Select Date and Time</h2>
        
        {/* Selected Lab Summary */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-[#042E6F] flex flex-col md:flex-row items-center">
          <img 
            src={selectedLab.image} 
            alt={selectedLab.name} 
            className="w-24 h-24 object-cover rounded-lg mr-4 mb-4 md:mb-0"
          />
          <div>
            <h3 className="font-bold text-[#042E6F] text-lg">{selectedLab.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1" /> {selectedLab.location}
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <FaUsers className="mr-1" /> Capacity: {selectedLab.capacity} students
            </div>
          </div>
        </div>
        
        {/* Booking View Toggle */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${
                !calendarView
                  ? "text-[#042E6F] border-b-2 border-[#042E6F]"
                  : "text-gray-500 hover:text-[#042E6F]"
              }`}
              onClick={() => toggleCalendarView()}
            >
              Single Day Booking
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                calendarView
                  ? "text-[#042E6F] border-b-2 border-[#042E6F]"
                  : "text-gray-500 hover:text-[#042E6F]"
              }`}
              onClick={() => toggleCalendarView()}
            >
              Calendar View (Multiple Days)
            </button>
          </div>
        </div>

        {calendarView ? (
          // Calendar View for Multiple Days Selection
          <div className="mb-6">
            <h3 className="font-semibold text-[#042E6F] mb-3">Select Multiple Days</h3>
            
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                className="flex items-center text-[#042E6F] hover:text-[#021E47]"
                onClick={() => navigateMonth(-1)}
              >
                <FaChevronLeft className="mr-1" /> Previous Month
              </button>
              
              <h4 className="text-lg font-medium">
                {new Date(currentMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              
              <button
                type="button"
                className="flex items-center text-[#042E6F] hover:text-[#021E47]"
                onClick={() => navigateMonth(1)}
              >
                Next Month <FaChevronRight className="ml-1" />
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-sm text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((day, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg 
                      ${day ? getDayStatusColor(day) : "bg-transparent"}
                    `}
                    onClick={() => day && handleCalendarDateSelect(day)}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected Dates Display */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
              <h4 className="font-medium text-[#042E6F] mb-2">Selected Dates ({selectedDates.length})</h4>
              {selectedDates.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedDates.sort().map(date => (
                    <div key={date} className="bg-white rounded-lg border border-blue-200 px-3 py-1 text-sm flex items-center">
                      {formatDate(date)}
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDates(prev => prev.filter(d => d !== date));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No dates selected. Click on available days (green) in the calendar.</p>
              )}
              {errors.dates && <p className="text-red-500 text-xs mt-1">{errors.dates}</p>}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#042E6F] rounded mr-2"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
                <span>Unavailable</span>
              </div>
            </div>
            
            {/* Time Slot Selection for Multiple Days */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#042E6F] mb-3">Select Time Slot</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map(timeSlot => (
                  <button
                    key={timeSlot}
                    type="button"
                    className={`p-3 rounded-lg flex items-center justify-center hover:bg-blue-50 transition ${
                      selectedTimeForMultipleDays === timeSlot 
                        ? "bg-blue-100 border-2 border-[#042E6F]" 
                        : "bg-white border border-gray-200"
                    }`}
                    onClick={() => setSelectedTimeForMultipleDays(timeSlot)}
                  >
                    <FaClock className={`mr-2 ${selectedTimeForMultipleDays === timeSlot ? "text-[#042E6F]" : "text-gray-500"}`} />
                    <span className={`font-medium ${selectedTimeForMultipleDays === timeSlot ? "text-[#042E6F]" : "text-gray-800"}`}>
                      {timeSlot}
                    </span>
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>
        ) : (
          // Original Single Day Selection View
          <>
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#042E6F] mb-3">Select Date</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableDates.length > 0 ? (
                  availableDates.map(date => (
                    <button
                      key={date}
                      type="button"
                      className={`p-4 rounded-lg text-left hover:bg-blue-50 transition ${
                        selectedDate === date 
                          ? "bg-blue-100 border-2 border-[#042E6F]" 
                          : "bg-white border border-gray-200"
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <div className="flex items-center">
                        <FaCalendarAlt className={`mr-2 ${selectedDate === date ? "text-[#042E6F]" : "text-gray-500"}`} />
                        <span className={`font-medium ${selectedDate === date ? "text-[#042E6F]" : "text-gray-800"}`}>
                          {formatDate(date)}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-yellow-800">No available dates for this lab currently.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Time Slots Selection */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="font-semibold text-[#042E6F] mb-3">Select Time Slot</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map(timeSlot => (
                      <button
                        key={timeSlot}
                        type="button"
                        className={`p-3 rounded-lg flex items-center justify-center hover:bg-blue-50 transition ${
                          selectedTime === timeSlot 
                            ? "bg-blue-100 border-2 border-[#042E6F]" 
                            : "bg-white border border-gray-200"
                        }`}
                        onClick={() => handleTimeSelect(timeSlot)}
                      >
                        <FaClock className={`mr-2 ${selectedTime === timeSlot ? "text-[#042E6F]" : "text-gray-500"}`} />
                        <span className={`font-medium ${selectedTime === timeSlot ? "text-[#042E6F]" : "text-gray-800"}`}>
                          {timeSlot}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-yellow-800">No available time slots for the selected date.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="flex items-center text-[#042E6F] px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={goToPreviousStep}
          >
            <FaArrowLeft className="mr-2" /> Back to Lab Selection
          </button>
          
          {calendarView ? (
            <button
              type="button"
              className={`bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition flex items-center ${
                selectedDates.length === 0 || !selectedTimeForMultipleDays ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (selectedDates.length > 0 && selectedTimeForMultipleDays) {
                  setCurrentStep(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={selectedDates.length === 0 || !selectedTimeForMultipleDays}
            >
              Continue <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              type="button"
              className={`bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition flex items-center ${
                !selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => selectedDate && selectedTime && setCurrentStep(3)}
              disabled={!selectedDate || !selectedTime}
            >
              Continue <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // Step 3: Reservation Form
  const renderReservationForm = () => {
    if (!selectedLab) {
      return <div>Please complete the previous steps first.</div>;
    }

    return (
      <div>
        <h2 className="text-xl font-bold text-[#042E6F] mb-4">Step 3: Complete Reservation Details</h2>
        
        {/* Reservation Summary */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-[#042E6F]">
          <h3 className="font-bold text-[#042E6F] mb-2">Reservation Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-start mb-2">
                <FaFlask className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Lab</div>
                  <div>{selectedLab.name}</div>
                </div>
              </div>
              
              {calendarView ? (
                <div className="flex items-start mb-2">
                  <FaCalendarAlt className="text-[#042E6F] mt-1 mr-2" />
                  <div>
                    <div className="font-semibold">Dates ({selectedDates.length})</div>
                    <div className="text-sm">
                      {selectedDates.length > 3 ? (
                        <>
                          {selectedDates.slice(0, 3).map(date => formatDate(date)).join(", ")}
                          <span className="text-blue-600 hover:underline cursor-pointer ml-1">
                            +{selectedDates.length - 3} more
                          </span>
                        </>
                      ) : (
                        selectedDates.map(date => formatDate(date)).join(", ")
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start mb-2">
                  <FaCalendarAlt className="text-[#042E6F] mt-1 mr-2" />
                  <div>
                    <div className="font-semibold">Date</div>
                    <div>{formatDate(selectedDate)}</div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-start mb-2">
                <FaClock className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Time</div>
                  <div>{calendarView ? selectedTimeForMultipleDays : selectedTime}</div>
                </div>
              </div>
              <div className="flex items-start mb-2">
                <FaUsers className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Capacity</div>
                  <div>{selectedLab.capacity} students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Course Selection */}
              <div className="mb-4">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBook className="text-gray-400" />
                  </div>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.course ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.code}: {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
              </div>
              
              {/* Student Count */}
              <div className="mb-4">
                <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Student Count <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUsers className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="studentCount"
                    name="studentCount"
                    min="1"
                    max={selectedLab.capacity}
                    value={formData.studentCount}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.studentCount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                    placeholder="Number of students"
                  />
                </div>
                {errors.studentCount ? (
                  <p className="text-red-500 text-xs mt-1">{errors.studentCount}</p>
                ) : (
                  <p className="text-gray-500 text-xs mt-1">Maximum capacity: {selectedLab.capacity} students</p>
                )}
              </div>
              
              {/* Purpose */}
              <div className="mb-4">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Reservation <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  rows="3"
                  className={`block w-full px-3 py-2 border ${errors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                  placeholder="Explain the purpose of this lab session"
                ></textarea>
                {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              {/* Equipment Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Needed
                </label>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Select equipment you'll need for this session:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.equipment.map(item => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleEquipment(item)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          formData.equipment.includes(item)
                            ? "bg-[#042E6F] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mb-4">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="3"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                  placeholder="Any additional requirements or notes (optional)"
                ></textarea>
                <p className="text-gray-500 text-xs mt-1">
                  Include any special requirements or notes for the lab coordinator.
                </p>
              </div>
              
              {/* Lab Features */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lab Features
                </label>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.features.map((feature, idx) => (
                      <span key={idx} className="bg-white text-[#042E6F] px-3 py-1 rounded-full text-xs border border-blue-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation and Submit Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="flex items-center text-[#042E6F] px-4 py-2 rounded-lg hover:bg-blue-50"
              onClick={goToPreviousStep}
            >
              <FaArrowLeft className="mr-2" /> Back to Time Selection
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white font-medium ${
                isSubmitting ? "bg-blue-400" : "bg-[#042E6F] hover:bg-[#021E47]"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#042E6F] transition duration-150`}
            >
              {isSubmitting ? (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Submitting...
                </>
              ) : (
                <>
                  <FaClipboardCheck className="mr-2" /> Submit Reservation Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Success message after form submission
  if (submitSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reservation Requested!</h2>
        <p className="text-gray-600 mb-6">
          Your lab reservation request has been submitted successfully. You'll receive a notification when it's reviewed.
        </p>
        <button
          className="px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition"
          onClick={() => setSubmitSuccess(false)}
        >
          Request Another Reservation
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Request Lab Reservation</h1>
      <p className="mb-6 text-gray-700">Follow the steps below to request a lab for your session.</p>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= 1 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep >= 2 ? "bg-[#042E6F]" : "bg-gray-200"
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= 2 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
          }`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep >= 3 ? "bg-[#042E6F]" : "bg-gray-200"
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= 3 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
          }`}>
            3
          </div>
        </div>
        <div className="flex text-xs mt-2">
          <div className="flex-1 text-center">Select Lab</div>
          <div className="flex-1 text-center">Choose Date & Time</div>
          <div className="flex-1 text-center">Complete Details</div>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border-l-4 border-[#042E6F] p-4 rounded mb-6">
        <div className="flex">
          <FaInfoCircle className="text-[#042E6F] mt-1 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Important:</span> Reservations should be made at least 48 hours in advance. 
              Your request will be reviewed by a lab coordinator and you'll receive a notification once it's approved or rejected.
              You can now book multiple days at once using the calendar view!
            </p>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#042E6F]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default RequestReservation;
