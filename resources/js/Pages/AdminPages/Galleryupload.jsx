// import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'


// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.withCredentials = true

// // Get CSRF token from the meta tag Laravel puts in the HTML head
// const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
// if (csrfToken) axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

// const BASE_URL = window.location.origin  // e.g. http://localhost:8000

// const Galleryupload = () => {

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [images,    setImages]    = useState([])
//   const [loading,   setLoading]   = useState(true)
//   const [showForm,  setShowForm]  = useState(false)
//   const [editItem,  setEditItem]  = useState(null)
//   const [deleteId,  setDeleteId]  = useState(null)
//   const [saving,    setSaving]    = useState(false)
//   const [deleting,  setDeleting]  = useState(false)
//   const [toast,     setToast]     = useState({ msg: '', type: '' })

//   const [title,     setTitle]     = useState('')
//   const [category,  setCategory]  = useState('')
//   const [altText,   setAltText]   = useState('')
//   const [imageFile, setImageFile] = useState(null)
//   const [preview,   setPreview]   = useState('')

//   const fileRef = useRef(null)

//   // ── Toast ──────────────────────────────────────────────────────────────────
//   const showToast = (msg, type = 'success') => {
//     setToast({ msg, type })
//     setTimeout(() => setToast({ msg: '', type: '' }), 3000)
//   }

//   // ── Fetch all images from /mygallery ──────────────────────────────────────
//   const fetchImages = async () => {
//     setLoading(true)
//     try {
//       const res = await axios.get(`${BASE_URL}/mygallery`, {
//         headers: { Accept: 'application/json' }
//       })
//       setImages(res.data.data || [])
//     } catch (err) {
//       console.error('Fetch error:', err)
//       showToast('Failed to load images', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { fetchImages() }, [])

//   // ── Open Add form ──────────────────────────────────────────────────────────
//   const openAdd = () => {
//     setEditItem(null)
//     setTitle('')
//     setCategory('')
//     setAltText('')
//     setImageFile(null)
//     setPreview('')
//     setShowForm(true)
//   }

//   // ── Open Edit form ─────────────────────────────────────────────────────────
//   const openEdit = (img) => {
//     setEditItem(img)
//     setTitle(img.title || '')
//     setCategory(img.category || '')
//     setAltText(img.alt_text || '')
//     setImageFile(null)
//     setPreview(img.image_url || '')
//     setShowForm(true)
//   }

//   // ── File select ────────────────────────────────────────────────────────────
//   const handleFile = (e) => {
//     const f = e.target.files[0]
//     if (!f) return
//     setImageFile(f)
//     setPreview(URL.createObjectURL(f))
//   }

