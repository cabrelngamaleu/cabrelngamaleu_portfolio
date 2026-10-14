import React from 'react';
import { FiMail, FiEye, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessageRow = ({ message, onToggleRead, onDelete }) => {
  return (
    <tr
      className={`hover:bg-designColor/5 transition-colors ${!message.read ? 'bg-designColor/5' : ''}`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`mr-3 ${!message.read ? 'text-designColor' : 'text-textColor/50'}`}>
            {!message.read ? <FiMail size={18} /> : <FiEye size={18} />}
          </div>
          <div>
            <div
              className={`text-sm ${!message.read ? 'font-semibold text-textColor' : 'text-textColor/70'}`}
            >
              {message.name}
            </div>
            <div className="text-xs text-textColor/60">{message.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div
          className={`text-sm ${!message.read ? 'font-medium text-textColor' : 'text-textColor/70'}`}
        >
          {message.message.length > 100
            ? `${message.message.substring(0, 100)}...`
            : message.message}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-textColor/70">
        {message.createdAt
          ? format(new Date(message.createdAt), 'dd MMM yyyy HH:mm', { locale: fr })
          : 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
            !message.read ? 'bg-designColor/10 text-designColor' : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {!message.read ? 'Non lu' : 'Lu'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <button
          onClick={() => onToggleRead(message._id, !message.read)}
          className="text-designColor hover:text-designColor/80 mr-3 transition-colors"
          title={message.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
        >
          {!message.read ? <FiEye size={18} /> : <FiMail size={18} />}
        </button>
        <button
          onClick={() => onDelete(message._id)}
          className="text-red-400 hover:text-red-300 transition-colors"
          title="Supprimer"
        >
          <FiTrash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default MessageRow;
