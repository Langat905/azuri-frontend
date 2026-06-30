import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBookings, deleteBooking } from '../lib/api';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    const res = await getBookings(token);
    if (res.error) {
      setError(res.error);
    } else {
      setBookings(res);
    }
    setLoading(false);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    const res = await deleteBooking(id, token);
    if (res.message) {
      setBookings(bookings.filter(b => b._id !== id));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

          {loading && <p className="text-gray-500">Loading bookings...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && bookings.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">You have no bookings yet.</p>
              <button
                onClick={() => navigate('/accommodations')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Accommodations
              </button>
            </div>
          )}

          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{booking.service}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition text-sm"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;