import React from 'react'

function ProfilePage() {
  return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Mon Profil</h2>
          <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900">Mes informations</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                      <p className="text-sm font-medium text-gray-500">Nom</p>
                      <p className="mt-1 text-sm text-gray-900">Dupont</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-gray-500">Prénom</p>
                      <p className="mt-1 text-sm text-gray-900">Jean</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">jean.dupont@example.com</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-gray-500">Membre depuis</p>
                      <p className="mt-1 text-sm text-gray-900">18 avril 2025</p>
                  </div>
              </div>

              <h3 className="mt-8 text-xl font-semibold text-gray-900">Mes statistiques</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Articles lus</p>
                      <p className="mt-1 text-2xl font-semibold text-blue-900">12</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Quiz complétés</p>
                      <p className="mt-1 text-2xl font-semibold text-green-900">8</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Score moyen</p>
                      <p className="mt-1 text-2xl font-semibold text-purple-900">82%</p>
                  </div>
              </div>

              <h3 className="mt-8 text-xl font-semibold text-gray-900">Historique des quiz</h3>
              <div className="mt-4 overflow-hidden rounded-lg border">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Les bases de l'investissement</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">03/05/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">1/1</td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Comprendre les marchés boursiers</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02/05/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">1/1</td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">La planification de la retraite</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01/05/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">0/1</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}

export default ProfilePage
