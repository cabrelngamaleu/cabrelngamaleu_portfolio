import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import MessageRow from '../../components/dashboard/MessageRow';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const messagesPerPage = 20;

  const fetchMessages = async () => {
    try {
      setError('');
      const response = await api.get('/messages');
      // Sort by date descending
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMessages(sorted);
      applyFilter(sorted, activeFilter);
    } catch (err) {
      console.error('Erreur lors du chargement des messages:', err);
      setError('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilter = (msgs, filter) => {
    let filtered = msgs;

    switch (filter) {
      case 'unread':
        filtered = msgs.filter((msg) => !msg.read);
        break;
      case 'read':
        filtered = msgs.filter((msg) => msg.read);
        break;
      default:
        filtered = msgs;
    }

    setFilteredMessages(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    applyFilter(messages, filter);
  };

  const handleToggleRead = async (messageId, readStatus) => {
    try {
      // Optimistic update
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, read: readStatus } : msg))
      );
      setFilteredMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, read: readStatus } : msg))
      );

      // API call
      await api.patch(`/messages/${messageId}/read`, { read: readStatus });
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      // Revert on error
      fetchMessages();
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      await api.delete(`/messages/${messageId}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      setFilteredMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du message');
    }
  };

  // Pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const unreadCount = messages.filter((msg) => !msg.read).length;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-textColor/50">Chargement des messages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text-green mb-2">Boîte de réception</h1>
          <p className="text-textColor/70">
            {unreadCount > 0 ? `${unreadCount} message(s) non lu(s)` : 'Aucun nouveau message'}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex space-x-2 border-b border-designColor/20">
        {[
          { id: 'all', label: 'Tous', count: messages.length },
          { id: 'unread', label: 'Non lus', count: unreadCount },
          { id: 'read', label: 'Lus', count: messages.length - unreadCount },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-2 font-medium transition-all ${
              activeFilter === filter.id
                ? 'text-designColor border-b-2 border-designColor'
                : 'text-textColor/70 hover:text-textColor'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Messages table */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-textColor/50">Aucun message dans cette catégorie</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-designColor/10 border-b border-designColor/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                    De
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-textColor uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-designColor/10">
                {currentMessages.map((message) => (
                  <MessageRow
                    key={message._id}
                    message={message}
                    onToggleRead={handleToggleRead}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-designColor/20">
              <div className="text-sm text-textColor/70">
                Page {currentPage} sur {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-designColor/10 hover:bg-designColor/20 text-designColor rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-designColor/10 hover:bg-designColor/20 text-designColor rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MessagesInbox;
