import { useAuth } from '../../context/AuthContext';

export function ProfileView() {
  const { user } = useAuth();

  console.log({user});

  // if (!profile) return null;

  const firstName = user?.user_metadata?.first_name;
  const lastName = user?.user_metadata?.last_name;
  const email = user?.email;
  const phone = user?.phone;


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <p className="mt-1 text-gray-900">{firstName || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <p className="mt-1 text-gray-900">{lastName || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-gray-900">{phone || '-'}</p>
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <p className="mt-1 text-gray-900">{bio || '-'}</p>
        </div>*/}
      </div> 
    </div>
  );
} 