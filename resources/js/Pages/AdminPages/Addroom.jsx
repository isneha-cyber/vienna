import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

// ✅ FIXED: Use API endpoint instead of admin route
const API_BASE = `${window.location.origin}/api/myrooms`;

const Addroom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const [formData, setFormData] = useState({
    number: '', title: '', area: '', guests: '', bed_info: '',
    deck_info: '', description: '', price: '', category: '',
    amenities: [], sort_order: 0,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [amenityInput, setAmenityInput] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE); // Now using correct API endpoint
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      showToast('Failed to load rooms', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenityInput.trim()] }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== index) }));
  };

  const resetForm = () => {
    setFormData({ number: '', title: '', area: '', guests: '', bed_info: '', deck_info: '', description: '', price: '', category: '', amenities: [], sort_order: 0 });
    setImages([]); setImagePreviews([]); setExistingImages([]);
  };

  const openAddForm = () => { setEditingRoom(null); resetForm(); setShowForm(true); };

  const openEditForm = (room) => {
    setEditingRoom(room);
    setFormData({
      number: room.number || '', title: room.title || '', area: room.area || '',
      guests: room.guests || '', bed_info: room.bed_info || '', deck_info: room.deck_info || '',
      description: room.description || '', price: room.price || '', category: room.category || '',
      amenities: room.amenities || [], sort_order: room.sort_order || 0,
    });
    setImages([]); setImagePreviews([]);
    setExistingImages(room.images || []);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const submitData = new FormData();
    submitData.append('number', formData.number);
    submitData.append('title', formData.title);
    submitData.append('area', formData.area || '');
    submitData.append('guests', formData.guests || '');
    submitData.append('bed_info', formData.bed_info || '');
    submitData.append('deck_info', formData.deck_info || '');
    submitData.append('description', formData.description || '');
    submitData.append('price', formData.price || '');
    submitData.append('category', formData.category || '');
    submitData.append('sort_order', formData.sort_order.toString());

    formData.amenities.forEach((amenity, index) => {
      submitData.append(`amenities[${index}]`, amenity);
    });

    if (existingImages.length > 0) {
      submitData.append('existing_images', JSON.stringify(existingImages));
    }

    images.forEach((image, index) => {
      submitData.append(`images[${index}]`, image);
    });

    // ✅ FIX: Add _method field for PUT spoofing when editing
    if (editingRoom) {
      submitData.append('_method', 'PUT');
    }

    try {
      if (editingRoom) {
        // Using the API endpoint
        await axios.post(`${API_BASE}/${editingRoom.id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToast('Room updated successfully!');
      } else {
        // Using the API endpoint for create
        await axios.post(API_BASE, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToast('Room added successfully!');
      }
      setShowForm(false);
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      if (error.response?.data?.errors) {
        showToast(Object.values(error.response.data.errors).flat().join(', '), 'error');
      } else {
        showToast(error.response?.data?.message || 'Failed to save room', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (selectedRooms.length > 1) {
        // Using the API endpoint for multiple delete
        await axios.post(`${API_BASE}/delete-multiple`, { ids: selectedRooms });
        showToast(`${selectedRooms.length} rooms deleted successfully!`);
      } else {
        // Using the API endpoint for single delete
        await axios.delete(`${API_BASE}/${selectedRooms[0]}`);
        showToast('Room deleted successfully!');
      }
      setSelectedRooms([]);
      setShowDeleteConfirm(false);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting rooms:', error);
      showToast('Failed to delete rooms', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedRooms(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedRooms(selectedRooms.length === rooms.length ? [] : rooms.map(r => r.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast.msg && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] text-white text-sm px-5 py-2.5 rounded-full shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Room Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {loading ? 'Loading...' : `${rooms.length} room${rooms.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex gap-2">
            {selectedRooms.length > 0 && (
              <button onClick={() => setShowDeleteConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Delete Selected ({selectedRooms.length})
              </button>
            )}
            <button onClick={openAddForm} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="text-lg">+</span> Add Room
            </button>
          </div>
        </div>
        {rooms.length > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRooms.length === rooms.length && rooms.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </label>
            <span className="text-sm text-gray-400">{selectedRooms.length} selected</span>
          </div>
        )}
      </div>

      {/* Room List */}
      <div className="px-4 sm:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h-2M7 21h2m-2 0h-2m-2 0h-2" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No rooms yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Room" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {rooms.map(room => (
              <div key={room.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <input
                  type="checkbox"
                  checked={selectedRooms.includes(room.id)}
                  onChange={() => toggleSelect(room.id)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  {room.images?.[0] ? (
                    <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=Error'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">#{room.number}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{room.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {room.area && <span>{room.area}</span>}
                    {room.guests && <span>{room.guests}</span>}
                    {room.category && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{room.category}</span>}
                    {room.price && <span className="font-medium text-gray-900">{room.price}</span>}
                  </div>
                  {room.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{amenity}</span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">+{room.amenities.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditForm(room)} className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                  <button
                    onClick={() => { setSelectedRooms([room.id]); setShowDeleteConfirm(true); }}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={() => !saving && setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {[
                    { label: 'Room Number', name: 'number', required: true, placeholder: 'e.g. 01' },
                    { label: 'Title',       name: 'title',  required: true, placeholder: 'e.g. Grand Overwater Bungalow' },
                    { label: 'Area',        name: 'area',   placeholder: 'e.g. 39m²' },
                    { label: 'Guests',      name: 'guests', placeholder: 'e.g. Up to 3 guests' },
                    { label: 'Bed Info',    name: 'bed_info',  placeholder: 'e.g. 1 king-size bed & 1 sofa bed' },
                    { label: 'Deck Info',   name: 'deck_info', placeholder: 'e.g. Wooden deck with direct lagoon access' },
                    { label: 'Price',       name: 'price',    placeholder: 'e.g. From $450/night' },
                    { label: 'Category',    name: 'category', placeholder: 'e.g. overwater, swimup' },
                  ].map(({ label, name, required, placeholder }) => (
                    <div key={name}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text" name={name} value={formData[name]}
                        onChange={handleInputChange} required={required}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Images */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Images</label>
                    {existingImages.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Existing Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {existingImages.map((image, index) => (
                            <div key={index} className="relative w-20 h-20">
                              <img
                                src={typeof image === 'string' && image.startsWith('http') ? image : `${window.location.origin}/storage/${image}`}
                                alt="Room" className="w-full h-full object-cover rounded-lg"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=Error'; }}
                              />
                              <button type="button" onClick={() => removeExistingImage(index)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {imagePreviews.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">New Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative w-20 h-20">
                              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                              <button type="button" onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-600">Click to upload images</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — max 5MB each</p>
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Amenities</label>
                    {formData.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.amenities.map((amenity, index) => (
                          <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {amenity}
                            <button type="button" onClick={() => removeAmenity(index)} className="text-gray-500 hover:text-red-500">×</button>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text" value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="Add amenity..."
                      />
                      <button type="button" onClick={addAmenity} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Add</button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
                    <textarea
                      name="description" value={formData.description}
                      onChange={handleInputChange} rows="4"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                      placeholder="Room description..."
                    />
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Sort Order</label>
                    <input
                      type="number" name="sort_order" value={formData.sort_order}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
                <button type="button" onClick={() => setShowForm(false)} disabled={saving}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {saving ? 'Saving...' : (editingRoom ? 'Update Room' : 'Add Room')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setShowDeleteConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Delete {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''}?
            </h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} disabled={deleting}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addroom;