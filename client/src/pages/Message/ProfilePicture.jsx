import defaultImage from "../../../public/image.png";

const ProfilePicture = ({ u, onlineUsers }) => {
  return (
    <div className="relative flex-shrink-0 size-12 rounded-full overflow-hidden bg-gray-200">
      <img
        src={u.image || defaultImage}
        alt="profile image"
        className="w-full h-full object-cover"
      />

      {/* Online Indicator */}
      {onlineUsers?.includes(u.userId) && (
        <span className="absolute bottom-1 right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      )}
    </div>
  );
};

export default ProfilePicture;
