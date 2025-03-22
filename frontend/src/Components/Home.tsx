import React from 'react'
import Layout from './Layout'
import useFetch from '../Hooks/useFetch';
import useLogout from '../Hooks/useLogout';
import scenarios from '../scenarios';
import { useNavigate } from 'react-router';




const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectScenario = (id: string) => {
    navigate(`/scenario-settings/${id}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Choose Your Scenario</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-gray-800 h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleSelectScenario(scenario.id)}
            >
              <img src={scenario.image} alt={scenario.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{scenario.name}</h2> 
                <p className="text-gray-400 text-sm">{scenario.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
    
  );
};

export default Home;