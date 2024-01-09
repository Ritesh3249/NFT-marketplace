import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [newName, setNewName] = useState('');

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-black opacity-50 w-full h-full absolute"></div>
      <div className="bg-white rounded-lg p-8 z-10">
        <h2 className="text-2xl font-semibold mb-4">Change Your Name</h2>
        <input
          type="text"
          placeholder="New Name"
          className="w-full h-10 mb-4 border-2 border-gray-300 rounded-md px-2"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
