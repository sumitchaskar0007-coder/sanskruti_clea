// frontend/src/components/admin/DeleteConfirmModal.jsx
import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const DeleteConfirmModal = ({ itemName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <FaExclamationTriangle className="text-2xl" />
            <h3 className="text-lg font-semibold">Confirm Delete</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <strong>"{itemName}"</strong>? 
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;