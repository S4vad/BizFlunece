import React from 'react';
import { Bell, Calendar, DollarSign, MapPin, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1) return `${diffDays} days left`;
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export default function NotificationPanel({ notifications }) {
  console.log(notifications);
  
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">No notifications yet</p>
        <p className="text-gray-400 text-sm">We'll notify you when there's something new!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {notifications.map((notification) => (
        <div 
          key={notification._id} 
          className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
        >
          {/* Header with company info and timestamp */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={notification.companyImage} 
                  alt={notification.companyName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  <Bell className="w-3 h-3 text-blue-500" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{notification.companyName}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">
                {formatTimeAgo(notification.createdAt)}
              </span>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(notification.status)}`}>
                  {getStatusIcon(notification.status)}
                  {notification.status}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {notification.description}
          </p>

          {/* Campaign details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Budget:</span>
              <span className="font-semibold text-gray-900">${notification.budget}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Deadline:</span>
              <span className="font-semibold text-gray-900">{formatDate(notification.deadline)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600">Audience:</span>
              <span className="font-semibold text-gray-900">{notification.targetAudience}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-gray-600">Location:</span>
              <span className="font-semibold text-gray-900">{notification.location}</span>
            </div>
          </div>

          {/* Categories and Platforms */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {notification.category?.map((cat, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200 font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {notification.platforms?.map((platform, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md border border-gray-200 font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Duration indicator */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Duration: {notification.duration} days
              </span>
              <span>Video: {notification.videoDuration}s</span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}