export default function PlatformItem({ platform }) {
  // Handle undefined platform
  if (!platform) {
   return null; // Or render a fallback UI
 }

 return (
   <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
     <h3 className="text-xl font-semibold text-gray-900">{platform.platform}</h3>
     
     <a
       href={platform.link}
       target="_blank"
       rel="noopener noreferrer"
       className="mt-2 inline-block text-indigo-600 hover:text-indigo-500"
     >
       Visit Profile →
     </a>

     <div className="mt-4 space-y-2">
       <p className="text-sm text-gray-500">Followers/Subscribers</p>
       <p className="text-lg font-semibold text-gray-900">{platform.followers}</p>

       <p className="text-sm text-gray-500">Engagement Rate</p>
       <p className="text-lg font-semibold text-gray-900">{platform.engagement}</p>
     </div>
   </div>
 );
}
