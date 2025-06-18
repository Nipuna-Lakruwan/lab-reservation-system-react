/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCalendarAlt, FaClock, FaFlask, FaBook, FaUsers,
  FaCheckCircle, FaArrowLeft, FaArrowRight,
  FaMapMarkerAlt, FaInfoCircle, FaSearch
} from "react-icons/fa";

// Sample labs data
const labs = [
  {
    id: 1,
    name: "Physics Lab",
    location: "Science Building, Floor 2, Room 201",
    description: "Fully equipped physics laboratory with equipment for mechanics, electricity, magnetism, and optics experiments.",
    capacity: 30,
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench"],
    image: "https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-26", slots: ["09:00-11:00", "11:00-13:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["13:00-15:00", "15:00-17:00"] },
    ],
  },
  {
    id: 2,
    name: "Chemistry Lab",
    location: "Science Building, Floor 1, Room 105",
    description: "Modern chemistry laboratory with fume hoods and specialized equipment for organic and inorganic chemistry experiments.",
    capacity: 24,
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-11:00", "11:00-13:00"] },
      { date: "2025-06-26", slots: ["13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-11:00", "11:00-13:00", "13:00-15:00"] },
    ],
  },
  {
    id: 3,
    name: "Computer Lab A",
    location: "Technology Building, Floor 3, Room 302",
    description: "High-performance computing lab with the latest hardware and software for programming, networking, and multimedia development.",
    capacity: 40,
    equipment: ["Desktop Computers", "Projector", "Development Software"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    availableTimes: [
      { date: "2025-06-25", slots: ["11:00-13:00", "13:00-15:00"] },
      { date: "2025-06-26", slots: ["09:00-11:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-11:00", "11:00-13:00", "15:00-17:00"] },
    ],
  },
  {
    id: 4,
    name: "Biology Lab",
    location: "Science Building, Floor 3, Room 303",
    description: "Well-equipped biology laboratory with microscopes, slides, and specimens for detailed biological studies.",
    capacity: 28,
    equipment: ["Microscopes", "Slides", "Petri Dishes"],
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    availableTimes: [
      { date: "2025-06-25", slots: ["09:00-11:00", "13:00-15:00"] },
      { date: "2025-06-26", slots: ["11:00-13:00", "15:00-17:00"] },
      { date: "2025-06-27", slots: ["09:00-11:00", "11:00-13:00"] },
    ],
  }
];

// Sample courses data
const courses = [
  { id: 1, code: "PHY101", name: "Introduction to Physics" },
  { id: 2, code: "CHM202", name: "Organic Chemistry" },
  { id: 3, code: "CS101", name: "Introduction to Programming" },
  { id: 4, code: "BIO201", name: "Cell Biology" },
  { id: 5, code: "MAT301", name: "Calculus III" }
];

