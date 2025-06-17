/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import {
  FaSearch, FaPlus, FaPencilAlt, FaTrashAlt,
  FaFlask, FaUsers, FaTools, FaCheckCircle,
  FaTimesCircle, FaImages, FaImage, FaTimes
} from "react-icons/fa";

// Sample lab data
const initialLabs = [
  {
    id: 1,
    name: "Physics Lab",
    capacity: 30,
    location: "Building A, Room 101",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench", "Multimeter"],
    status: "Available",
    description: "Fully equipped physics laboratory for experiments in mechanics, optics, and electromagnetism.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Chemistry Lab",
    capacity: 24,
    location: "Building B, Room 202",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge", "Spectrometer"],
    status: "Available",
    description: "Laboratory for chemical experiments with safety equipment and analytical instruments.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Computer Lab A",
    capacity: 40,
    location: "Building C, Room 305",
    equipment: ["Desktop Computers", "Projector", "Networking Equipment", "3D Printer"],
    status: "Under Maintenance",
    description: "Computer laboratory equipped with latest hardware and software for programming and digital design.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    name: "Research Laboratory",
    capacity: 15,
    location: "Building D, Room 401",
    equipment: ["Electron Microscope", "DNA Sequencer", "Thermal Cycler", "Biosafety Cabinet"],
    status: "Available",
    description: "Advanced research laboratory for graduate-level research projects and faculty research.",
    image: "https://images.unsplash.com/photo-1582719471327-5d41312f1ca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const Labs = () => {
  const [labs, setLabs] = useState(initialLabs);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(null); // {type: 'add'|'edit'|'delete', lab: {...}}
  const [selectedLab, setSelectedLab] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
    equipment: [],
    status: "Available",
    description: "",
    image: ""
  });
  const [equipmentInput, setEquipmentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter labs by search term
  const filteredLabs = labs.filter(lab =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Open modal for adding a new lab
  const openAddModal = () => {
    setFormData({
      name: "",
      capacity: "",
      location: "",
      equipment: [],
      status: "Available",
      description: "",
      image: ""
    });
    setEquipmentInput("");
    setModal({ type: 'add' });
  };

  // Open modal for editing a lab
  const openEditModal = (lab) => {
    setSelectedLab(lab);
    setFormData({
      name: lab.name,
      capacity: lab.capacity,
      location: lab.location,
      equipment: [...lab.equipment],
      status: lab.status,
      description: lab.description,
      image: lab.image
    });
    setEquipmentInput("");
    setModal({ type: 'edit', lab });
  };

  // Open modal for deleting a lab
  const openDeleteModal = (lab) => {
    setSelectedLab(lab);
    setModal({ type: 'delete', lab });
  };

  // Close any open modal
  const closeModal = () => {
    setModal(null);
    setSelectedLab(null);
    setSubmitSuccess(false);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle equipment input
  const handleEquipmentInputChange = (e) => {
    setEquipmentInput(e.target.value);
  };

  // Add equipment item to the list
  const addEquipment = (e) => {
    e.preventDefault();
    if (equipmentInput.trim() !== "") {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipmentInput.trim()]
      }));
      setEquipmentInput("");
    }
  };

  // Remove equipment item from the list
  const removeEquipment = (index) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission for add/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (modal?.type === 'add') {
        // Add new lab
        const newLab = {
          ...formData,
          id: Math.max(...labs.map(lab => lab.id)) + 1,
          // Set default image if none provided
          image: formData.image || "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        };
        setLabs(prev => [...prev, newLab]);
      } else if (modal?.type === 'edit') {
        // Update existing lab
        setLabs(prev => prev.map(lab =>
          lab.id === selectedLab.id ? { ...formData, id: lab.id } : lab
        ));
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Close modal after showing success message
      setTimeout(() => {
        closeModal();
      }, 1500);
    }, 1000);
  };

  // Handle lab deletion
  const handleDeleteLab = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setLabs(prev => prev.filter(lab => lab.id !== selectedLab.id));
      setIsSubmitting(false);
      closeModal();
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-4">Lab Management</h1>
      <p className="mb-6 text-gray-600">
        Manage your institution's laboratories, equipment, and availability.
      </p>

      {/* Search and Add Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search labs by name or location..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042E6F] w-full md:w-80"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
        </div>
        <button
          className="bg-[#042E6F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#021E47] transition w-full md:w-auto justify-center"
          onClick={openAddModal}
        >
          <FaPlus /> Add New Lab
        </button>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredLabs.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <FaFlask className="mx-auto text-gray-300 text-5xl mb-3" />
            <h3 className="text-xl font-semibold text-gray-400">No labs found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or add a new lab</p>
          </div>
        ) : (
          filteredLabs.map(lab => (
            <div key={lab.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {lab.image ? (
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                    <FaImages className="text-4xl" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="bg-[#042E6F] text-white p-2 rounded-full hover:bg-[#021E47] transition shadow"
                    onClick={() => openEditModal(lab)}
                    title="Edit Lab"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow"
                    onClick={() => openDeleteModal(lab)}
                    title="Delete Lab"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold shadow ${lab.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {lab.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#042E6F] mb-2">{lab.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaUsers className="mr-2" /> Capacity: {lab.capacity} students
                </div>
                <div className="text-gray-600 mb-2">{lab.location}</div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 flex items-center mb-2">
                    <FaTools className="mr-2" /> Equipment
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lab.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Lab Modal */}
      {modal && (modal.type === 'add' || modal.type === 'edit') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {modal.type === 'add' ? 'Add New Lab' : 'Edit Lab'}
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                    Basic Information
                  </h4>

                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1 text-gray-700">Lab Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="location" className="block font-medium mb-1 text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="capacity" className="block font-medium mb-1 text-gray-700">Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      max="200"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="status" className="block font-medium mb-1 text-gray-700">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                    Additional Details
                  </h4>

                  <div className="mb-4">
                    <label htmlFor="image" className="block font-medium mb-1 text-gray-700">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                      placeholder="https://example.com/lab-image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Link to an image of the lab
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1 text-gray-700">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">Equipment</label>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        value={equipmentInput}
                        onChange={handleEquipmentInputChange}
                        className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                        placeholder="Add equipment item"
                      />
                      <button
                        type="button"
                        onClick={addEquipment}
                        className="bg-[#042E6F] text-white px-4 py-2 rounded-r hover:bg-[#021E47] transition"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 p-2 border border-gray-200 rounded min-h-[100px] bg-gray-50">
                      {formData.equipment.length === 0 ? (
                        <span className="text-gray-400 italic">No equipment added yet</span>
                      ) : (
                        formData.equipment.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          >
                            {item}
                            <button
                              type="button"
                              onClick={() => removeEquipment(index)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove item"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#042E6F] text-white rounded hover:bg-[#021E47] transition font-medium flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {modal.type === 'add' ? 'Adding...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      {modal.type === 'add' ? 'Add Lab' : 'Save Changes'}
                    </>
                  )}
                </button>
              </div>

              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheckCircle className="mr-2" />
                  {modal.type === 'add' ? 'Lab added successfully!' : 'Lab updated successfully!'}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modal && modal.type === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Delete Lab</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="mb-6">
                Are you sure you want to delete <strong>{selectedLab?.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLab}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrashAlt className="mr-1" /> Delete Lab
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Labs;
