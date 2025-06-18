/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch, FaFilter, FaMapMarkerAlt, FaUsers,
  FaDesktop, FaFlask, FaMicroscope, FaVial,
  FaInfoCircle, FaCalendarAlt
} from "react-icons/fa";

// Sample labs data
const labsData = [
  {
    id: 1,
    name: "Physics Lab",
    location: "Science Building, Floor 2, Room 201",
    description: "Fully equipped physics laboratory with equipment for mechanics, electricity, magnetism, and optics experiments.",
    capacity: 30,
    features: ["Oscilloscope", "Wave Generator", "Optical Bench", "Force Sensors"],
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench", "Force Sensors", "Electrical Circuit Components"],
    availableSlots: 6,
    nextAvailable: "Today, 2:00 PM",
    image: "https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Science",
    availability: "High"
  },
  {
    id: 2,
    name: "Chemistry Lab",
    location: "Science Building, Floor 1, Room 105",
    description: "Modern chemistry laboratory with fume hoods and specialized equipment for organic and inorganic chemistry experiments.",
    capacity: 24,
    features: ["Fume Hood", "Analytical Balance", "Safety Equipment"],
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge", "Spectrometer", "pH Meters"],
    availableSlots: 3,
    nextAvailable: "Today, 4:00 PM",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Science",
    availability: "Medium"
  },
  {
    id: 3,
    name: "Computer Lab A",
    location: "Technology Building, Floor 3, Room 302",
    description: "High-performance computing lab with the latest hardware and software for programming, networking, and multimedia development.",
    capacity: 40,
    features: ["High-Speed Internet", "Dual Monitors", "Development Software"],
    equipment: ["Desktop Computers", "Projector", "Networking Equipment", "Development Software", "3D Printers"],
    availableSlots: 8,
    nextAvailable: "Today, 1:00 PM",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Computer",
    availability: "High"
  },
  {
    id: 4,
    name: "Computer Lab B",
    location: "Technology Building, Floor 3, Room 305",
    description: "Specialized lab for VR development, 3D modeling, and advanced computing applications.",
    capacity: 35,
    features: ["Adjustable Workstations", "Collaboration Areas", "VR Equipment"],
    equipment: ["Desktop Computers", "3D Printer", "VR Equipment", "Graphics Tablets", "Audio Equipment"],
    availableSlots: 0,
    nextAvailable: "Tomorrow, 9:00 AM",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Computer",
    availability: "Low"
  },
  {
    id: 5,
    name: "Biology Lab",
    location: "Science Building, Floor 3, Room 303",
    description: "Well-equipped biology laboratory with microscopes, slides, and specimens for detailed biological studies.",
    capacity: 28,
    features: ["High-Power Microscopes", "Specimen Collection", "Sterilization Equipment"],
    equipment: ["Microscopes", "Slides", "Petri Dishes", "Incubators", "Refrigerated Centrifuge"],
    availableSlots: 5,
    nextAvailable: "Today, 3:00 PM",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Science",
    availability: "Medium"
  },
  {
    id: 6,
    name: "Electronics Lab",
    location: "Engineering Building, Floor 2, Room 204",
    description: "Specialized lab for electronic circuit design, testing, and implementation.",
    capacity: 20,
    features: ["Circuit Design Tools", "Soldering Stations", "Test Equipment"],
    equipment: ["Oscilloscopes", "Function Generators", "Digital Multimeters", "PCB Fabrication Equipment", "Soldering Stations"],
    availableSlots: 2,
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1581093196277-9f6e3bdc5561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Engineering",
    availability: "Low"
  },
  {
    id: 7,
    name: "Research Laboratory",
    location: "Research Building, Floor 1, Room 105",
    description: "Advanced research facility with specialized equipment for in-depth scientific studies and experiments.",
    capacity: 15,
    features: ["Quiet Environment", "Research Stations", "Conference Area"],
    equipment: ["Electron Microscope", "DNA Sequencer", "Thermal Cycler", "Research Computers", "Data Analysis Tools"],
    availableSlots: 4,
    nextAvailable: "Today, 5:00 PM",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Research",
    availability: "Medium"
  },
  {
    id: 8,
    name: "Materials Testing Lab",
    location: "Engineering Building, Floor 1, Room 102",
    description: "Specialized facility for testing material properties, strength, and characteristics.",
    capacity: 18,
    features: ["Testing Equipment", "Material Samples", "Analysis Tools"],
    equipment: ["Tensile Testing Machines", "Hardness Testers", "Microscopes", "Material Sample Library"],
    availableSlots: 6,
    nextAvailable: "Today, 2:30 PM",
    image: "https://images.unsplash.com/photo-1581092921461-39b90f41273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Engineering",
    availability: "High"
  }
];