const BookLab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preselectedLabId = queryParams.get('lab') ? parseInt(queryParams.get('lab')) : null;

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
    groupSize: "",
    purpose: "",
    equipment: [],
    additionalInfo: ""
  });

  // Effect to handle preselected lab from URL param
  useEffect(() => {
    if (preselectedLabId) {
      const lab = labs.find(l => l.id === preselectedLabId);
      if (lab) {
        setSelectedLab(lab);
        setCurrentStep(2);
      }
    }
  }, [preselectedLabId]);

  // Effect to update available dates when a lab is selected
  useEffect(() => {
    if (selectedLab) {
      // Extract unique dates from the selected lab's available times
      const dates = selectedLab.availableTimes.map(item => item.date);
      setAvailableDates(dates);
      setSelectedDate("");
      setSelectedTime("");
      setAvailableTimeSlots([]);
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

  // Filter labs based on search query
  const filteredLabs = labs.filter(lab =>
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle lab selection
  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
    setCurrentStep(2);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Clear any previous errors
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: null }));
    }
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
    // Clear any previous errors
    if (errors.time) {
      setErrors(prev => ({ ...prev, time: null }));
    }
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

    if (!formData.groupSize) {
      newErrors.groupSize = "Please enter your group size";
    } else if (parseInt(formData.groupSize) <= 0) {
      newErrors.groupSize = "Group size must be greater than 0";
    } else if (selectedLab && parseInt(formData.groupSize) > selectedLab.capacity) {
      newErrors.groupSize = `Maximum capacity for this lab is ${selectedLab.capacity}`;
    }

    if (!formData.purpose || formData.purpose.trim().length < 10) {
      newErrors.purpose = "Please provide a purpose (at least 10 characters)";
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

    // Create the final booking data
    const bookingData = {
      lab: selectedLab.id,
      labName: selectedLab.name,
      date: selectedDate,
      time: selectedTime,
      ...formData
    };

    // Simulate API call to submit booking request
    setTimeout(() => {
      console.log("Submitting booking request:", bookingData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setSelectedLab(null);
        setSelectedDate("");
        setSelectedTime("");
        setFormData({
          course: "",
          groupSize: "",
          purpose: "",
          equipment: [],
          additionalInfo: ""
        });
        setCurrentStep(1);
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
      } else if (currentStep === 2) {
        setSelectedLab(null);
        setSelectedDate("");
        setAvailableDates([]);
      }
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render different steps based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderLabSelection();
      case 2:
        return renderTimeSelection();
      case 3:
        return renderBookingForm();
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
              className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleLabSelect(lab)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#042E6F] text-lg">{lab.name}</h3>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-1" /> {lab.location}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <FaUsers className="mr-1" /> Capacity: {lab.capacity} students
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{lab.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {lab.equipment.slice(0, 2).map((item, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#042E6F] px-2 py-1 rounded-full text-xs">
                      {item}
                    </span>
                  ))}
                  {lab.equipment.length > 2 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{lab.equipment.length - 2} more
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

        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-[#042E6F] mb-3">Select Date</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableDates.length > 0 ? (
              availableDates.map(date => (
                <button
                  key={date}
                  type="button"
                  className={`p-4 rounded-lg text-left hover:bg-blue-50 transition ${selectedDate === date
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
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
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
                    className={`p-3 rounded-lg flex items-center justify-center hover:bg-blue-50 transition ${selectedTime === timeSlot
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
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
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

          <button
            type="button"
            className={`bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition flex items-center ${!selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => selectedDate && selectedTime && setCurrentStep(3)}
            disabled={!selectedDate || !selectedTime}
          >
            Continue <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Booking Form
  const renderBookingForm = () => {
    if (!selectedLab || !selectedDate || !selectedTime) {
      return <div>Please complete the previous steps first.</div>;
    }

    return (
      <div>
        <h2 className="text-xl font-bold text-[#042E6F] mb-4">Step 3: Complete Booking Details</h2>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-[#042E6F]">
          <h3 className="font-bold text-[#042E6F] mb-2">Booking Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-start mb-2">
                <FaFlask className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Lab</div>
                  <div>{selectedLab.name}</div>
                </div>
              </div>

              <div className="flex items-start mb-2">
                <FaCalendarAlt className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Date</div>
                  <div>{formatDate(selectedDate)}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start mb-2">
                <FaClock className="text-[#042E6F] mt-1 mr-2" />
                <div>
                  <div className="font-semibold">Time</div>
                  <div>{selectedTime}</div>
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

        {/* Booking Form */}
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

              {/* Group Size */}
              <div className="mb-4">
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Group Size <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUsers className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="groupSize"
                    name="groupSize"
                    min="1"
                    max={selectedLab.capacity}
                    value={formData.groupSize}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.groupSize ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                    placeholder="Number of students"
                  />
                </div>
                {errors.groupSize ? (
                  <p className="text-red-500 text-xs mt-1">{errors.groupSize}</p>
                ) : (
                  <p className="text-gray-500 text-xs mt-1">Maximum capacity: {selectedLab.capacity} students</p>
                )}
              </div>

              {/* Purpose */}
              <div className="mb-4">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Booking <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  rows="3"
                  className={`block w-full px-3 py-2 border ${errors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                  placeholder="Explain the purpose of your lab session"
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
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${formData.equipment.includes(item)
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
                  Include any special requirements or notes
                </p>
              </div>

              {/* Lab Guidelines */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lab Guidelines
                </label>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li>Arrive on time for your session</li>
                    <li>Follow all lab safety protocols</li>
                    <li>Clean up your workspace after use</li>
                    <li>Report any equipment issues to staff</li>
                    <li>Cancel at least 24 hours in advance if needed</li>
                  </ul>
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
              className={`group relative flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white font-medium ${isSubmitting ? "bg-blue-400" : "bg-[#042E6F] hover:bg-[#021E47]"
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
                  Submit Booking
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Requested!</h2>
        <p className="text-gray-600 mb-6">
          Your lab booking request has been submitted successfully. You can check the status in your bookings page.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition"
            onClick={() => navigate('/student/my-bookings')}
          >
            View My Bookings
          </button>
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setSubmitSuccess(false)}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Book a Lab</h1>
      <p className="mb-6 text-gray-700">Follow the steps below to book a lab for your session.</p>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
            }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-[#042E6F]" : "bg-gray-200"
            }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
            }`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-[#042E6F]" : "bg-gray-200"
            }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? "bg-[#042E6F] text-white" : "bg-gray-200 text-gray-500"
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
              <span className="font-semibold">Important:</span> You can book labs up to 2 weeks in advance.
              Your booking will need approval from lab staff before it's confirmed.
              Please arrive on time for your session and follow all lab safety guidelines.
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

export default BookLab;