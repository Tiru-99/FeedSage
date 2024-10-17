import { SignIn } from '@clerk/nextjs';
import { Youtube } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Youtube className="h-8 w-8 text-red-500 mr-2" />
        <span className="text-2xl font-bold text-white">FeedSage</span>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-md rounded-lg p-8">
          <SignIn 
            path="/sign-in" 
            routing="path" 
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-red-500 hover:bg-red-600 text-white',
                card: 'bg-gray-800',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                socialButtonsBlockButton: 'text-white border-gray-600 hover:bg-gray-700',
                formFieldLabel: 'text-gray-300',
                formFieldInput: 'bg-gray-700 text-white border-gray-600',
                footerActionLink: 'text-red-400 hover:text-red-300',
                identityPreviewText: 'text-gray-300',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}