// Lab categories and availability options for filtering
const categories = ["All", "Science", "Computer", "Engineering", "Research"];
const availabilityOptions = ["All", "High", "Medium", "Low"];

const ViewLabs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  // Filter labs based on search term and selected filters
  const filteredLabs = labsData.filter(lab => {
    // Search term filter
    const searchMatch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const categoryMatch = selectedCategory === "All" || lab.category === selectedCategory;

    // Availability filter
    const availabilityMatch = selectedAvailability === "All" || lab.availability === selectedAvailability;

    return searchMatch && categoryMatch && availabilityMatch;
  });

  // Get availability color based on availability status
  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Open lab details modal
  const openLabDetails = (lab) => {
    setSelectedLab(lab);
  };

  // Close lab details modal
  const closeLabDetails = () => {
    setSelectedLab(null);
  };

  // Navigate to book lab page with selected lab ID
  const handleBookLab = (labId) => {
    navigate(`/student/book-lab?lab=${labId}`);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Browse Labs</h1>
      <p className="mb-6 text-gray-700">Explore and view all available laboratories for booking.</p>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by lab name, features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition"
          >
            <FaFilter />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Lab Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Labs Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-50 rounded-xl p-8 text-center">
            <FaInfoCircle className="mx-auto text-gray-400 text-4xl mb-2" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Labs Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          filteredLabs.map(lab => (
            <div
              key={lab.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
              onClick={() => openLabDetails(lab)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#042E6F] text-lg">{lab.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(lab.availability)}`}>
                    {lab.availableSlots > 0 ? `${lab.availableSlots} slots` : "No slots"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-1 text-gray-400" /> {lab.location}
                </div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{lab.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {lab.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                  {lab.features.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{lab.features.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-400" /> {lab.nextAvailable}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookLab(lab.id);
                    }}
                    className="bg-[#042E6F] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#021E47] transition"
                    disabled={lab.availableSlots === 0}
                  >
                    {lab.availableSlots > 0 ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lab Details Modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Lab Details</h3>
              <button
                onClick={closeLabDetails}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4 rounded-lg overflow-hidden h-48 sm:h-64">
                    <img
                      src={selectedLab.image}
                      alt={selectedLab.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[#042E6F] mb-2">{selectedLab.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" /> {selectedLab.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaUsers className="mr-2" /> Capacity: {selectedLab.capacity} students
                  </div>
                  <p className="text-gray-700 mb-4">{selectedLab.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-[#042E6F] mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLab.features.map((feature, idx) => (
                        <span key={idx} className="bg-blue-50 text-[#042E6F] px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-[#042E6F] mb-2">Availability</h3>
                    <div className="flex items-center mb-2">
                      <span className={`w-3 h-3 rounded-full ${selectedLab.availableSlots > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                      <span className="font-medium">
                        {selectedLab.availableSlots > 0
                          ? `Available (${selectedLab.availableSlots} slots)`
                          : "Currently Unavailable"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Next available: {selectedLab.nextAvailable}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-[#042E6F] mb-2">Equipment</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedLab.equipment.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-[#042E6F] mb-2">Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Book at least 24 hours in advance</li>
                      <li>Arrive on time for your scheduled slot</li>
                      <li>Clean up after your session</li>
                      <li>Report any equipment issues to lab staff</li>
                      <li>Follow all safety protocols while using the lab</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        closeLabDetails();
                        handleBookLab(selectedLab.id);
                      }}
                      disabled={selectedLab.availableSlots === 0}
                      className={`px-6 py-2 rounded-lg font-medium ${selectedLab.availableSlots > 0
                          ? "bg-[#042E6F] text-white hover:bg-[#021E47]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        } transition`}
                    >
                      {selectedLab.availableSlots > 0 ? "Book This Lab" : "Currently Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLabs;
