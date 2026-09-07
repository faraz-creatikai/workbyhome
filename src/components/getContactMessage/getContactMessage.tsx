'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
  Calendar,
  MessageSquare,
  X,
  TrendingUp,
  Users,
  MessageCircle,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Stats {
  total: number;
  today: number;
}

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Custom Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 10;

  const loadMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchQuery,
        page: String(currentPage),
        limit: String(itemsPerPage)
      });
      const response = await fetch(`/api/contact?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const result = await response.json();

      setMessages(result.messages || []);
      setTotalPages(result.pagination?.pages || 1);
      setTotalResults(result.pagination?.total || 0);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/contact/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage]);

  useEffect(() => {
    loadStats();
  }, []);

  const confirmDelete = (id: string) => {
    setMessageToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!messageToDeleteId) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/contact?id=${messageToDeleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      loadMessages();
      loadStats();
      if (selectedMessage?.id === messageToDeleteId) {
        closeModal();
      }
      setIsDeleteModalOpen(false);
      setMessageToDeleteId(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  const openMessageDetails = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Enquiries & Contacts</h1>
                <p className="text-xs text-gray-500">Manage user messages from the contact form</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-[var(--color-primary-700)]">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Enquiries</p>
              <p className="text-3xl font-extrabold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Received Today</p>
              <p className="text-3xl font-extrabold text-purple-600">{stats.today}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] w-full md:w-80 shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Download className="w-4 h-4 text-gray-500" />
            Export CSV
          </button>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/75 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message Preview</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Received</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-400">
                      Loading messages...
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-inner">
                        <MessageCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium">No messages found</p>
                      <p className="text-sm text-gray-400 mt-1">Wait for users to submit the contact form.</p>
                    </td>
                  </tr>
                ) : messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center border border-[var(--color-primary-100)] shadow-sm flex-shrink-0">
                          <span className="text-xs font-bold text-[var(--color-primary-700)]">{getInitials(msg.name)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{msg.name}</p>
                          <p className="text-xs text-gray-500">{msg.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 truncate max-w-xs md:max-w-md">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(msg.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openMessageDetails(msg)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-primary-700)] bg-[var(--color-primary-50)] hover:bg-[var(--color-primary-100)] border border-[var(--color-primary-100)] rounded-lg transition-all shadow-sm"
                          title="View Full Message"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button 
                          onClick={() => confirmDelete(msg.id)}
                          className="inline-flex items-center justify-center p-1.5 text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-all shadow-sm"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/30">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-500 hover:bg-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-gray-200 shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[var(--color-primary-600)] text-white shadow-md shadow-blue-500/20'
                          : 'text-gray-600 hover:bg-white border border-transparent hover:border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-500 hover:bg-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-gray-200 shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Message Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-50)] flex items-center justify-center border border-[var(--color-primary-100)] shadow-sm flex-shrink-0">
                    <span className="text-lg font-bold text-[var(--color-primary-700)]">{getInitials(selectedMessage.name)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-white border border-gray-200 shadow-xs text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">Received:</span>
                      {formatDate(selectedMessage.createdAt)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[var(--color-primary-600)]" />
                      Message Content
                    </h3>
                    
                    <div className="p-5 bg-slate-50/75 rounded-2xl border border-slate-100 text-gray-700 leading-relaxed whitespace-pre-wrap font-normal text-sm shadow-inner">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-8 py-5 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => confirmDelete(selectedMessage.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors text-xs border border-red-100 shadow-xs"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Enquiry
                </button>

                <a 
                  href={`mailto:${selectedMessage.email}?subject=Reply from EstateAI`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-semibold transition-all shadow-md shadow-blue-500/20 text-xs"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Custom Delete Confirmation Dialogue */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-6 border border-gray-100 text-center"
            >
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Enquiry?</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                This action cannot be undone. This will permanently remove the message record from your database.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={executeDelete}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-red-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}