//   // ── Submit: POST /mygallery (add) or POST /mygallery/{id} (edit) ───────────
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!editItem && !imageFile) {
//       showToast('Please select an image', 'error')
//       return
//     }

//     setSaving(true)

//     // Build FormData
//     const fd = new FormData()
//     fd.append('title',    title)
//     fd.append('category', category)
//     fd.append('alt_text', altText)
//     if (imageFile) fd.append('image', imageFile)

//     try {
//       if (editItem) {
//         // Laravel doesn't support PUT with files → use POST + _method spoofing
//         fd.append('_method', 'PUT')
//         await axios.post(`${BASE_URL}/mygallery/${editItem.id}`, fd, {
//           headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
//         })
//         showToast('Image updated successfully!')
//       } else {
//         await axios.post(`${BASE_URL}/mygallery`, fd, {
//           headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
//         })
//         showToast('Image uploaded successfully!')
//       }
//       setShowForm(false)
//       fetchImages()
//     } catch (err) {
//       console.error('Submit error:', err)
//       const msg = err.response?.data?.message || 'Something went wrong'
//       showToast(msg, 'error')
//     } finally {
//       setSaving(false)
//     }
//   }

//   // ── Delete: DELETE /mygallery/{id} ─────────────────────────────────────────
//   const handleDelete = async () => {
//     setDeleting(true)
//     try {
//       await axios.delete(`${BASE_URL}/mygallery/${deleteId}`, {
//         headers: { Accept: 'application/json' }
//       })
//       showToast('Image deleted')
//       setDeleteId(null)
//       fetchImages()
//     } catch (err) {
//       console.error('Delete error:', err)
//       showToast('Delete failed', 'error')
//     } finally {
//       setDeleting(false)
//     }
//   }

//   // ── UI ─────────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Toast notification ── */}
//       {/* {toast.msg && (
//         <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] text-white text-sm px-5 py-2.5 rounded-full shadow-lg transition-all
//           ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'}`}>
//           {toast.msg}
//         </div>
//       )} */}

//       {/* ── Page Header ── */}
//       <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Gallery Manager</h1>
//           <p className="text-xs text-gray-400 mt-0.5">
//             {loading ? 'Loading...' : `${images.length} image${images.length !== 1 ? 's' : ''}`}
//           </p>
//         </div>
//         <button
//           onClick={openAdd}
//           className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           <span className="text-lg leading-none">+</span>
//           Add Image
//         </button>
//       </div>

//       {/* ── Content area ── */}
//       <div className="px-4 sm:px-8 py-8">

//         {/* Loading spinner */}
//         {loading && (
//           <div className="flex justify-center items-center py-32">
//             <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && images.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-32 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                   d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <p className="text-gray-600 font-medium">No images yet</p>
//             <p className="text-gray-400 text-sm mt-1">Click "Add Image" to get started</p>
//           </div>
//         )}

//         {/* Image grid */}
//         {!loading && images.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {images.map(img => (
//               <div key={img.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group">

//                 {/* Thumbnail */}
//                 <div className="relative overflow-hidden aspect-square">
//                   <img
//                     src={img.image_url}
//                     alt={img.alt_text || img.title || 'Gallery image'}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     loading="lazy"
//                   />
//                   {img.category && (
//                     <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
//                       {img.category}
//                     </span>
//                   )}
//                 </div>

//                 {/* Card footer */}
//                 <div className="p-3">
//                   <p className="text-sm font-medium text-gray-800 truncate">
//                     {img.title || <span className="text-gray-400 italic text-xs">Untitled</span>}
//                   </p>
//                   <div className="flex gap-2 mt-2">
//                     <button
//                       onClick={() => openEdit(img)}
//                       className="flex-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => setDeleteId(img.id)}
//                       className="flex-1 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 py-1.5 rounded-lg transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── Add / Edit Modal ── */}
//       {showForm && (
//         <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setShowForm(false)} />

//           <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//             {/* Modal header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
//               <h2 className="text-base font-bold text-gray-900">
//                 {editItem ? 'Edit Image' : 'Upload New Image'}
//               </h2>
//               <button
//                 onClick={() => !saving && setShowForm(false)}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Modal form */}
//             <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

//               {/* Upload area */}
//               <div
//                 onClick={() => fileRef.current?.click()}
//                 className="cursor-pointer border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors"
//               >
//                 {preview ? (
//                   <div className="relative group/preview">
//                     <img src={preview} alt="Preview" className="w-full h-44 object-cover" />
//                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
//                       <span className="text-white text-sm bg-black/50 px-3 py-1.5 rounded-lg">
//                         Change Photo
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-10 text-gray-400">
//                     <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                         d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//                     </svg>
//                     <p className="text-sm font-medium text-gray-500">Click to upload photo</p>
//                     <p className="text-xs mt-1 text-gray-400">JPG, PNG, WEBP — max 5MB</p>
//                   </div>
//                 )}
//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleFile}
//                 />
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={e => setTitle(e.target.value)}
//                   placeholder="e.g. Sunset Portrait"
//                   className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={e => setCategory(e.target.value)}
//                   placeholder="e.g. Wedding, Portrait, Nature"
//                   className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
//                 />
//               </div>

//               {/* Alt Text */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                   Alt Text <span className="font-normal normal-case text-gray-400">(SEO)</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={altText}
//                   onChange={e => setAltText(e.target.value)}
//                   placeholder="Describe the image briefly"
//                   className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
//                 />
//               </div>

//               {/* Action buttons */}
//               <div className="flex gap-3 pt-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   disabled={saving}
//                   className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex-1 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {saving && (
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   )}
//                   {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Upload'}
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── Delete confirmation modal ── */}
//       {deleteId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setDeleteId(null)} />
//           <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">

//             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
//               </svg>
//             </div>

//             <h3 className="text-base font-bold text-gray-900 mb-1">Delete this image?</h3>
//             <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteId(null)}
//                 disabled={deleting}
//                 className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {deleting && (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 )}
//                 {deleting ? 'Deleting...' : 'Yes, Delete'}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default Galleryupload

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Get CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const BASE_URL = window.location.origin;

