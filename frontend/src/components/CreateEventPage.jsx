import { useState } from 'react';
import {
    ChevronLeft, Home, Search, Bell, Settings, LogOut,
    Type, Image as ImageIcon, AlignLeft, Calendar,
    MapPin, Globe, Check, Eye, Tag, Users, Ticket, IndianRupee,
    Bold, Italic, Underline, Link, List, Clock
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function CreateEventPage({ user, onNavigate, onLogout, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Conference",
        startDate: "",
        startTime: "10:00",
        endDate: "",
        endTime: "12:00",
        mode: "offline",
        location: "",
        imageUrl: "",
        isFree: true,
        ticketPrice: 0,
        audience: "General Public",
        tags: [],
        capacity: "",
        registrationDeadline: "",
        meetingLink: "",
        meetingLinkPrivate: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [createdEventId, setCreatedEventId] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTagAdd = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            if (!formData.tags.includes(e.target.value.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, e.target.value.trim()] }));
            }
            e.target.value = '';
        }
    };

    const removeTag = (tag) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            ...formData,
            start_time: `${formData.startDate}T${formData.startTime}:00`,
            end_time: `${formData.endDate || formData.startDate}T${formData.endTime}:00`,
            is_free: formData.isFree,
            venue_name: formData.mode === 'online' ? 'Online Event' : formData.location,
            venue_address: formData.mode === 'online' ? 'Online' : formData.location,
            online_event: formData.mode === 'online',
            image_url: formData.imageUrl,
            price: formData.isFree ? "0" : formData.ticketPrice.toString(),
            category: formData.category,
            capacity: formData.capacity ? parseInt(formData.capacity) : null,
            registration_deadline: formData.registrationDeadline ? `${formData.registrationDeadline}T23:59:00` : null,
            meeting_link: formData.meetingLink,
            meeting_link_private: formData.meetingLinkPrivate,
            timezone: formData.timezone
        };
        try {
            const result = await onSave(payload);
            if (result && result.eventbrite_id) {
                setCreatedEventId(result.eventbrite_id);
                setShowSuccessModal(true);
            }
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-sans bg-slate-50 dark:bg-slate-900">
            {/* SIDEBAR */}
            <Sidebar
                activePage="create-event"
                onNavigate={onNavigate}
                onLogout={onLogout}
                onCreateClick={() => { }} // Already here
            />

            {/* MAIN CONTENT */}
            {/* MAIN CONTENT */}
            {/* MAIN CONTENT */}
            <main className="flex-1 lg:ml-64 p-8 pb-40 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen relative font-sans selection:bg-primary-100 selection:text-primary-900">

                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                        <div className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" onClick={() => onNavigate('dashboard')}>
                            <Home size={18} />
                        </div>
                        <ChevronLeft size={16} className="text-slate-300" />
                        <span className="cursor-pointer hover:text-primary-500 transition-colors" onClick={() => onNavigate('dashboard')}>Events</span>
                        <ChevronLeft size={16} className="text-slate-300" />
                        <span className="text-slate-900 dark:text-white font-semibold bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full text-xs">Create New</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 w-64 transition-all shadow-sm"
                            />
                        </div>
                        <button className="text-slate-500 hover:text-primary-500 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.full_name || 'Admin User'}</p>
                                <p className="text-xs text-slate-500 mt-1">Organizer</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20 ring-2 ring-white dark:ring-slate-950 cursor-pointer hover:scale-105 transition-transform">
                                {user?.full_name?.[0] || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Create Networking Event</h1>
                            <p className="text-slate-500 text-lg max-w-2xl">Launch your event to the Chennai community. high-quality events get featured on the main dashboard.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">

                        {/* LEFT COLUMN - FORM */}
                        {/* LEFT COLUMN - FORM (60%) */}
                        <div className="col-span-12 lg:col-span-7 space-y-8">

                            {/* SECTION 1: ESSENTIALS */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-primary-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-500/20">1</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Event Essentials</h3>
                                        <p className="text-sm text-slate-500">The core details that appear on the event card.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider text-[11px]">Event Title</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Chennai Tech Summit 2026"
                                            className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:ring-0 transition-all font-bold text-3xl placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider text-[11px]">Description</label>
                                        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 overflow-hidden focus-within:ring-4 focus-within:ring-primary-500/10 focus-within:border-primary-500 transition-all group">
                                            <div className="flex gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
                                                <ToolbarButton icon={<Bold size={14} />} />
                                                <ToolbarButton icon={<Italic size={14} />} />
                                                <ToolbarButton icon={<Underline size={14} />} />
                                                <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2 self-center"></div>
                                                <ToolbarButton icon={<Link size={14} />} />
                                                <ToolbarButton icon={<List size={14} />} />
                                            </div>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={6}
                                                placeholder="Describe what attendees will learn, who should attend..."
                                                className="w-full px-5 py-6 bg-transparent border-none focus:outline-none resize-none text-slate-600 dark:text-slate-300 leading-relaxed text-lg"
                                            />
                                            <div className="text-right px-4 py-2 text-[10px] font-bold uppercase text-slate-400 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/30">
                                                {formData.description.length}/2000 characters
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider text-[11px]">Cover Image</label>
                                        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all cursor-pointer group bg-slate-50 dark:bg-slate-800/30 overflow-hidden">
                                            {formData.imageUrl ? (
                                                <>
                                                    <img src={formData.imageUrl} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <p className="text-white font-bold">Click to change</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform text-primary-500">
                                                        <ImageIcon size={28} />
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-700 dark:text-white mb-1">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-slate-400 mb-4">SVG, PNG, JPG (max. 1200x600px)</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            placeholder="Or paste direct image URL here..."
                                            className="mt-3 w-full px-4 py-2 text-sm bg-transparent border-b border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:outline-none transition-colors text-slate-500 text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: DATE & LOCATION */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/20">2</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Date & Location</h3>
                                        <p className="text-sm text-slate-500">When and where is this happening?</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <Calendar size={14} /> Start
                                        </div>
                                        <div className="flex gap-3">
                                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium" />
                                            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <Calendar size={14} /> End
                                        </div>
                                        <div className="flex gap-3">
                                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium" />
                                            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <Clock size={16} className="text-slate-400" />
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-1">Time Zone</label>
                                            <select
                                                name="timezone"
                                                value={formData.timezone}
                                                onChange={handleChange}
                                                className="w-full bg-transparent font-bold text-slate-700 dark:text-slate-200 text-sm focus:outline-none"
                                            >
                                                <option value="Asia/Kolkata">India Standard Time (IST)</option>
                                                <option value="UTC">Universal Coordinated Time (UTC)</option>
                                                <option value="America/New_York">Eastern Time (ET)</option>
                                                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                                <option value="Europe/London">British Summer Time (BST)</option>
                                            </select>
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">Location Type</label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setFormData(p => ({ ...p, mode: 'offline' }))}
                                            className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.mode === 'offline'
                                                ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 shadow-md shadow-cyan-500/10'
                                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.mode === 'offline' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                                <MapPin size={16} />
                                            </div>
                                            <span className="font-bold">In Person</span>
                                        </button>
                                        <button
                                            onClick={() => setFormData(p => ({ ...p, mode: 'online' }))}
                                            className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.mode === 'online'
                                                ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 shadow-md shadow-cyan-500/10'
                                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.mode === 'online' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                                <Globe size={16} />
                                            </div>
                                            <span className="font-bold">Virtual Event</span>
                                        </button>
                                    </div>

                                    {formData.mode === 'offline' && (
                                        <div className="relative animate-in fade-in slide-in-from-top-2">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Search for a venue or enter full address..."
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-medium"
                                            />
                                        </div>
                                    )}

                                    {formData.mode === 'online' && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                            <div className="relative">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    name="meetingLink"
                                                    value={formData.meetingLink}
                                                    onChange={handleChange}
                                                    placeholder="Meeting Link (Zoom, Meet, Teams...)"
                                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-medium"
                                                />
                                            </div>
                                            <label className="flex items-center space-x-3 cursor-pointer p-1">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.meetingLinkPrivate ? 'bg-cyan-500 border-cyan-500' : 'border-slate-300'}`}>
                                                    {formData.meetingLinkPrivate && <Check size={12} className="text-white" />}
                                                </div>
                                                <input type="checkbox" checked={formData.meetingLinkPrivate} onChange={e => setFormData(p => ({ ...p, meetingLinkPrivate: e.target.checked }))} className="hidden" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Only show link to registered attendees</span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* AUDIENCE */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Targeting</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[11px] font-bold uppercase text-slate-400 mb-2 block tracking-wider">Target Audience</label>
                                        <div className="relative">
                                            <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <select
                                                name="audience"
                                                value={formData.audience}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 appearance-none focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium text-sm"
                                            >
                                                <option>General Public</option>
                                                <option>Developers</option>
                                                <option>Founders</option>
                                                <option>Students</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold uppercase text-slate-400 mb-2 block tracking-wider">Category</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Conference", "Workshop", "Networking", "Seminar"].map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFormData(p => ({ ...p, category: cat }))}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${formData.category === cat
                                                        ? 'bg-primary-500 text-white border-primary-500'
                                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold uppercase text-slate-400 mb-2 block tracking-wider">Tags</label>
                                        <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                                            {formData.tags.length === 0 && <span className="text-xs text-slate-400 p-1">No tags added</span>}
                                            {formData.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                                                    {tag} <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">×</button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                placeholder="Add relevant tags..."
                                                onKeyDown={handleTagAdd}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TICKETING */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Ticketing</h3>
                                <div className="space-y-4">
                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.isFree ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                                        <input type="radio" name="isFree" checked={formData.isFree} onChange={() => setFormData(p => ({ ...p, isFree: true }))} className="hidden" />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${formData.isFree ? 'border-green-500' : 'border-slate-300'}`}>
                                            {formData.isFree && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-900 dark:text-white">Free Event</span>
                                            <span className="block text-xs text-slate-500 mt-0.5">Best for community meetups</span>
                                        </div>
                                    </label>

                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${!formData.isFree ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                                        <input type="radio" name="isFree" checked={!formData.isFree} onChange={() => setFormData(p => ({ ...p, isFree: false }))} className="hidden" />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${!formData.isFree ? 'border-primary-500' : 'border-slate-300'}`}>
                                            {!formData.isFree && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-900 dark:text-white">Paid Ticket</span>
                                            <span className="block text-xs text-slate-500 mt-0.5">Set custom pricing</span>
                                        </div>
                                    </label>

                                    {!formData.isFree && (
                                        <div className="pt-2 animate-in slide-in-from-top-2">
                                            <div className="relative">
                                                <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="number"
                                                    name="ticketPrice"
                                                    value={formData.ticketPrice}
                                                    onChange={handleChange}
                                                    placeholder="0.00"
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* CAPACITY & DEADLINE */}
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                        <div>
                                            <label className="text-[11px] font-bold uppercase text-slate-400 mb-2 block tracking-wider">Capacity (Optional)</label>
                                            <div className="relative">
                                                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    value={formData.capacity}
                                                    onChange={handleChange}
                                                    placeholder="Unlimited"
                                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-bold uppercase text-slate-400 mb-2 block tracking-wider">Reg. Deadline</label>
                                            <input
                                                type="date"
                                                name="registrationDeadline"
                                                value={formData.registrationDeadline}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN - WIDGETS */}
                        {/* RIGHT COLUMN - PREVIEW (40%) */}
                        <div className="col-span-12 lg:col-span-5 space-y-8 relative">

                            {/* LIVE PREVIEW CARD */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-8">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs uppercase tracking-wider">Live Preview</h3>
                                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
                                    <div className="h-32 bg-slate-100 dark:bg-slate-900 relative">
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                                                <ImageIcon size={32} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 px-2 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm">
                                            {formData.isFree ? 'Free' : `₹${formData.ticketPrice}`}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs font-bold text-primary-500 mb-1 uppercase tracking-wide">{formData.startDate || 'Date'} • {formData.category}</div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{formData.title || 'Event Title'}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                            {formData.mode === 'online' ? <Globe size={12} /> : <MapPin size={12} />}
                                            <span className="truncate">{formData.mode === 'online' ? 'Online Event' : (formData.location || 'Location')}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950" />
                                                ))}
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">Register</span>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS (Floating Dock) */}
                <div className="fixed bottom-6 lg:left-[calc(16rem+50%)] lg:-translate-x-1/2 lg:w-[calc(100%-18rem)] max-w-3xl w-[90%] left-1/2 -translate-x-1/2 z-40">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-4 rounded-2xl shadow-2xl flex items-center justify-between ring-1 ring-slate-900/5">
                        {/* Auto-save Indicator */}
                        <div className="flex items-center gap-3 pl-2">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Auto-saved <span className="text-slate-700 dark:text-slate-200">Just now</span>
                            </span>
                        </div>

                        {/* Button Group */}
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2.5 rounded-xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all text-xs uppercase tracking-wider">
                                Draft
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all text-xs uppercase tracking-wider">
                                <Eye size={16} /> Preview
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2"
                            >
                                {loading ? 'Publishing...' : <>Publish Now <Check size={18} strokeWidth={3} /></>}
                            </button>
                        </div>
                    </div>
                </div>
                {/* SUCCESS MODAL */}
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200 text-center border border-slate-200 dark:border-slate-800">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-500/30">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Event Published! 🎉</h2>
                            <p className="text-slate-500 mb-8 font-medium">Your event is now live and ready to be shared with the world.</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(`https://infinitebz.com/events/${createdEventId}`);
                                        alert("Link copied!");
                                    }}
                                    className="w-full py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Globe size={18} /> Copy Event Link
                                </button>
                                <button
                                    onClick={() => onNavigate('dashboard')}
                                    className="w-full py-3.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function ToolbarButton({ icon, label }) {
    return (
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
            {icon || label}
        </button>
    )
}
