import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">BizFluenze</div>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-indigo-600">Login</button>
          <button onClick={() =>navigate('/signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Connect with Perfect Influencers</h1>
          <p className="text-xl mb-8">AI-powered platform for seamless brand-influencer collaborations</p>
          <div className="space-x-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              I'm a Business
            </button>
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-400">
              I'm an Influencer
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['AI Matching', 'Real Analytics', 'Secure Payments'].map((feature) => (
            <div key={feature} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">★</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}