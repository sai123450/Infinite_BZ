import { useState } from 'react';
import { Calendar, MapPin, Type, AlignLeft, Clock, Globe, X, Check, ChevronRight, ChevronLeft, Image as ImageIcon, Plus, Trash2, User, List, Link as LinkIcon, Twitter, Linkedin } from 'lucide-react';

export default function CreateEventModal({ isOpen, onClose, onSave }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        category: "Business",
        description: "",
        startDate: "",
        startTime: "10:00",
        endDate: "",
        endTime: "12:00",
        mode: "offline", // or 'online'
        location: "",
        imageUrl: "",
        agendaItems: [],
        speakers: []
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        // Construct final payload
        const payload = {
            ...formData,
            start_time: `${formData.startDate}T${formData.startTime}:00`,
            end_time: `${formData.endDate || formData.startDate}T${formData.endTime}:00`,
            is_free: true, // Defaulting for now
            venue_name: formData.mode === 'online' ? 'Online Event' : formData.location,
            venue_address: formData.mode === 'online' ? 'Online' : formData.location,
            online_event: formData.mode === 'online',
            agenda: formData.agendaItems,
            speakers: formData.speakers
        };
        await onSave(payload);
    };

    // --- Helpers for Agenda ---
    const addAgendaItem = () => {
        setFormData(prev => ({
            ...prev,
            agendaItems: [
                ...prev.agendaItems,
                { id: Date.now(), startTime: "", endTime: "", title: "", description: "" }
            ]
        }));
    };

    const removeAgendaItem = (id) => {
        setFormData(prev => ({
            ...prev,
            agendaItems: prev.agendaItems.filter(item => item.id !== id)
        }));
    };

    const updateAgendaItem = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            agendaItems: prev.agendaItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    // --- Helpers for Speakers ---
    const addSpeaker = () => {
        setFormData(prev => ({
            ...prev,
            speakers: [
                ...prev.speakers,
                { id: Date.now(), name: "", role: "", company: "", imageUrl: "", linkedIn: "", twitter: "" }
            ]
        }));
    };

    const removeSpeaker = (id) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.filter(item => item.id !== id)
        }));
    };

    const updateSpeaker = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">

                {/* HEADER */}
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold text-white">Create New Event</h2>
                        <p className="text-sm text-slate-400">Step {step} of 4</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-1 bg-slate-700">
                    <div
                        className="h-full bg-primary-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* STEP 1: DETAILS */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Type size={16} className="text-primary-500" /> Event Title
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Future of AI Summit 2026"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-all"
                                    >
                                        <option>Business</option>
                                        <option>Technology</option>
                                        <option>Startup</option>
                                        <option>Music</option>
                                        <option>Sports</option>
                                        <option>Arts</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} /> Cover Image URL
                                    </label>
                                    <input
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <AlignLeft size={16} /> Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell people what your event is about..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DATE & LOCATION */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-200">

                            {/* Date Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Calendar className="text-primary-500" size={20} /> Date & Time
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Start Time</label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">End Time</label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            {/* Location Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <MapPin className="text-primary-500" size={20} /> Location
                                </h3>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setFormData(p => ({ ...p, mode: 'offline' }))}
                                        className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.mode === 'offline'
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                    >
                                        <MapPin size={18} /> In Person
                                    </button>
                                    <button
                                        onClick={() => setFormData(p => ({ ...p, mode: 'online' }))}
                                        className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.mode === 'online'
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                            }`}
                                    >
                                        <Globe size={18} /> Virtual Event
                                    </button>
                                </div>

                                {formData.mode === 'offline' && (
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter venue address..."
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary-500 animate-in fade-in duration-200"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: CONTENT (AGENDA & SPEAKERS) */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-200">

                            {/* AGENDA SECTION */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <List className="text-primary-500" size={20} /> Agenda (Optional)
                                    </h3>
                                    <button onClick={addAgendaItem} className="text-xs flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors">
                                        <Plus size={14} /> Add Session
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.agendaItems.length === 0 && (
                                        <p className="text-sm text-slate-500 italic text-center py-4 border border-dashed border-slate-700 rounded-lg">
                                            No sessions added yet.
                                        </p>
                                    )}
                                    {formData.agendaItems.map((item, index) => (
                                        <div key={item.id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3 relative group">
                                            <button
                                                onClick={() => removeAgendaItem(item.id)}
                                                className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="grid grid-cols-2 gap-3 pr-8">
                                                <input
                                                    type="time"
                                                    value={item.startTime}
                                                    onChange={(e) => updateAgendaItem(item.id, 'startTime', e.target.value)}
                                                    className="bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-primary-500 w-full"
                                                />
                                                <input
                                                    type="time"
                                                    value={item.endTime}
                                                    onChange={(e) => updateAgendaItem(item.id, 'endTime', e.target.value)}
                                                    className="bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-primary-500 w-full"
                                                />
                                            </div>
                                            <input
                                                placeholder="Session Title"
                                                value={item.title}
                                                onChange={(e) => updateAgendaItem(item.id, 'title', e.target.value)}
                                                className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-primary-500"
                                            />
                                            <textarea
                                                placeholder="Short description..."
                                                value={item.description}
                                                onChange={(e) => updateAgendaItem(item.id, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-primary-500 resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            {/* SPEAKERS SECTION */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <User className="text-primary-500" size={20} /> Speakers (Optional)
                                    </h3>
                                    <button onClick={addSpeaker} className="text-xs flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors">
                                        <Plus size={14} /> Add Speaker
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.speakers.length === 0 && (
                                        <p className="text-sm text-slate-500 italic text-center py-4 border border-dashed border-slate-700 rounded-lg">
                                            No speakers added yet.
                                        </p>
                                    )}
                                    {formData.speakers.map((item) => (
                                        <div key={item.id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 relative">
                                            <button
                                                onClick={() => removeSpeaker(item.id)}
                                                className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="flex gap-4 items-start">
                                                <div className="w-16 h-16 bg-slate-800 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-700">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="text-slate-600" size={24} />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-3 pr-6">
                                                    <input
                                                        placeholder="Speaker Name"
                                                        value={item.name}
                                                        onChange={(e) => updateSpeaker(item.id, 'name', e.target.value)}
                                                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-primary-500"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            placeholder="Role / Title"
                                                            value={item.role}
                                                            onChange={(e) => updateSpeaker(item.id, 'role', e.target.value)}
                                                            className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-primary-500"
                                                        />
                                                        <input
                                                            placeholder="Company"
                                                            value={item.company}
                                                            onChange={(e) => updateSpeaker(item.id, 'company', e.target.value)}
                                                            className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-primary-500"
                                                        />
                                                    </div>
                                                    <input
                                                        placeholder="Image URL (https://...)"
                                                        value={item.imageUrl}
                                                        onChange={(e) => updateSpeaker(item.id, 'imageUrl', e.target.value)}
                                                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-primary-500"
                                                    />
                                                    <div className="flex gap-3">
                                                        <div className="flex-1 relative">
                                                            <Linkedin size={14} className="absolute left-3 top-2.5 text-slate-500" />
                                                            <input
                                                                placeholder="LinkedIn URL"
                                                                value={item.linkedIn}
                                                                onChange={(e) => updateSpeaker(item.id, 'linkedIn', e.target.value)}
                                                                className="w-full bg-slate-800 border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-primary-500"
                                                            />
                                                        </div>
                                                        <div className="flex-1 relative">
                                                            <Twitter size={14} className="absolute left-3 top-2.5 text-slate-500" />
                                                            <input
                                                                placeholder="Twitter URL"
                                                                value={item.twitter}
                                                                onChange={(e) => updateSpeaker(item.id, 'twitter', e.target.value)}
                                                                className="w-full bg-slate-800 border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-primary-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* STEP 4: REVIEW */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-200 text-center">
                            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="text-primary-500" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Ready to Publish?</h3>
                            <p className="text-slate-400 max-w-md mx-auto">
                                Your event <strong>{formData.title}</strong> is ready to go public!
                                It will be visible to all users on the dashboard instantly.
                            </p>

                            <div className="bg-slate-900/50 p-6 rounded-xl text-left border border-slate-700 max-w-md mx-auto mt-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">When</span>
                                    <span className="text-white text-sm font-medium">{formData.startDate} @ {formData.startTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">Where</span>
                                    <span className="text-white text-sm font-medium">{formData.mode === 'online' ? 'Online' : formData.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">Category</span>
                                    <span className="text-white text-sm font-medium">{formData.category}</span>
                                </div>
                                <div className="pt-2 border-t border-slate-700 mt-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Agenda Items</span>
                                        <span className="text-white text-sm font-medium">{formData.agendaItems.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Speakers</span>
                                        <span className="text-white text-sm font-medium">{formData.speakers.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex justify-between">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2.5 rounded-xl font-bold bg-primary-500 hover:bg-primary-600 text-slate-900 shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2"
                        >
                            Next Step <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-2.5 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 transition-all flex items-center gap-2"
                        >
                            Create Event <Check size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