const Galleryupload = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingImages, setEditingImages] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });

  // Upload form state
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadPreviews, setUploadPreviews] = useState([]);
  const [uploadTitles, setUploadTitles] = useState([]);
  const [uploadCategories, setUploadCategories] = useState([]);
  const [uploadAltTexts, setUploadAltTexts] = useState([]);

  const fileInputRef = useRef(null);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  // ── Fetch all images ──────────────────────────────────────────────────────
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/mygallery`, {
        headers: { Accept: 'application/json' }
      });
      setImages(res.data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      showToast('Failed to load images', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  // ── Handle file selection for upload ──────────────────────────────────────
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setUploadFiles(prev => [...prev, ...files]);
    setUploadPreviews(prev => [...prev, ...newPreviews]);
    setUploadTitles(prev => [...prev, ...Array(files.length).fill('')]);
    setUploadCategories(prev => [...prev, ...Array(files.length).fill('')]);
    setUploadAltTexts(prev => [...prev, ...Array(files.length).fill('')]);
  };

  // ── Remove image from upload list ─────────────────────────────────────────
  const removeUploadImage = (index) => {
    URL.revokeObjectURL(uploadPreviews[index]);
    
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
    setUploadPreviews(prev => prev.filter((_, i) => i !== index));
    setUploadTitles(prev => prev.filter((_, i) => i !== index));
    setUploadCategories(prev => prev.filter((_, i) => i !== index));
    setUploadAltTexts(prev => prev.filter((_, i) => i !== index));
  };

  // ── Clear upload form ─────────────────────────────────────────────────────
  const clearUploadForm = () => {
    uploadPreviews.forEach(preview => URL.revokeObjectURL(preview));
    setUploadFiles([]);
    setUploadPreviews([]);
    setUploadTitles([]);
    setUploadCategories([]);
    setUploadAltTexts([]);
    setShowUploadModal(false);
  };

  // ── Handle multiple image upload ──────────────────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault();

    if (uploadFiles.length === 0) {
      showToast('Please select at least one image', 'error');
      return;
    }

    setSaving(true);

    const formData = new FormData();
    
    uploadFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
      formData.append(`titles[${index}]`, uploadTitles[index] || '');
      formData.append(`categories[${index}]`, uploadCategories[index] || '');
      formData.append(`alt_texts[${index}]`, uploadAltTexts[index] || '');
    });

    try {
      await axios.post(`${BASE_URL}/mygallery`, formData, {
        headers: { 
          Accept: 'application/json', 
          'Content-Type': 'multipart/form-data'
        }
      });
      
      showToast(`${uploadFiles.length} images uploaded successfully!`);
      clearUploadForm();
      fetchImages();
    } catch (err) {
      console.error('Upload error:', err);
      const msg = err.response?.data?.message || 'Upload failed';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Open edit modal for selected images ───────────────────────────────────
  const openEditModal = () => {
    if (selectedImages.length === 0) {
      showToast('Please select images to edit', 'error');
      return;
    }

    const selectedData = images
      .filter(img => selectedImages.includes(img.id))
      .map(img => ({
        id: img.id,
        title: img.title || '',
        category: img.category || '',
        alt_text: img.alt_text || '',
        image_url: img.image_url,
        original: img
      }));

    setEditingImages(selectedData);
    setShowEditModal(true);
  };

  // ── Update editing image field ────────────────────────────────────────────
  const updateEditingImage = (index, field, value) => {
    setEditingImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ));
  };

  // ── Save multiple edits ───────────────────────────────────────────────────
  const handleSaveEdits = async () => {
    setSaving(true);

    try {
      const imagesData = editingImages.map(img => ({
        id: img.id,
        title: img.title,
        category: img.category,
        alt_text: img.alt_text
      }));

      await axios.post(`${BASE_URL}/mygallery/update-multiple`, {
        images_data: imagesData
      }, {
        headers: { Accept: 'application/json' }
      });

      showToast(`${editingImages.length} images updated successfully!`);
      setShowEditModal(false);
      setSelectedImages([]);
      fetchImages();
    } catch (err) {
      console.error('Update error:', err);
      const msg = err.response?.data?.message || 'Update failed';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Handle delete confirmation ────────────────────────────────────────────
  const confirmDelete = () => {
    if (selectedImages.length === 0) {
      showToast('Please select images to delete', 'error');
      return;
    }
    setDeleteIds(selectedImages);
    setShowDeleteConfirm(true);
  };

  // ── Delete multiple images ────────────────────────────────────────────────
  const handleDeleteMultiple = async () => {
    setDeleting(true);

    try {
      await axios.post(`${BASE_URL}/mygallery/delete-multiple`, {
        ids: deleteIds
      }, {
        headers: { Accept: 'application/json' }
      });

      showToast(`${deleteIds.length} images deleted successfully`);
      setShowDeleteConfirm(false);
      setSelectedImages([]);
      fetchImages();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Delete failed', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // ── Toggle image selection ────────────────────────────────────────────────
  const toggleSelect = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map(img => img.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification */}
      {toast.msg && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] text-white text-sm px-5 py-2.5 rounded-full shadow-lg transition-all
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'}`}>
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gallery Manager</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {loading ? 'Loading...' : `${images.length} image${images.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          
          <div className="flex gap-2">
            {selectedImages.length > 0 && (
              <>
                <button
                  onClick={openEditModal}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Selected ({selectedImages.length})
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex items-center gap-2 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Selected ({selectedImages.length})
                </button>
              </>
            )}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Upload Images
            </button>
          </div>
        </div>

        {/* Selection bar */}
        {images.length > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedImages.length === images.length && images.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </label>
            <span className="text-sm text-gray-400">
              {selectedImages.length} selected
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="px-4 sm:px-8 py-8">
        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No images yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Upload Images" to get started</p>
          </div>
        )}

        {/* Image grid */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group relative">
                {/* Selection checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(img.id)}
                    onChange={() => toggleSelect(img.id)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                </div>

                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={img.image_url}
                    alt={img.alt_text || img.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {img.category && (
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                      {img.category}
                    </span>
                  )}
                </div>

                {/* Card footer */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {img.title || <span className="text-gray-400 italic text-xs">Untitled</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && clearUploadForm()} />

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">
                Upload Multiple Images
              </h2>
              <button
                onClick={() => !saving && clearUploadForm()}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal content */}
            <form onSubmit={handleUpload} className="px-6 py-5">
              {/* File input */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 hover:border-gray-400 transition-colors text-center"
              >
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm font-medium text-gray-700">Click to select images</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — max 5MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {/* Preview grid */}
              {uploadPreviews.length > 0 && (
                <div className="space-y-6 mb-6">
                  <h3 className="font-medium text-gray-700">{uploadPreviews.length} image(s) selected</h3>
                  
                  {uploadPreviews.map((preview, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg relative">
                      <button
                        type="button"
                        onClick={() => removeUploadImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                      
                      <div className="w-24 h-24 flex-shrink-0">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          placeholder="Title"
                          value={uploadTitles[index] || ''}
                          onChange={e => {
                            const newTitles = [...uploadTitles];
                            newTitles[index] = e.target.value;
                            setUploadTitles(newTitles);
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          value={uploadCategories[index] || ''}
                          onChange={e => {
                            const newCategories = [...uploadCategories];
                            newCategories[index] = e.target.value;
                            setUploadCategories(newCategories);
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Alt Text"
                          value={uploadAltTexts[index] || ''}
                          onChange={e => {
                            const newAltTexts = [...uploadAltTexts];
                            newAltTexts[index] = e.target.value;
                            setUploadAltTexts(newAltTexts);
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={clearUploadForm}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadFiles.length === 0}
                  className="flex-1 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {saving ? 'Uploading...' : `Upload ${uploadFiles.length} Image(s)`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setShowEditModal(false)} />

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">
                Edit {editingImages.length} Image(s)
              </h2>
              <button
                onClick={() => !saving && setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              {editingImages.map((img, index) => (
                <div key={img.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={img.image_url} alt={img.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={img.title}
                      onChange={e => updateEditingImage(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={img.category}
                      onChange={e => updateEditingImage(index, 'category', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Alt Text"
                      value={img.alt_text}
                      onChange={e => updateEditingImage(index, 'alt_text', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {saving ? 'Saving...' : `Save Changes (${editingImages.length})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setShowDeleteConfirm(false)} />
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </div>

            <h3 className="text-base font-bold text-gray-900 mb-1">Delete {deleteIds.length} image(s)?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMultiple}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galleryupload;