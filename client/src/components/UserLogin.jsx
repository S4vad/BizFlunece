import { useState } from 'react';
import axios from "axios";
import { Navigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate= Navigate()
  const [isBusiness, setIsBusiness] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    socialMediaHandle: '',
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try{
      const response = await axios.post('http://localhost:5000/signup',{
        ...formData,
        isBusiness
      });     
      setFormData({name:"",email:"",socialMediaHandle:"",password:""})
      navigate('/')
    }catch(error){
      console.log('Error submitting form:',error);
      alert(error.response?.data?.error 
        || 'failed to submit form. Try again later.'
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <div className="flex mb-8">
          <button
            onClick={() => setIsBusiness(true)}
            className={`flex-1 py-2 text-center ${
              isBusiness ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setIsBusiness(false)}
            className={`flex-1 py-2 text-center ${
              !isBusiness ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
            }`}
          >
            Influencer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {!isBusiness && (
            <div>
              <label className="block text-gray-700 mb-2">Social Media Handle</label>
              <input
                type="text"
                name="socialMediaHandle"
                value={formData.socialMediaHandle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required={!isBusiness}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}