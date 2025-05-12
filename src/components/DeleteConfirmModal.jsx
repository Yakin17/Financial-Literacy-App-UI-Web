import React from 'react';

function DeleteConfirmModal({ item, itemType, onClose, onConfirm }) {
  if (!item) return null;

  const getItemDetails = () => {
    if (itemType === 'user') {
      return (
        <>
          <p className="font-medium text-gray-900">{item.nom}</p>
          <p className="text-gray-600">{item.email}</p>
        </>
      );
    } else if (itemType === 'article') {
      return (
        <>
          <p className="font-medium text-gray-900">{item.titre}</p>
          <p className="text-gray-600">{item.auteurNom}</p>
        </>
      );
    }
    return <p className="text-gray-600">Type d'élément inconnu</p>;
  };

  const getItemName = () => {
    if (itemType === 'user') {
      return "l'utilisateur";
    } else if (itemType === 'article') {
      return "l'article";
    }
    return "l'élément";
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Êtes-vous sûr de vouloir supprimer {getItemName()} suivant? Cette action est irréversible.
          </p>
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            {getItemDetails()}
            <p className="text-gray-600">ID: {item.id}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;